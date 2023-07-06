import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

interface Props extends DialogProps {
  title?: string;
  showCloseBtn?: boolean;
}

const Modal: React.FC<Props> = ({
  title,
  children,
  showCloseBtn = false,
  ...rest
}) => {
  return (
    <Dialog {...rest}>
      <DialogContent className="max-w-3xl p-0">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
