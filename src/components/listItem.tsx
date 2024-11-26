import { cn } from "../lib/utils";
import { HTMLAttributes } from "react";

type ListItemProps = HTMLAttributes<HTMLDivElement>;

const ListItem: React.FC<ListItemProps> = ({ className, children, ...otherProps }) => {
  return (
    <div
      className={cn(
        "w-full min-h-[55px] relative flex justify-between items-center px-4",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};
export default ListItem;
