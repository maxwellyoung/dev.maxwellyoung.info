"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  // Create gradient colors
  const colors = useMemo(() => {
    return {
      primary: new THREE.Color("#FF5A5F"),
      secondary: new THREE.Color("#3B82F6"),
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Subtle rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.rotation.y += 0.002;

    // Follow mouse slightly
    const targetX = (pointer.x * viewport.width) / 8;
    const targetY = (pointer.y * viewport.height) / 8;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.02
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={colors.primary}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
      <FloatingShape />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
