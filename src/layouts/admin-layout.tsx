import { styled } from "@/config/stitches/theme.stitches";
import sizeConstant from "@/constants/size.constant";
import { SideNavigationProvider } from "@/hooks/use-side-navigation";
import Header from "@/widgets/header";
import SideNavigationWidget from "@/widgets/side-navigation";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout(props: Props) {
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
  padding: "20px 37px 0px 24px",
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
