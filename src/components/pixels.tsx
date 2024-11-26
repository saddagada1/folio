import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useResizeObserver } from "usehooks-ts";
import { glyphs, rows, cols } from "../lib/constants";
import { cn } from "../lib/utils";

type PixelProps = HTMLAttributes<HTMLDivElement> & {
  pause?: boolean;
};

const Pixels: React.FC<PixelProps> = ({ pause, className, ...otherProps }) => {
  const pixelsRef = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver({
    ref: pixelsRef,
    box: "border-box",
  });
  const [glyphIndex, setGlyphIndex] = useState(0);

  const glyph = useMemo(() => {
    return glyphs[glyphIndex];
  }, [glyphIndex]);

  useEffect(() => {
    if (!width || !height) return;

    const pixelsCtx = gsap.context(() => {
      const pixels = gsap.timeline();
      const selectedPixels = glyph.map((i) => `.grid-item-${i.index}`);

      if (pause) {
        pixels.set(selectedPixels, {
          backgroundColor: "transparent",
          stagger: {
            each: 0.0025,
            from: "random",
          },
        });
      } else {
        pixels
          .to(selectedPixels, {
            backgroundColor: (e) => glyph[e].color,
            stagger: {
              each: 0.01,
              from: "random",
            },
          })
          .to(selectedPixels, {
            backgroundColor: "transparent",
            stagger: {
              each: 0.01,
              from: "random",
            },
            delay: 1,
            onComplete: () => {
              if (glyphIndex === glyphs.length - 1) {
                setGlyphIndex(0);
              } else {
                setGlyphIndex(glyphIndex + 1);
              }
            },
          });
      }
    }, pixelsRef);

    return () => pixelsCtx.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glyph, width, height, pause]);

  return (
    <div
      ref={pixelsRef}
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      className={cn("grid", className)}
      {...otherProps}
    >
      {width &&
        height &&
        Array.from({ length: cols * rows }).map((_, index) => (
          <span
            key={`grid-item-${index}`}
            style={{
              width: width / cols,
              height: height / rows,
            }}
            className={cn(
              `grid-item-${index}`,
              index % cols !== 0 && "border-l",
              index >= cols && "border-t"
            )}
          />
        ))}
    </div>
  );
};

export default Pixels;
