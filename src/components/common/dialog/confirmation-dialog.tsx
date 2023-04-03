import { Button, Text } from "@/components/elements";
import * as React from "react";

import DialogBackdrop from "./dialog-backdrop";
import { Panel } from "./styles";
import Separator from "../separator";
import { css } from "@/config/stitches/theme.stitches";

export interface ConfirmationOption {
  title?: string;
  message: string;
  positiveLabel?: string;
  negativeLabel?: string;
  onPositiveAction: (dismiss: VoidFunction) => void;
  onNegativeAction?: (dismiss: VoidFunction) => void;
  noNegative?: boolean;
  dialogIcon?: "success" | "warning";
}

interface Props extends ConfirmationOption {
  onClose: () => void;
}

export default function ConfirmationDialog(props: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const {
    title,
    message,
    positiveLabel = "YAKIN",
    negativeLabel = "BATAL",
    onPositiveAction,
    onNegativeAction,
    noNegative = false,
    onClose,
    dialogIcon,
  } = props;

  const onPositivePress = React.useCallback(async () => {
    try {
      setIsSubmitting(true);
      await onPositiveAction(onClose);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [onClose, onPositiveAction]);

  const onNegativePress = React.useCallback(() => {
    if (onNegativeAction) {
      onNegativeAction(onClose);
    } else {
      onClose();
    }
  }, [onClose, onNegativeAction]);

  return (
    <DialogBackdrop cancelable={false} onClose={onClose}>
      <Panel>
        {title && <Text variant="h5">{title}</Text>}
        <Separator mt={16} />
        <Text variant="subtitle1">{message}</Text>
        <Separator mt={40} />
        <div className={styles.buttonContainer()}>
          {!noNegative && (
            <>
              <Button
                variant="error"
                onClick={onNegativePress}
                disabled={isSubmitting}
                size="large"
              >
                {negativeLabel}
              </Button>
              <Separator mr={24} />
            </>
          )}
          <Button
            onClick={onPositivePress}
            loading={isSubmitting}
            disabled={isSubmitting}
            size="large"
          >
            {positiveLabel}
          </Button>
        </div>
      </Panel>
    </DialogBackdrop>
  );
}

const styles = {
  wrapperButton: css({
    width: "100%",
  }),
  buttonContainer: css({
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  }),
};
