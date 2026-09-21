import { useEffect, useState } from "react";

type CountdownProps = {
  seconds: number;
  onElapsed?: () => void;
  format?: "clock" | "duration";
};

export function Countdown({ seconds, onElapsed, format = "clock" }: CountdownProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onElapsed?.();
      return;
    }
    const handle = window.setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearTimeout(handle);
  }, [remaining, onElapsed]);

  if (format === "duration") {
    if (remaining <= 0) return <span className="text-sm font-medium text-destructive">Overdue</span>;

    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;
    const parts = [days > 0 ? `${days}d` : "", hours > 0 ? `${hours}h` : "", minutes > 0 ? `${minutes}m` : "", `${secs}s`].filter(Boolean);

    return <span className="text-sm font-medium">{parts.join(" ")} left</span>;
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return <span className="font-mono text-sm">{mm}:{ss}</span>;
}
