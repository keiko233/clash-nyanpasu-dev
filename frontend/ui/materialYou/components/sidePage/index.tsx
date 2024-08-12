import { motion } from "framer-motion";
import { FC, ReactNode, Ref } from "react";
import { cn } from "@/utils";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { BaseErrorBoundary } from "../basePage/baseErrorBoundary";
import Header from "../basePage/header";
import style from "./style.module.scss";

interface Props {
  title?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
  sideBar?: ReactNode;
  side?: ReactNode;
  sideClassName?: string;
  toolBar?: ReactNode;
  noChildrenScroll?: boolean;
  flexReverse?: boolean;
  leftViewportRef?: Ref<HTMLDivElement>;
  rightViewportRef?: Ref<HTMLDivElement>;
}

export const SidePage: FC<Props> = ({
  title,
  header,
  children,
  sideBar,
  side,
  sideClassName,
  toolBar,
  noChildrenScroll,
  flexReverse,
  leftViewportRef,
  rightViewportRef,
}) => {
  return (
    <BaseErrorBoundary>
      <div className={style["MDYSidePage-Main"]} data-windrag>
        <Header title={title} header={header} />

        <div className={style["MDYSidePage-Container"]}>
          <div
            className={style["MDYSidePage-Layout"]}
            style={{
              flexDirection: flexReverse ? "row-reverse" : undefined,
              gap: side ? undefined : "0px",
            }}
          >
            {/* <motion.div
              className={style.LeftContainer}
              initial={false}
              animate={side ? "open" : "closed"}
              variants={{
                open: {
                  opacity: 1,
                  maxWidth: "348px",
                  minWidth: "192px",
                  display: "flex",
                },
                closed: {
                  opacity: 0.5,
                  maxWidth: 0,
                  transitionEnd: {
                    display: "none",
                  },
                },
              }}
            >
              {sideBar && <div>{sideBar}</div>}

              <ScrollArea.Root
                // className="MDYBasePage-container relative h-full w-full overflow-hidden rounded-3xl"
                // style={contentStyle}
                className={style["LeftContainer-Content"]}
              >
                <ScrollArea.Viewport
                  className={cn(
                    "relative h-full w-full [&>div]:!block",
                    sideClassName,
                  )}
                  ref={leftViewportRef}
                >
                  <SideChildren />
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </motion.div> */}

            {/* <div className={style.RightContainer}>
              {toolBar && (
                <>
                  <Toolbar variant="dense">{toolBar}</Toolbar>

                  <Divider />
                </>
              )}

              <div
                className={style["RightContainer-Content"]}
                style={toolBar ? { height: "calc(100% - 49px)" } : undefined}
              >
                <section
                  style={noChildrenScroll ? { overflow: "visible" } : undefined}
                >
                  {children}
                </section>
              </div>
            </div> */}

            <ScrollArea.Root
              // className="MDYBasePage-container relative h-full w-full overflow-hidden rounded-3xl"
              // style={contentStyle}
              className={style["Container-common"]}
            >
              <ScrollArea.Viewport
                className={cn(
                  "relative h-full w-full [&>div]:!block",
                  sideClassName,
                )}
                ref={rightViewportRef}
              >
                {children}
              </ScrollArea.Viewport>

              <ScrollArea.Scrollbar
                className="flex touch-none select-none py-6 pr-1.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb
                  className={cn(
                    style["ScrollArea-Thumb"],
                    "relative flex !w-1.5 flex-1 rounded-full",
                  )}
                />
              </ScrollArea.Scrollbar>

              {/* <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar> */}
              <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
          </div>
        </div>
      </div>
    </BaseErrorBoundary>
  );
};
