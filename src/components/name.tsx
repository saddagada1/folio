import { HTMLAttributes, useEffect, useRef } from "react";
import { defaultAnimation, cn } from "../lib/utils";
import gsap from "gsap";

const shorthandLetterIndexes = [0, 1, 2, 4];

type NameProps = HTMLAttributes<HTMLDivElement>;

const Name: React.FC<NameProps> = ({ className, ...otherProps }) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!nameRef.current) return;

    const nameCtx = defaultAnimation({ ref: nameRef });
    const letterCtx = gsap.context(() => {
      const letter = gsap.timeline();
      letter.to(".fade-letter", {
        opacity: 0,
        delay: 2,
        stagger: {
          each: 0.5,
          from: "random",
        },
        onComplete: () => {
          gsap.set(".cleanup-letter", {
            display: "none",
          });
        },
      });
    }, letterRef);
    return () => {
      nameCtx.revert();
      letterCtx.revert();
    };
  }, []);

  return (
    <div ref={nameRef} className={cn("flex gap-4", className)} {...otherProps}>
      <h1 ref={letterRef}>
        {"Saivamsi Addagada".split("").map((v, i) => (
          <span
            key={i}
            className={cn(
              !shorthandLetterIndexes.includes(i) && "fade-letter",
              ![...shorthandLetterIndexes, 3].includes(i) && "cleanup-letter"
            )}
          >
            {v}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Name;
