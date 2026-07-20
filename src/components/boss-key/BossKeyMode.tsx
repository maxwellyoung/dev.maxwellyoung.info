"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlignLeft, BarChart3, Bold, Clipboard, Redo2, Save, Undo2 } from "lucide-react";
import { BOSS_KEY_OPEN_EVENT, calculateForecast, getBossKeyAction, spreadsheetColumnName } from "@/lib/bossKey";
import styles from "./BossKeyMode.module.css";
import { formatCurrency, getWorkbookMeta, updateWorkbook, type WorkbookInputs } from "@/lib/portfolioUtilities";

const engineeringForecast = calculateForecast(428_100, 5);
const entries: Record<string, string> = {
  "1-1":"Q3 OPERATING FORECAST", "2-1":"Department", "2-2":"Owner", "2-3":"Q1 Actual", "2-4":"Q2 Actual", "2-5":"Q3 Forecast", "2-6":"Variance", "2-7":"Status",
  "3-1":"Product", "3-2":"J. Chen", "3-3":"$284,500", "3-4":"$302,800", "3-5":"$318,000", "3-6":"+5.0%", "3-7":"On track",
  "4-1":"Engineering", "4-2":"S. Patel", "4-3":"$412,200", "4-4":"$428,100", "4-5":`$${engineeringForecast.toLocaleString("en-US")}`, "4-6":"+5.0%", "4-7":"On track",
  "5-1":"Sales", "5-2":"M. Wilson", "5-3":"$198,400", "5-4":"$221,600", "5-5":"$246,000", "5-6":"+11.0%", "5-7":"Review",
  "6-1":"Marketing", "6-2":"A. Brown", "6-3":"$126,800", "6-4":"$119,300", "6-5":"$132,500", "6-6":"+11.1%", "6-7":"On track",
  "7-1":"Operations", "7-2":"R. Taylor", "7-3":"$174,200", "7-4":"$181,900", "7-5":"$186,000", "7-6":"+2.3%", "7-7":"On track",
  "9-1":"TOTAL", "9-3":"$1,196,100", "9-4":"$1,253,700", "9-5":"$1,332,005", "9-6":"+6.2%",
  "12-1":"Notes", "13-1":"Forecast reflects approved headcount plan as of 15 July.", "14-1":"Sales variance includes revised enterprise pipeline assumptions."
};

export function BossKeyMode() {
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState<"Forecast" | "Assumptions" | "Headcount">("Forecast");
  const [workbook, setWorkbook] = useState<WorkbookInputs>({ growth: 5, headcount: 4, costPerHire: 100_000, baseline: 428_100 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meta = getWorkbookMeta(new Date(), typeof navigator === "undefined" ? "en-NZ" : navigator.language);
  const forecast = updateWorkbook(workbook, {});

  const closeRef = useRef<HTMLButtonElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const restore = useRef({ title: "", overflow: "" });
  const close = useCallback(() => setActive(false), []);
  const closeClick = (detail: number) => {
    if (detail > 1) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      window.location.replace("https://www.office.com/");
      return;
    }
    closeTimer.current = setTimeout(close, 220);
  };
  const open = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    setActive(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = getBossKeyAction(event, active);
      if (!action) return;
      event.preventDefault();
      if (action === "close" || active) close(); else open();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, close, open]);

  useEffect(() => {
    window.addEventListener(BOSS_KEY_OPEN_EVENT, open);
    return () => window.removeEventListener(BOSS_KEY_OPEN_EVENT, open);
  }, [open]);

  useEffect(() => {
    const onUtilityOpen = () => close();
    window.addEventListener("portfolio-utility:open", onUtilityOpen);
    return () => window.removeEventListener("portfolio-utility:open", onUtilityOpen);
  }, [close]);

  useEffect(() => {
    const background = document.getElementById("site-content");
    if (active) {
      restore.current = { title: document.title, overflow: document.body.style.overflow };
      document.title = `${meta.filename} - Excel`;
      document.body.style.overflow = "hidden";
      background?.setAttribute("inert", "");
      background?.setAttribute("aria-hidden", "true");
      requestAnimationFrame(() => {
        closeRef.current?.focus();
        if (window.matchMedia("(max-width: 600px)").matches) selectedRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
      });
    } else if (restore.current.title) {
      document.title = restore.current.title;
      document.body.style.overflow = restore.current.overflow;
      background?.removeAttribute("inert");
      background?.removeAttribute("aria-hidden");
      const focusTarget = previousFocus.current?.isConnected ? previousFocus.current : null;
      requestAnimationFrame(() => focusTarget?.focus());
      restore.current.title = "";
    }
    return () => {
      if (!active) return;
      document.title = restore.current.title;
      document.body.style.overflow = restore.current.overflow;
      background?.removeAttribute("inert");
      background?.removeAttribute("aria-hidden");
    };
  }, [active, meta.filename]);

  return <>

    {active && <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Microsoft Excel spreadsheet decoy">
      <div className={styles.titlebar}><span className={styles.appIcon}>X</span><Save size={15}/><Undo2 size={14}/><Redo2 size={14}/><span className={styles.filename}>{meta.filename} <span>• Fictional demo · {meta.date}</span></span><div className={styles.windowButtons} aria-label="Window controls"><span aria-hidden="true">─</span><span aria-hidden="true">□</span><button ref={closeRef} className={styles.windowClose} onClick={(event) => closeClick(event.detail)} aria-label="Close spreadsheet. Double click to leave site safely." title="Close"><span aria-hidden="true">×</span></button></div></div>
      <div className={styles.tabs}>{["File","Home","Insert","Page Layout","Formulas","Data","Review","View","Help"].map((tab,i)=><span key={tab} className={`${styles.tab} ${i===1?styles.tabActive:""}`}>{tab}</span>)}</div>
      <div className={styles.ribbon} aria-hidden="true"><div className={styles.group}><Clipboard className={styles.largeTool}/><small>Paste</small></div><div className={`${styles.group} ${styles.fontGroup}`}><div><select defaultValue="Aptos Narrow"><option>Aptos Narrow</option></select><select defaultValue="11"><option>11</option></select></div><div className={styles.toolRow}><Bold size={15}/><span>𝐼</span><span>U̲</span><span>▦</span></div></div><div className={styles.group}><AlignLeft size={17}/><span>≡</span><small>Wrap Text</small></div><div className={styles.group}><span className={styles.tool}>$</span><span className={styles.tool}>%</span><span>.00</span></div><div className={styles.group}><BarChart3 size={19}/><small>Conditional<br/>Formatting</small></div></div>
      <div className={styles.formula}><div className={styles.nameBox}>E4</div><div className={styles.fx}>fx</div><div className={styles.formulaInput}>=D4*(1+{workbook.growth.toFixed(1)}%) + approved headcount</div></div>
      <div className={styles.sheetWrap}>{tab === "Forecast" ? <div className={styles.sheet} aria-label={`${meta.quarter} fictional operating forecast worksheet`}>
        <div className={styles.corner}/>{Array.from({length:14},(_,c)=><div className={styles.header} key={`h${c}`}>{spreadsheetColumnName(c)}</div>)}
        {Array.from({length:32},(_,r)=><div key={`row-${r}`} style={{display:"contents"}}><div className={styles.rowHeader}>{r+1}</div>{Array.from({length:14},(_,c)=>{const key=`${r+1}-${c+1}`; const value=key === "4-5" ? formatCurrency(forecast.forecast, typeof navigator === "undefined" ? "en-NZ" : navigator.language) : entries[key]||""; const heading=r===1&&c<7; const total=r===8&&c<7; const selected=r===3&&c===4; const spill=(r===0||r===12||r===13)&&c===0; return <div ref={selected?selectedRef:undefined} key={`${r}-${c}`} className={`${styles.cell} ${heading||total?styles.heading:""} ${c>=2&&c<=5?styles.currency:""} ${selected?styles.selected:""} ${spill?styles.spill:""}`}>{value}</div>})}</div>)}
      </div> : <div style={{padding:32,minWidth:620,color:"#222",background:"white",minHeight:420}}><h2>{tab}</h2><p>Fictional planning data. Edits remain in this browser session and drive the Forecast tab.</p>{tab === "Assumptions" ? <><label>Growth assumption (%)<br/><input aria-label="Growth assumption percentage" type="number" value={workbook.growth} onChange={e=>setWorkbook({...workbook,growth:Number(e.target.value)})}/></label><br/><br/><label>Baseline spend (NZD)<br/><input aria-label="Baseline spend" type="number" value={workbook.baseline} onChange={e=>setWorkbook({...workbook,baseline:Number(e.target.value)})}/></label></> : <><label>Planned headcount<br/><input aria-label="Planned headcount" type="number" min="0" value={workbook.headcount} onChange={e=>setWorkbook({...workbook,headcount:Number(e.target.value)})}/></label><br/><br/><label>Cost per additional hire (NZD)<br/><input aria-label="Cost per additional hire" type="number" value={workbook.costPerHire} onChange={e=>setWorkbook({...workbook,costPerHire:Number(e.target.value)})}/></label></>}<h3>Driven forecast: {formatCurrency(forecast.forecast, typeof navigator === "undefined" ? "en-NZ" : navigator.language)}</h3></div>}</div>
      <div className={styles.sheetbar}><span>＋</span><span>‹</span><span>›</span>{(["Forecast","Assumptions","Headcount"] as const).map(name=><button key={name} onClick={()=>setTab(name)} className={tab===name?styles.sheetTab:""} aria-pressed={tab===name}>{name}</button>)}</div>
      <div className={styles.status}><span>Ready</span><span className={styles.statusRight}>Accessibility: Good&nbsp;&nbsp;&nbsp; 100% ◉</span></div>
    </div>}
  </>;
}
