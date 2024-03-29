import { blobToBase64 } from "@/common/helpers/common";
import ColorConstant from "@/config/stitches/color.stitches";
import { styled } from "@/config/stitches/theme.stitches";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { client } from "@/hooks/use-ky";
import qs from "qs";
import toApiError from "@/common/repositories/to-api-error";
import { toast } from "react-hot-toast";

export default function ViewReportPage() {
  const router = useRouter();
  const { id, ...restQuery } = router.query;

  const [pdf, setPdf] = useState<string>();

  useEffect(() => {
    async function exec() {
      if (!id) return;
      const decodeId = decodeURIComponent(id as string);
      const params = qs.stringify(restQuery);
      try {
        const json = await client.get(decodeId, {
          ...(params
            ? {
                searchParams: params,
              }
            : {}),
        });
        const pdf = await blobToBase64(await json.blob());
        setPdf(pdf);
      } catch (e: any) {
        const err = await toApiError(e);
        if (err?.message) toast.error(err?.message);
      }
    }
    exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!pdf)
    return (
      <LoadingContainer>
        <Oval color={ColorConstant.primaryDark} height={60} width={60} />
      </LoadingContainer>
    );

  return (
    <iframe
      allowFullScreen
      id="report"
      src={pdf}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        overflow: "hidden",
      }}
    />
  );
}

const LoadingContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

ViewReportPage.getLayout = function getLayout(page) {
  return page;
};
