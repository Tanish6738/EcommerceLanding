import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple Cube for mobile
const MobileCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={meshRef} rotation={[0.6, 0.6, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#fff"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
};

// Higher quality cube for desktop
const DesktopCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={meshRef} rotation={[0.6, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#fff"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
        <planeGeometry args={[3, 3]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </group>
  );
};

interface ThreeSceneProps {
  isMobile: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ isMobile }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, isMobile ? 7 : 6], fov: isMobile ? 55 : 50 }} 
      shadows={!isMobile}
      frameloop={isMobile ? "demand" : "always"}
      dpr={[1, isMobile ? 1 : 1.5]}
      performance={{ min: 0.5 }}
      gl={{ 
        antialias: !isMobile,
        powerPreference: "high-performance", 
        alpha: true,
      }}
    >
      {/* Single key light for mobile, more lights for desktop */}
      <directionalLight position={[5, 8, 10]} intensity={2} castShadow={!isMobile} />
      
      {/* Basic ambient light */}
      <ambientLight intensity={0.7} />
      
      {/* Only add fill light on desktop */}
      {!isMobile && <directionalLight position={[-6, 2, 2]} intensity={0.5} color="#fff" />}
      
      {/* Choose appropriate cube based on device */}
      {isMobile ? <MobileCube /> : <DesktopCube />}
      
      {/* Optimized controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={isMobile ? 0.5 : 1}
        enableDamping={!isMobile}
        dampingFactor={0.1}
      />
    </Canvas>
  );
};

export default ThreeScene;