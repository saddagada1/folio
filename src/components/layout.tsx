import { HTMLAttributes } from "react";
import Header from "./header";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

const Layout: React.FC<LayoutProps> = ({ children, ...otherProps }) => {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col font-mono uppercase text-sm"
      {...otherProps}
    >
      <Header />
      {children}
    </div>
  );
};

export default Layout;
