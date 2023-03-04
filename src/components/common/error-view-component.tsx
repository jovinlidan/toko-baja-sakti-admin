import { styled, theme } from "@/config/stitches/theme.stitches";
import * as React from "react";
import { Oval } from "react-loader-spinner";
import { Button, Text } from "../elements";

interface Props {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
}

export default function ErrorViewComponent(props: Props) {
  const { isLoading, refetch } = props;

  return (
    <ErrorViewContainer>
      <ErrorContentContainer>
        <Text variant="body1" color={theme.colors.errorMain.value}>
          Gagal Memuat
        </Text>
      </ErrorContentContainer>
      <ErrorActionContainer>
        {isLoading ? (
          <Oval color="white" height={18} width={18} />
        ) : (
          <RefreshContainer>
            <Button
              variant="error"
              onClick={() => {
                refetch && refetch();
              }}
            >
              Coba Ulang
            </Button>
          </RefreshContainer>
        )}
      </ErrorActionContainer>
    </ErrorViewContainer>
  );
}

const ErrorViewContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  maxWidth: "100%",
  alignSelf: "flex-start",
  alignItems: "center",
  background: "$inkLight",
  padding: "12px 12px",
  borderRadius: 12,
  my: 16,
});

const ErrorContentContainer = styled("div", {
  margin: "0px 8px",
  textAlign: "center",
});

const ErrorActionContainer = styled("div", {
  marginLeft: 12,
  display: "flex",
  alignItems: "center",
});

const RefreshContainer = styled("div", {
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
