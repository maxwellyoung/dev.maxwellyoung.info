"use client";

import { useEffect, useState } from "react";
import { aucklandZoneLabel } from "@/lib/aucklandTime";

export function AucklandTimeZone() {
  const [label, setLabel] = useState("Pacific/Auckland");
  useEffect(() => {
    const update = () => setLabel(aucklandZoneLabel(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return <span>{label}</span>;
}
