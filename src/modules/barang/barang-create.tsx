import { BxChevronLeftSVG } from "@/common/assets";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import routeConstant from "@/constants/route.constant";
import BarangCreateForm from "./components/barang-create-form";

export default function BarangCreate() {
  return (
    <Container>
      <LinkText
        label="Kembali"
        href={routeConstant.BarangList}
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <BarangCreateForm />
    </Container>
  );
}
const Container = styled("div", {});
