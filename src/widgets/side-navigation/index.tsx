import { styled } from "@/config/stitches/theme.stitches";
import { useSideNavigation } from "@/hooks/use-side-navigation";
import { useRouter } from "next/router";
import Logo from "./logo";
import NavigationItem from "./navigation-item";

export default function SideNavigationWidget() {
  const { navigations } = useSideNavigation();
  const { pathname } = useRouter();

  return (
    <Container>
      <Logo />
      {navigations.map((nav) => (
        <NavigationItem
          {...nav}
          active={pathname.includes(nav.key)}
          key={nav.href}
        />
      ))}
    </Container>
  );
}
const Container = styled("div", {
  background: "#FFFFFF",
  width: "100%",
  height: "100%",
});
