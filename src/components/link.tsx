import { Link as RouterLink } from "@tanstack/react-router";
import { HTMLAttributes, useEffect, useRef } from "react";
import { cn, defaultAnimation, DefaultAnimationOptions } from "../lib/utils";

type LinkProps = HTMLAttributes<HTMLDivElement> & {
  href: string;
  useRouter?: boolean;
  options?: DefaultAnimationOptions;
};

const Link: React.FC<LinkProps> = ({
  href,
  useRouter,
  options,
  className,
  children,
  ...otherProps
}) => {
  const linkRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!linkRef.current) return;

    const linkCtx = defaultAnimation({
      ref: linkRef,
      options,
    });

    return () => linkCtx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={linkRef} className={cn("group/link", className)} {...otherProps}>
      <span className="inline-block transition-transform group-hover/link:-translate-x-2">[</span>
      {useRouter ? (
        <RouterLink to={href}>{children}</RouterLink>
      ) : (
        <a href={href} className="no-underline">
          {children}
        </a>
      )}
      <span className="inline-block transition-transform group-hover/link:translate-x-2">]</span>
    </div>
  );
};

export default Link;
