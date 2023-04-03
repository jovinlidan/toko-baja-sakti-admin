import Dialog, { DialogHandler } from "@/components/common/dialog";
import React, { useRef, useMemo } from "react";

const DialogContext = React.createContext<DialogHandler | undefined>(undefined);

export function DialogProvider({ children }: any) {
  const DialogRef = useRef<DialogHandler>(null);
  const action = useMemo(
    () => ({
      showConfirmation(confirmationOption: any) {
        if (DialogRef.current) {
          DialogRef.current.showConfirmation(confirmationOption);
        }
      },
      showCustom(customOption: any) {
        if (DialogRef.current) {
          DialogRef.current.showCustom(customOption);
        }
      },
    }),
    []
  );
  return (
    <>
      <DialogContext.Provider value={action}>{children}</DialogContext.Provider>
      <Dialog ref={DialogRef} />
    </>
  );
}

export default function useDialog() {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error("UseDialog must be used within DialogProvider");
  }
  return context;
}
