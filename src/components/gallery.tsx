import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { projects } from "../lib/constants";
import gsap from "gsap";

type GalleryProps = HTMLAttributes<HTMLDivElement> & {
  projectIndex: number | null;
};

const Gallery: React.FC<GalleryProps> = ({ projectIndex, className, ...otherProps }) => {
  const [images, setImages] = useState<{ name: string; src: string }[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageIndex(0);
  }, [projectIndex]);

  useEffect(() => {
    if (projectIndex === null) return;

    const next = () => {
      if (imageIndex >= projects[projectIndex].images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex((curr) => curr + 1);
      }
    };

    setImages([...images, projects[projectIndex].images[imageIndex]]);
    const slideshow = setTimeout(() => next(), 1000);

    return () => clearTimeout(slideshow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIndex, projectIndex]);

  useEffect(() => {
    if (images.length === 0) return;

    const galleryCtx = gsap.context(() => {
      const gallery = gsap.timeline();

      if (projectIndex === null) {
        gallery.to(".gallery-image", {
          opacity: 0,
          onComplete: () => {
            setImages([]);
          },
        });
      } else {
        gallery.fromTo(
          `.gallery-image-${images.length - 1}`,
          { scale: 1.1, x: gsap.utils.random(-50, 50), y: gsap.utils.random(-50, 50) },
          {
            rotate: gsap.utils.random(-10, 10),
            scale: 1,
            x: gsap.utils.random(-25, 25),
            y: gsap.utils.random(-25, 25),
          }
        );
      }
    }, galleryRef);

    return () => galleryCtx.kill();
  }, [images, projectIndex]);

  useEffect(() => {
    if (images.length === 0) return;

    gsap.context(() => {
      const galleryCleanup = gsap.timeline();
      galleryCleanup.to(`.gallery-image-${images.length - 1}`, {
        opacity: 0,
        delay: 5,
        onComplete: () => {
          gsap.set(`.gallery-image-${images.length - 1}`, { display: "none" });
        },
      });
    }, galleryRef);
  }, [images]);

  return (
    <div
      ref={galleryRef}
      className={cn("relative flex justify-center items-center", className)}
      {...otherProps}
    >
      {images.map(({ name, src }, i) => (
        <div
          key={i}
          className={cn(
            "w-3/4 absolute p-4 rounded bg-secondary shadow-2xl gallery-image",
            `gallery-image-${i}`
          )}
        >
          <img src={src} className="saturate-50" />
          <p className="mt-4 pb-[32px] font-handwritten text-primary text-xl">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
