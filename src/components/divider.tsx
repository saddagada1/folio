import { HTMLAttributes, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../lib/utils";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  vertical?: boolean;
  noAnim?: boolean;
};

const Divider: React.FC<DividerProps> = ({ vertical, noAnim, className, ...otherProps }) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dividerRef.current || noAnim) return;

    const dividerCtx = gsap.context(() => {
      const divider = gsap.timeline();
      divider.fromTo(
        dividerRef.current,
        {
          scaleX: !vertical ? 0 : undefined,
          scaleY: vertical ? 0 : undefined,
        },
        {
          scaleX: !vertical ? 1 : undefined,
          scaleY: vertical ? 1 : undefined,
          duration: 1.5,
          ease: "power4.inOut",
        }
      );
    }, dividerRef);

    return () => dividerCtx.revert();
  }, [noAnim, vertical]);

  return (
    <div
      ref={dividerRef}
      className={cn(
        "absolute bg-neutral-800",
        vertical && "origin-bottom h-full w-[1px]",
        !vertical && "origin-left w-full h-[1px]",
        className
      )}
      {...otherProps}
    />
  );
};
export default Divider;
