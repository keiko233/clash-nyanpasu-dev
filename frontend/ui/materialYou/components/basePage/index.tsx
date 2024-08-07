import { CSSProperties, FC, ReactNode, useRef } from "react";
import { BaseErrorBoundary } from "./baseErrorBoundary";
import Header from "./header";
import "./style.scss";
import { cn } from "@/utils";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { AsyncComponent, AsyncComponentProps } from "../asyncComponent";

interface BasePageProps {
  title?: ReactNode;
  header?: ReactNode;
  contentStyle?: CSSProperties;
  sectionStyle?: CSSProperties;
  full?: boolean;
  noViewport?: boolean;
  children?: ReactNode | AsyncComponentProps["component"];
}

export const BasePage: FC<BasePageProps> = ({
  title,
  header,
  contentStyle,
  sectionStyle,
  full,
  noViewport,
  children,
}) => {
  const isAsyncComponent = typeof children === "function";

  const Children = () => {
    return isAsyncComponent ? (
      <AsyncComponent component={children} />
    ) : (
      children
    );
  };

  return (
    <BaseErrorBoundary>
      <div className="MDYBasePage" data-windrag>
        <Header title={title} header={header} />

        <ScrollArea.Root
          className="MDYBasePage-container relative h-full w-full overflow-hidden rounded-3xl"
          style={contentStyle}
        >
          {noViewport ? (
            <Children />
          ) : (
            <ScrollArea.Viewport
              className={cn(
                "relative h-full w-full [&>div]:!block",
                full ?? "p-6",
              )}
              style={sectionStyle}
            >
              <Children />
            </ScrollArea.Viewport>
          )}

          <ScrollArea.Scrollbar
            className="flex touch-none select-none py-6 pr-1.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="ScrollArea-Thumb relative flex !w-1.5 flex-1 rounded-full" />
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
    </BaseErrorBoundary>
  );
};

export const ScrollAreaViewport = ScrollArea.Viewport;
