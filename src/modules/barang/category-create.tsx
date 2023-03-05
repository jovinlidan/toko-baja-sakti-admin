import { BxChevronLeftSVG } from "@/common/assets";
import Separator from "@/components/common/separator";
import LinkText from "@/components/elements/link-text";
import { styled } from "@/config/stitches/theme.stitches";
import CategoryCreateForm from "./components/category-create-form";
import CategoryCreateTable from "./components/category-create-table";

export default function CategoryCreate() {
  return (
    <Container>
      <LinkText
        label="Kembali"
        href="/barang"
        startEnhancer={(color) => <BxChevronLeftSVG color={color} />}
      />
      <Separator mb={24} />
      <CategoryCreateForm />
      <Separator mb={24} />
      <CategoryCreateTable />
    </Container>
  );
}
const Container = styled("div", {});
