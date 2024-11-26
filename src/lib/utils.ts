import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { RefObject } from "react";

export type DefaultAnimationOptions = gsap.TweenVars & {
  additionalAnimations?: gsap.TweenVars[];
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const defaultAnimation = ({
  ref,
  targetSelector,
  options,
}: {
  ref: RefObject<HTMLElement>;
  targetSelector?: string | string[];
  options?: DefaultAnimationOptions;
}): gsap.Context => {
  const defaults: DefaultAnimationOptions = {
    from: {
      opacity: 0,
      y: 20,
    },
    to: {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.inOut",
    },
    additionalAnimations: [],
  };

  const config: DefaultAnimationOptions = { ...defaults, ...options };

  const defaultAnimationCtx = gsap.context(() => {
    const defaultAnimationTl = gsap.timeline();
    defaultAnimationTl.fromTo(
      targetSelector ?? ref.current,
      { ...config.from },
      {
        ...config.to,
      },
      0
    );

    if (config.additionalAnimations && config.additionalAnimations.length > 0) {
      config.additionalAnimations.forEach((animation) => {
        defaultAnimationTl.to(targetSelector ?? ref.current, animation);
      });
    }
  }, ref);

  return defaultAnimationCtx;
};
