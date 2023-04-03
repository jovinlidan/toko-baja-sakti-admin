import { css } from "@/config/stitches/theme.stitches";
import * as React from "react";
interface Props {
  cancelable: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DialogBackdrop(props: Props) {
  const { children, onClose, cancelable } = props;

  const onCancel = React.useCallback(() => {
    if (cancelable) {
      onClose();
    }
  }, [cancelable, onClose]);

  return (
    <div className={styles.backdropContainer().toString()} onClick={onCancel}>
      {children}
    </div>
  );
}

const styles = {
  backdropContainer: css({
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    zIndex: "$modal",
    justifyContent: "center",
    alignItems: "center",
  }),
};
