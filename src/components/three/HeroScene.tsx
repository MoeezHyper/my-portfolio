"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import {
  blobFragment,
  blobVertex,
  particleFragment,
  particleVertex,
} from "./shaders";

const damp = THREE.MathUtils.damp;

/** Small seeded PRNG so the particle field is deterministic (and pure). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Blob({ active }: { active: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const hover = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDensity: { value: 1.15 },
      uStrength: { value: 0.24 },
      uHover: { value: 0 },
      uColorA: { value: new THREE.Color("#8b7bff") },
      uColorB: { value: new THREE.Color("#45e3ff") },
      uColorC: { value: new THREE.Color("#ff7ab8") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!mesh.current || !mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += delta;
    u.uHover.value = damp(u.uHover.value, hover.current, 3, delta);
    const { x, y } = state.pointer;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x = damp(mesh.current.rotation.x, -y * 0.35, 2.5, delta);
    mesh.current.rotation.z = damp(mesh.current.rotation.z, x * 0.2, 2.5, delta);
    const s = damp(mesh.current.scale.x, active ? 1 : 0.001, 2.2, delta);
    mesh.current.scale.setScalar(s);
  });

  return (
    <mesh
      ref={mesh}
      scale={0.001}
      onPointerOver={() => (hover.current = 1)}
      onPointerOut={() => (hover.current = 0)}
    >
      <icosahedronGeometry args={[1.3, 48]} />
      <shaderMaterial
        ref={mat}
        vertexShader={blobVertex}
        fragmentShader={blobFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Shell({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.05;
    ref.current.rotation.x += delta * 0.03;
    const s = damp(ref.current.scale.x, active ? 1 : 0.6, 1.6, delta);
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[2.15, 1]} />
        <meshBasicMaterial color="#8b7bff" wireframe transparent opacity={0.09} />
      </mesh>
    </group>
  );
}

function Rings({ active }: { active: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const dotA = useRef<THREE.Mesh>(null);
  const dotB = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (a.current) a.current.rotation.z += delta * 0.15;
    if (b.current) b.current.rotation.z -= delta * 0.1;
    if (dotA.current) dotA.current.position.set(Math.cos(t * 0.6) * 2.5, Math.sin(t * 0.6) * 2.5, 0);
    if (dotB.current) dotB.current.position.set(Math.cos(-t * 0.45 + 2) * 2.9, Math.sin(-t * 0.45 + 2) * 2.9, 0);
    if (group.current) {
      const s = damp(group.current.scale.x, active ? 1 : 0.4, 1.4, delta);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <group rotation={[1.15, 0.25, 0]}>
        <mesh ref={a}>
          <torusGeometry args={[2.5, 0.004, 8, 200]} />
          <meshBasicMaterial color="#45e3ff" transparent opacity={0.35} />
        </mesh>
        <mesh ref={dotA}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#45e3ff" />
        </mesh>
      </group>
      <group rotation={[1.4, -0.5, 0.4]}>
        <mesh ref={b}>
          <torusGeometry args={[2.9, 0.003, 8, 200]} />
          <meshBasicMaterial color="#8b7bff" transparent opacity={0.25} />
        </mesh>
        <mesh ref={dotB}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#ff7ab8" />
        </mesh>
      </group>
    </group>
  );
}

function Particles({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const { positions, scales } = useMemo(() => {
    const rand = mulberry32(7);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // spherical shell distribution with some depth spread
      const r = 3.2 + rand() * 9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
      scales[i] = 0.3 + rand();
    }
    return { positions, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 70 },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color("#b9b0ff") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta;
      mat.current.uniforms.uPixelRatio.value = dpr;
    }
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x = damp(ref.current.rotation.x, state.pointer.y * 0.05, 1.5, delta);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Positions the hero object responsively and reacts to scroll + pointer. */
function Stage({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);
  const pixelWidth = useThree((s) => s.size.width);
  // Match the CSS lg breakpoint: side-by-side layout only when text has its own column.
  const wide = pixelWidth >= 1024 && viewport.aspect > 1.15;
  // Small landscape screens (e.g. phones sideways): tuck the object top-right, away from the name.
  const smallLandscape = !wide && viewport.aspect > 1;
  const baseX = wide ? Math.min(viewport.width * 0.24, 3.2) : smallLandscape ? viewport.width * 0.3 : 0;
  const baseY = wide ? 0 : smallLandscape ? viewport.height * 0.2 : 1.15;
  const baseScale = wide ? 1 : smallLandscape ? 0.62 : Math.min(viewport.width / 4.4, 0.9);

  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = Math.min(window.scrollY / window.innerHeight, 1.2);
    const g = group.current;
    g.position.x = damp(g.position.x, baseX + state.pointer.x * 0.25, 2, delta);
    g.position.y = damp(g.position.y, baseY + state.pointer.y * 0.2 + progress * 1.6, 3, delta);
    g.rotation.y = damp(g.rotation.y, progress * 1.4, 3, delta);
    const s = baseScale * (1 - progress * 0.25);
    g.scale.setScalar(damp(g.scale.x, s, 3, delta));

    // subtle camera parallax
    state.camera.position.x = damp(state.camera.position.x, state.pointer.x * 0.35, 1.5, delta);
    state.camera.position.y = damp(state.camera.position.y, state.pointer.y * 0.25, 1.5, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} position={[baseX, baseY, 0]} scale={baseScale}>
      <Blob active={active} />
      <Shell active={active} />
      <Rings active={active} />
    </group>
  );
}

export default function HeroScene({
  active,
  paused,
  eventSource,
}: {
  active: boolean;
  paused: boolean;
  eventSource: RefObject<HTMLElement | null>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={paused ? "never" : "always"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
    >
      <Particles />
      <Stage active={active} />
    </Canvas>
  );
}
