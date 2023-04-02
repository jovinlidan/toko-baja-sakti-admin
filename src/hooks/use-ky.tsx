import configEnv from "@/common/config";
import { getCookies } from "@/common/helpers/common";
import { queryClient } from "@/common/repositories/query-client";
// import logout from "@/common/utils/auth";
import invariant from "invariant";
import ky from "ky";
import { useRouter } from "next/router";
import * as React from "react";

export interface KYStateProps {
  credential?: any;
  setCredential: React.Dispatch<React.SetStateAction<any>>;
  setRedirectLogout?: React.Dispatch<React.SetStateAction<boolean>>;
  refreshContainer: () => void;
}

export const KYContext = React.createContext<KYStateProps>({
  credential: undefined,
  setCredential: () => {},
  refreshContainer: () => {},
});

interface Props {
  userCredential?: any;
  children: React.ReactNode;
}

const config = {
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
    ],
    beforeRetry: [
      ({ request, options, error, retryCount }) => {
        request.headers.set("x-retry", retryCount.toString());
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

export async function setLogoutHook(func: (request, _, response) => void) {
  //@ts-expect-error
  config.hooks.afterResponse[1] = func;
  client = client.extend(config);
}

export async function setupBeforeHooks() {
  client = await client.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Accept-Language", "id");
          request.headers.set("Content-Type", "application/json");
          request.headers.set("Authorization", `Bearer ${getCookies("token")}`);
          request.headers.set("ngrok-skip-browser-warning", "true");
        },
      ],
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
  const [refreshIndex, setRefreshIndex] = React.useState(0);
  const [userCredential, setUserCredential] = React.useState<any | undefined>();
  const [renderChild, setRenderChild] = React.useState<boolean>(false);
  const [redirectLogout, setRedirectLogout] = React.useState<boolean>(false);
  const router = useRouter();

  const { children } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutFunc = async (request, _, response) => {
    if (response.status === 401) {
      setRedirectLogout(true);
      // await logout(false);
      queryClient.invalidateQueries();
      await setUserCredential(undefined);
    }
  };

  React.useEffect(() => {
    async function exec() {
      await router.push("/login");
      setRedirectLogout(false);
      setRenderChild(false);
    }

    if (redirectLogout) {
      exec();
    }
  }, [redirectLogout, router]);

  React.useEffect(() => {
    async function exec() {
      // const cookies = await getCookies();

      await setupBeforeHooks();

      // set login

      setRenderChild(true);
    }

    exec();
  }, [refreshIndex, userCredential]);

  React.useEffect(() => {
    setLogoutHook(logoutFunc);
  }, [logoutFunc]);

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
      refreshContainer: () => {
        setRefreshIndex((prev) => prev + 1);
      },
    }),
    [userCredential]
  );

  const showChild = renderChild || router.pathname.startsWith("/login");

  return (
    <KYContext.Provider value={value}>
      {showChild ? children : null}
    </KYContext.Provider>
  );
}

export function useKY() {
  const context = React.useContext(KYContext);

  invariant(
    context !== undefined,
    "useCredential must be used inside Credential Container"
  );

  return context;
}
