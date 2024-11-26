import { HTMLAttributes } from "react";
import Time from "./time";
import Divider from "./divider";
import Link from "./link";
import { cn } from "../lib/utils";
import Name from "./name";

type HeaderProps = HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = ({ className, ...otherProps }) => {
  return (
    <div
      className={cn("w-full h-[55px] relative flex justify-between items-center px-4", className)}
      {...otherProps}
    >
      <Name />
      <Time className="absolute left-1/2 -translate-x-1/2" />
      <div className="flex gap-4">
        {/* <Link href="/about">About</Link> */}
        <Link href="/contact" className="text-red-400">
          Contact
        </Link>
      </div>
      <Divider className="bottom-0 left-0" />
    </div>
  );
};

export default Header;
