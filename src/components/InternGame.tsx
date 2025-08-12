"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { resumeData } from "@/lib/resumeData";
import { projects as allProjects } from "@/lib/projectsData";

type InternGameProps = {
  maxDPR?: number;
  accentColor?: string;
  wordColor?: string;
  lineColor?: string;
  brakhage?: boolean;
};

type Item = {
  label: string;
  href?: string;
  weight?: number;
};

/**
 * InternGame — orthographic Three.js "constellation physics" of your intern info.
 * - Nodes: contact links, selected projects, top skills.
 * - Interaction: pointer attracts nodes; click node opens href.
 * - Perf: DPR cap, throttled buffers, pause when hidden, reduced-motion static.
 */
export default function InternGame({
  maxDPR = 1.5,
  accentColor = "#2B6BFF",
  wordColor = "#EAEAEA",
  lineColor = "rgba(234,234,234,0.22)",
  brakhage = true,
}: InternGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Build dataset
    const contacts: Item[] = [
      { label: "email", href: `mailto:${resumeData.contact.email}` },
      { label: "website", href: resumeData.contact.website },
      { label: "github", href: resumeData.contact.github },
      { label: "linkedin", href: resumeData.contact.linkedin },
      { label: "download cv", href: "/MaxwellYoung_CV.pdf" },
    ];
    const skills: Item[] = (resumeData.skills?.flatMap((s) => s.items) || [])
      .slice(0, 8)
      .map((s) => ({ label: s }));
    const projects: Item[] = allProjects
      .filter((p) => !!p.link)
      .slice(0, 6)
      .map((p) => ({ label: p.name, href: p.link }));
    const center: Item = {
      label: `${resumeData.name} — internship availability (Nov–Feb)`,
    };

    const items: Item[] = [center, ...contacts, ...projects, ...skills];

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const makeCamera = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const cam = new THREE.OrthographicCamera(
        -w / 2,
        w / 2,
        h / 2,
        -h / 2,
        -1000,
        1000
      );
      cam.position.set(0, 0, 10);
      cam.lookAt(0, 0, 0);
      return cam;
    };
    const camera = makeCamera();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(
      Math.min(maxDPR, Math.max(1, window.devicePixelRatio || 1))
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearAlpha(0);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Overlay (subtle Brakhage)
    const overlay = document.createElement("canvas");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.pointerEvents = "none";
    overlayCanvasRef.current = overlay;
    const octx = overlay.getContext("2d");
    overlayCtxRef.current = octx;
    container.appendChild(overlay);
    const dpr = Math.min(maxDPR, Math.max(1, window.devicePixelRatio || 1));
    const resizeOverlay = () => {
      if (!overlayCtxRef.current || !overlayCanvasRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      overlay.width = Math.floor(w * dpr);
      overlay.height = Math.floor(h * dpr);
      overlay.style.width = `${w}px`;
      overlay.style.height = `${h}px`;
      overlayCtxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeOverlay();

    // Helpers
    const makeLabelTexture = (text: string, highlight = false) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const padX = 20;
      const padY = 12;
      ctx.font = `${
        highlight ? 700 : 600
      } 14px Inter, Space Grotesk, system-ui, -apple-system`;
      const w = Math.ceil(ctx.measureText(text).width) + padX * 2;
      const h = 34 + (highlight ? 4 : 0);
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.scale(2, 2);
      ctx.font = `${
        highlight ? 700 : 600
      } 14px Inter, Space Grotesk, system-ui, -apple-system`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = highlight ? accentColor : wordColor;
      ctx.fillText(text, padX, h / 2);
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    };

    // Nodes
    type Node = {
      sprite: THREE.Sprite;
      pos: THREE.Vector2;
      vel: THREE.Vector2;
      href?: string;
      mass: number;
    };
    const nodes: Node[] = [];

    const areaW = container.clientWidth;
    const areaH = container.clientHeight;
    items.forEach((it, i) => {
      const isCenter = i === 0;
      const tex = makeLabelTexture(it.label, isCenter || !!it.href);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(mat);
      const x = isCenter ? 0 : (Math.random() - 0.5) * areaW * 0.8;
      const y = isCenter ? 0 : (Math.random() - 0.5) * areaH * 0.8;
      const scaleY = isCenter ? 28 : 22;
      const scaleX = (tex.image?.width ? tex.image.width / 2 : 160) / 4;
      sprite.scale.set(scaleX, scaleY, 1);
      sprite.position.set(x, y, 0);
      scene.add(sprite);
      nodes.push({
        sprite,
        pos: new THREE.Vector2(x, y),
        vel: new THREE.Vector2(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40
        ),
        href: it.href,
        mass: isCenter ? 4 : 1,
      });
    });

    // Lines between center and others
    const linePositions = new Float32Array((nodes.length - 1) * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor as unknown as THREE.ColorRepresentation),
      transparent: true,
      opacity: 0.35,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Pointer + click
    const target = new THREE.Vector2(0, 0);
    const rect = () => container.getBoundingClientRect();
    const toWorld = (cx: number, cy: number) => {
      const r = rect();
      return new THREE.Vector2(
        cx - r.left - r.width / 2,
        r.height / 2 - (cy - r.top)
      );
    };
    const onPointerMove = (e: PointerEvent) => {
      const p = toWorld(e.clientX, e.clientY);
      target.copy(p);
    };
    const onPointerDown = (e: PointerEvent) => {
      const p = toWorld(e.clientX, e.clientY);
      let best: { n: Node; d2: number } | null = null;
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const d2 = n.pos.distanceToSquared(p);
        if (!best || d2 < best.d2) best = { n, d2 };
      }
      if (best && best.d2 < 42 * 42 && best.n.href) {
        window.open(best.n.href, "_blank");
      }
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);

    // Animation
    let rafId = 0;
    let isHidden = document.visibilityState === "hidden";
    const onVisibility = () =>
      (isHidden = document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    const clock = new THREE.Clock();
    let lastLineUpdate = performance.now();

    const animate = () => {
      const dt = Math.min(0.032, clock.getDelta());

      if (!prefersReduced && !isHidden) {
        // simple physics: attraction to center + mild pointer pull + damping
        const centerPos = nodes[0].pos;
        for (let i = 1; i < nodes.length; i++) {
          const n = nodes[i];
          const toCenter = centerPos.clone().sub(n.pos).multiplyScalar(0.0025);
          const toPointer = target.clone().sub(n.pos).multiplyScalar(0.0018);
          n.vel.addScaledVector(toCenter.add(toPointer), dt * 600);
          // damping
          n.vel.multiplyScalar(0.96);
          // clamp
          const sp = n.vel.length();
          const maxSp = 260;
          if (sp > maxSp) n.vel.multiplyScalar(maxSp / sp);
          n.pos.addScaledVector(n.vel, dt);
          n.sprite.position.set(n.pos.x, n.pos.y, 0);
        }
      }

      // Lines to center (throttled)
      const now = performance.now();
      if (now - lastLineUpdate > 50) {
        let ptr = 0;
        for (let i = 1; i < nodes.length; i++) {
          const a = nodes[0].sprite.position;
          const b = nodes[i].sprite.position;
          linePositions[ptr++] = a.x;
          linePositions[ptr++] = a.y;
          linePositions[ptr++] = 0;
          linePositions[ptr++] = b.x;
          linePositions[ptr++] = b.y;
          linePositions[ptr++] = 0;
        }
        (
          lines.geometry.attributes.position as THREE.BufferAttribute
        ).needsUpdate = true;
        lastLineUpdate = now;
      }

      renderer.render(scene, camera);

      // Subtle overlay
      if (brakhage && overlayCtxRef.current && overlayCanvasRef.current) {
        const ctx = overlayCtxRef.current;
        const w = overlayCanvasRef.current.width / dpr;
        const h = overlayCanvasRef.current.height / dpr;
        ctx.clearRect(0, 0, w, h);
        // dim vignette and faint leak
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grad = ctx.createRadialGradient(
          Math.random() > 0.5 ? 0 : w,
          Math.random() > 0.5 ? 0 : h,
          0,
          Math.random() > 0.5 ? 0 : w,
          Math.random() > 0.5 ? 0 : h,
          Math.max(w, h) * 0.6
        );
        grad.addColorStop(0, "rgba(255,225,200,0.06)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad as unknown as string;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      rendererRef.current.setSize(
        container.clientWidth,
        container.clientHeight
      );
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.left = -w / 2;
      cameraRef.current.right = w / 2;
      cameraRef.current.top = h / 2;
      cameraRef.current.bottom = -h / 2;
      cameraRef.current.updateProjectionMatrix();
      resizeOverlay();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      if (overlayCanvasRef.current?.parentElement === container) {
        container.removeChild(overlayCanvasRef.current);
      }
    };
  }, [accentColor, brakhage, lineColor, maxDPR, wordColor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-label="Intern Game"
    />
  );
}
