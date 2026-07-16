"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticleField } from "./ParticleField";

export function Scene({ dense = true }: { dense?: boolean }) {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <fog attach="fog" args={["#0b1210", 4, 10]} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <ParticleField
          count={dense ? 850 : 380}
          color="#d6a45a"
          size={0.05}
          spread={4.2}
          speed={0.032}
        />
        <ParticleField
          count={dense ? 480 : 220}
          color="#7c9b7e"
          size={0.035}
          spread={3.1}
          speed={-0.022}
        />
      </Suspense>
    </Canvas>
  );
}
