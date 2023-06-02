import { styled } from "@/config/stitches/theme.stitches";
import * as React from "react";
import ReportForm from "./components/form";

export default function ReportList() {
  return (
    <Container>
      <ReportForm />
    </Container>
  );
}

const Container = styled("div", {});

const TopContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  mb: 24,
});
