import sizeConstant from "@/constants/size.constant";
import { useSideNavigation } from "@/hooks/use-side-navigation";
import { useRouter } from "next/router";
import { Text } from "@/components/elements";
import * as React from "react";
import { styled } from "@/config/stitches/theme.stitches";

export default function Header() {
  const { navigations } = useSideNavigation();
  const router = useRouter();

  const mappings = React.useMemo(() => {
    return [
      ...navigations,
      {
        label: "/",
        href: "Beranda",
      },
    ];
  }, [navigations]);

  const headerMapper = React.useCallback(
    (path: string) => {
      const res = mappings.filter((mapping) => mapping.href === path);
      if (res.length) return res[0].label;
      return "";
    },
    [mappings]
  );

  return (
    <StyledHeader>
      <Container>
        <Text variant="h5">{headerMapper(router.pathname)}</Text>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled("header", {
  position: "fixed",
  background: "#FFFFFF",
  height: sizeConstant.headerHeight,
  width: "100%",
});

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  height: "100%",
  marginLeft: 40,
});
