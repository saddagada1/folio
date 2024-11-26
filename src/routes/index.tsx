import { createFileRoute } from "@tanstack/react-router";
import ListItem from "../components/listItem";
import Divider from "../components/divider";
import { projects, socials } from "../lib/constants";
import { useRef, useEffect, useState } from "react";
import { cn, defaultAnimation } from "../lib/utils";
import gsap from "gsap";
import Pixels from "../components/pixels";
import Link from "../components/link";
import Gallery from "../components/gallery";

const Index: React.FC = () => {
  const [projectIndex, setProjectIndex] = useState<number | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!summaryRef.current || !projectsRef.current) return;

    const summaryCtx = defaultAnimation({ ref: summaryRef, targetSelector: ".summary" });
    const projectsCtx = defaultAnimation({ ref: projectsRef, targetSelector: ".project" });
    gsap.set(".divider", {
      opacity: 1,
      stagger: {
        each: 0.1,
      },
      delay: 1,
    });

    return () => {
      summaryCtx.revert();
      projectsCtx.revert();
    };
  }, []);

  return (
    <main className="flex-1 flex relative">
      <div className="flex-1 relative flex justify-center items-center animate-fadeIn">
        <div className="w-3/4 aspect-square relative">
          <Pixels pause={projectIndex !== null} className="w-full h-full" />
          <Gallery projectIndex={projectIndex} className="absolute w-full h-full top-0 left-0" />
        </div>
        <div className="absolute w-3/4 aspect-square vignette" />
      </div>
      <div className="flex-1 relative flex flex-col">
        <Divider vertical />
        <div ref={projectsRef} className="flex-1 relative">
          <ListItem className="project">
            <h1>( Selected Work )</h1>
            <p>'20 - '24</p>
            <Divider noAnim className="divider left-0 bottom-0 opacity-0" />
          </ListItem>
          {projects.map((p, i) => (
            <div
              key={p.name}
              onMouseEnter={() => {
                if (p.disabled) return;
                setProjectIndex(i);
              }}
              onMouseLeave={() => {
                if (p.disabled) return;
                setProjectIndex(null);
              }}
              className={cn(
                "project relative",
                p.disabled
                  ? "text-accent"
                  : "group/project cursor-pointer hover:bg-secondary hover:text-primary transition-colors"
              )}
            >
              <ListItem>
                <h1>{p.name}</h1>
                <p>{p.year}</p>
              </ListItem>
              <div className="flex items-end opacity-0 h-0 justify-between group-hover/project:h-[55px] group-hover/project:opacity-100 transition-all">
                <h1 className="flex-1 m-4">{p.description}</h1>
                <div className="flex gap-4 m-4">
                  {p.links.map((l) => (
                    <Link key={l.name} href={l.address}>
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Divider noAnim className="divider left-0 bottom-0 opacity-0" />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end p-4">
          <div ref={summaryRef} className="flex-1">
            <h1 className="summary mb-4">( Summary )</h1>
            <p className="summary w-1/2">
              An independent, creative, multidisciplinary developer with a passion for crafting
              exceptional digital experiences and creating art through code.
            </p>
          </div>
          <div className="flex gap-4">
            {socials.map((s, i) => (
              <Link key={s.name} href={s.address} options={{ delay: i * 0.05 }}>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
