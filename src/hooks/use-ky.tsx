import { getRefreshToken } from "@/api-hooks/auth/auth.mutation";
import configEnv from "@/common/config";
import { deleteCookie, getCookies, setCookie } from "@/common/helpers/common";
import { queryClient } from "@/common/repositories/query-client";
import invariant from "invariant";
import ky, { Options } from "ky";
import { useRouter } from "next/router";
import * as React from "react";
import { camelizeKeys } from "humps";
export interface KYStateProps {
  credential?: any;
  setCredential: React.Dispatch<React.SetStateAction<any>>;
  setRedirectLogout?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KYContext = React.createContext<KYStateProps>({
  credential: undefined,
  setCredential: () => {},
});

interface Props {
  userCredential?: any;
  children: React.ReactNode;
}

const config: Options = {
  prefixUrl: configEnv.apiEndpoint + "/api/employee",
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Accept-Language": "id",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, res) => {
        const contentType = res.headers.get("content-type");
        let newResponse = res.clone();
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          const { status, statusText, headers } = res;
          newResponse = new Response(JSON.stringify(json), {
            status,
            statusText,
            headers,
          });
        }

        return newResponse;
      },
      async (_request, _options, _response) => {
        if (
          _response.status === 401 &&
          !_request.headers.get("x-client-fe-retry")
        ) {
          const refreshToken = getCookies("refresh");
          try {
            const res = camelizeKeys(await getRefreshToken({ refreshToken }));
            setCookie("token", res.data.accessToken, 1);
            setCookie("refresh", res.data.refreshToken, 1);
            return client(_request);
          } catch {}
        }
      },
      async (_request, _options, _response) => {
        if (
          _response.status === 400 &&
          _request.headers.get("x-client-fe-retry")
        ) {
          deleteCookie("token");
          deleteCookie("refresh");
          queryClient.invalidateQueries();
          window.location.assign("/login");
        }
      },
    ],
    beforeRetry: [
      ({ request, options, error, retryCount }) => {
        request.headers.set("x-retry", retryCount.toString());
      },
    ],
    beforeRequest: [
      (request) => {
        request.headers.set("Accept-Language", "id");
        request.headers.set("Content-Type", "application/json");
        request.headers.set("Authorization", `Bearer ${getCookies("token")}`);
        request.headers.set("ngrok-skip-browser-warning", "true");
      },
    ],
  },
};

export let client = ky.create(config);

export async function setBeforeRetry(
  func: ({ request, options, error, retryCount }) => void
) {
  client = await client.extend({
    hooks: {
      beforeRetry: [func],
    },
  });
}

export async function setupBeforeRetry(
  func: ({ request, options, error, retryCount }) => void
) {
  client = await client.extend({
    hooks: {
      beforeRetry: [func],
    },
  });
}

export default function KYContainer(props: Props) {
  const [userCredential, setUserCredential] = React.useState<any | undefined>();
  const [redirectLogout, setRedirectLogout] = React.useState<boolean>(false);
  const router = useRouter();

  const { children } = props;

  React.useEffect(() => {
    async function exec() {
      deleteCookie("token");
      deleteCookie("refresh");
      queryClient.invalidateQueries();
      setRedirectLogout(false);
      await router.push("/login");
    }

    if (redirectLogout) {
      exec();
    }
  }, [redirectLogout, router]);

  const value = React.useMemo<KYStateProps>(
    () => ({
      credential: userCredential,
      setCredential: async (credential) => {
        if (!credential) {
          setUserCredential(undefined);
        } else {
          setUserCredential(credential);
        }
      },
      setRedirectLogout,
    }),
    [userCredential]
  );

  return <KYContext.Provider value={value}>{children}</KYContext.Provider>;
}

export function useKY() {
  const context = React.useContext(KYContext);

  invariant(
    context !== undefined,
    "useCredential must be used inside Credential Container"
  );

  return context;
}
