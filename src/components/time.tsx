import { defaultAnimation } from "../lib/utils";
import { useState, useEffect, HTMLAttributes, useRef } from "react";

type TimeProps = HTMLAttributes<HTMLDivElement>;

const Time: React.FC<TimeProps> = ({ ...props }) => {
  const timeRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    if (!timeRef.current) return;

    const timeCtx = defaultAnimation({ ref: timeRef, targetSelector: ".time" });

    return () => timeCtx.revert();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const torontoTime = new Date().toLocaleTimeString("en-CA", {
        timeZone: "America/Toronto",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(torontoTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={timeRef} {...props}>
      <p className="time">{currentTime}</p>
    </div>
  );
};

export default Time;
