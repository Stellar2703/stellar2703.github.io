"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PointSphere() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.18;
      pointsRef.current.rotation.x = time * 0.09;
    }
  });

  const count = 600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const palette = [
    new THREE.Color("#6366f1"), // Indigo
    new THREE.Color("#a855f7"), // Purple
    new THREE.Color("#ec4899"), // Pink
    new THREE.Color("#3b82f6"), // Blue
    new THREE.Color("#10b981"), // Emerald
    new THREE.Color("#f59e0b"), // Amber accent
  ];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 1.5 + Math.random() * 0.6;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const c = palette[i % palette.length];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
      />
    </points>
  );
}

export function ThreeCanvas() {
  return (
    <div className="w-full h-full relative flex items-center justify-center select-none pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <PointSphere />
      </Canvas>
    </div>
  );
}
