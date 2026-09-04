"use client";
import dynamic from "next/dynamic";
import styles from "./MaxwellOS.module.css";

// Client-only so the saved desktop session is available on first render.
const MaxwellOS = dynamic(() => import("./MaxwellOS"), { ssr: false, loading: () => <div className={styles.boot} role="status">Starting Maxwell OS…</div> });

export default function MaxwellOSLoader() { return <MaxwellOS />; }
