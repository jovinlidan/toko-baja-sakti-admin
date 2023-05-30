import { styled } from "@/config/stitches/theme.stitches";
import { useSideNavigation } from "@/hooks/use-side-navigation";
import { useRouter } from "next/router";
import Logo from "./logo";
import NavigationItem from "./navigation-item";

function checkForActive(key: string | string[], pathname) {
  if (Array.isArray(key)) {
    let valid = false;
    for (let i = 0; i < key.length; i++) {
      if (new RegExp(`/${key[i]}/`).test(pathname)) {
        valid = true;
      }
    }
    return valid;
  } else {
    return new RegExp(`/${key}/`).test(pathname);
  }
}

export default function SideNavigationWidget() {
  const { navigations } = useSideNavigation();
  const { pathname } = useRouter();

  return (
    <Container>
      <Logo />
      {navigations.map((nav) => (
        <NavigationItem
          {...nav}
          active={checkForActive(nav.key, pathname)}
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
