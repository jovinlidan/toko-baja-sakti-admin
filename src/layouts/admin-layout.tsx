import { useGetStockMinimumNotification } from "@/api-hooks/notification/notification.query";
import { Button, Text } from "@/components/elements";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import sizeConstant from "@/constants/size.constant";
import { SideNavigationProvider } from "@/hooks/use-side-navigation";
import { ReportType } from "@/modules/report/report-metadata";
import Header from "@/widgets/header";
import SideNavigationWidget from "@/widgets/side-navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useSound from "use-sound";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout(props: Props) {
  const [isSoundLoad, setIsSoundLoad] = useState<boolean>(false);
  const [play] = useSound("/sound/beep.wav", {
    onload() {
      setIsSoundLoad(true);
    },
  });
  const onViewReport = useCallback(() => {
    const reportView = routeConstant.ReportView.replace(
      "[id]",
      encodeURIComponent("report/" + ReportType.NotificationStockMinimum)
    );
    window.open(reportView, "_blank");
  }, []);

  useGetStockMinimumNotification({
    refetchInterval: 10000,
    enabled: isSoundLoad,
    onSuccess(data) {
      if (data.data?.length > 0) {
        toast(
          (t) => (
            <Row>
              <Text>Ada barang dibawah stok minimum</Text>
              <Button variant="warning" size="small" onClick={onViewReport}>
                Lihat
              </Button>
            </Row>
          ),
          { icon: "⚠️" }
        );
        play();
      }
    },
  });
  return (
    <Container>
      <SideNavigationProvider>
        <BodyContainer>
          <SideNavigationContainer>
            <SideNavigationWidget />
          </SideNavigationContainer>
          <PageWrapper>
            <Header />
            <Content>{props.children}</Content>
          </PageWrapper>
        </BodyContainer>
      </SideNavigationProvider>
    </Container>
  );
}

const Container = styled("div", {
  height: "100vh",
});

const Content = styled("div", {
  marginTop: sizeConstant.headerHeight,
  padding: "20px 37px 40px 24px",
});

const SideNavigationContainer = styled("div", {
  minWidth: sizeConstant.sideNavigationWidth,
  maxWidth: sizeConstant.sideNavigationWidth,
  width: sizeConstant.sideNavigationWidth,
});

const PageWrapper = styled("div", {
  width: "100%",
  height: "100vh",
  overflow: "scroll",
  background: "#F5F5F9",
});

const BodyContainer = styled("div", {
  display: "flex",
  width: "100%",
});

const Row = styled("div", {
  display: "flex",
  alignItems: "center",
});
