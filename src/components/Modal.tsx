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
import { cn } from "@utils/cn";

interface Props extends DialogProps {
  title?: string;
  showCloseBtn?: boolean;
  className?: string;
}

const Modal: React.FC<Props> = ({
  title,
  children,
  showCloseBtn = false,
  className,
  ...rest
}) => {
  return (
    <Dialog {...rest}>
      <DialogContent className={cn("max-w-3xl p-0", className)}>
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
