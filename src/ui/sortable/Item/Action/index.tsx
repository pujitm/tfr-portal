import { forwardRef, type CSSProperties } from "react";
import classNames from "classnames";

import styles from "./Action.module.scss";

// From https://github.com/clauderic/dnd-kit/blob/master/stories/components/Item/components/Action/Action.tsx

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(styles.Action, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            "--fill": active?.fill,
            "--background": active?.background,
          } as CSSProperties
        }
      />
    );
  }
);
Action.displayName = "SortableItemAction";
