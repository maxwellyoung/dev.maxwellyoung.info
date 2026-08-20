"use client";

import { Grid3X3 } from "lucide-react";
import { BOSS_KEY_OPEN_EVENT } from "@/lib/bossKey";
import styles from "./BossKeyMode.module.css";

export function BossKeyTrigger() {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => window.dispatchEvent(new Event(BOSS_KEY_OPEN_EVENT))}
      aria-label="Open quick spreadsheet mode"
      title="Quick spreadsheet (Ctrl+Shift+X)"
    >
      <Grid3X3 size={13} aria-hidden="true" />
      <span>Spreadsheet</span>
    </button>
  );
}