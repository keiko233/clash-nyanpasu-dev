import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps } from "@mui/material/styles";
import {
  cloneElement,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { TransitionProps } from "@mui/material/transitions";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useDebounceFn from "ahooks/lib/useDebounceFn";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";

export interface BaseDialogProps {
  title: ReactNode;
  open: boolean;
  close?: string;
  ok?: string;
  disabledOk?: boolean;
  sx?: SxProps;
  contentSx?: SxProps;
  children?: ReactNode;
  loading?: boolean;
  onOk?: () => void | Promise<void>;
  onClose?: () => void;
  divider?: boolean;
}

export const BaseDialog = ({
  title,
  open,
  close,
  onClose,
  children,
  sx,
  contentSx,
  disabledOk,
  loading,
  onOk,
  ok,
  divider,
}: BaseDialogProps) => {
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);

  const [okLoading, setOkLoading] = useState(false);

  const { run: runMounted, cancel: cancelMounted } = useDebounceFn(
    () => setMounted(false),
    { wait: 300 },
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
      runMounted();
    }
  };

  const handleOk = useLockFn(async () => {
    if (!onOk) return;

    if (onOk.constructor.name === "AsyncFunction") {
      try {
        setOkLoading(true);

        await onOk();
      } finally {
        setOkLoading(false);
      }
    } else {
      onOk();
    }
  });

  useEffect(() => {
    if (open) {
      setMounted(true);
      cancelMounted();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted={mounted}
      // TransitionComponent={BaseDialogTransition}
      sx={sx}
    >
      <DialogTitle sx={divider ? { pb: 2 } : null}>{title}</DialogTitle>

      {divider && <Divider />}

      <DialogContent
        sx={{
          width: 400,
          pt: divider ? 2 : null,
          pb: divider ? 2 : null,
          maxHeight: "calc(100vh - 256px)",
          ...contentSx,
        }}
      >
        {children}
      </DialogContent>

      {divider && (onClose || close || onOk || ok) && <Divider />}

      <DialogActions sx={divider ? { pt: 2 } : null}>
        {onClose && (
          <Button variant="outlined" onClick={handleClose}>
            {close || t("Close")}
          </Button>
        )}

        {onOk && (
          <LoadingButton
            disabled={loading || disabledOk}
            loading={okLoading || loading}
            variant="contained"
            onClick={handleOk}
          >
            {ok || t("Ok")}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

const BaseDialogTransition = forwardRef(function BaseDialogTransition(
  props: TransitionProps,
  ref,
) {
  const { in: inProp, children } = props;

  return (
    <AnimatePresence>
      {inProp && (
        <motion.div
          style={{
            width: "fit-content",
            height: "fit-content",
            maxHeight: "100vh",
            position: "fixed",
          }}
          initial={{
            opacity: 0,
            scale: 0,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
        >
          {children &&
            cloneElement(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              React.Children.only(children as unknown as any),
              {
                style: {
                  opacity: 1,
                  visibility: "visible",
                },
                // TODO: 也许 framer motion 就不会产生这个，手动设定一下。等弄清楚了再说。
                tabIndex: -1,
                ref: ref,
              },
            )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
