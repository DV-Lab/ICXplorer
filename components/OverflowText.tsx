/**
 * This component prevent text overflow outside and show tooltip when truncated
 */
import { Tooltip } from "@material-tailwind/react";
import { cx } from "@utils/tools";
import { HTMLAttributes } from "react";

export const OverflowText: IComponent<HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} className={cx("w-full truncate", props.className)}>
      <Tooltip
        content={props.children}
        className="max-w-md !text-white"
        placement="top-start"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <span>{props.children}</span>
      </Tooltip>
    </div>
  );
};
