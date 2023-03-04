import { ApiError } from "@/common/repositories/common.model";
import React from "react";

import ErrorView from "./error-view-component";

interface WrapperProps {
  isLoading?: boolean;
  error?: ApiError | boolean | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  component: React.ReactNode;
  errorVertical?: boolean;
  onRetry?: () => void;
  emptyText?: string;
  showEmptyText?: boolean;
  showEmptyComponent?: boolean;
}

export default function FetchWrapperComponent(props: WrapperProps) {
  const {
    isLoading = false,
    error,
    onRetry,
    loadingComponent,
    component,
    errorComponent,
  } = props;

  if (isLoading) {
    return <>{loadingComponent}</> || null;
  } else if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return <ErrorView refetch={onRetry} />;
  }

  return <>{component}</>;
}
