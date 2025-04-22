import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <svg className="animate-spin" width="36" height="36" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#888" strokeWidth="5" strokeDasharray="31.4 31.4" />
    </svg>
  </div>
);

// Smaller, simpler cube option for mobile devices
const MobileCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={meshRef} rotation={[0.6, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#fff"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <circleGeometry args={[1, 24]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  );
};

const SpinningCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={meshRef} rotation={[0.6, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#fff" // bright silver
          metalness={1}
          roughness={0.12} // a bit rougher for steel
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.01}
          envMapIntensity={3}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
        <circleGeometry args={[1.2, 32]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </group>
  );
};

const HeroSection: React.FC = () => {
  // Delay 3D scene mount for faster content paint
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay 3D scene mount - less delay on mobile for faster interaction
    const t = setTimeout(() => setShow3D(true), isMobile ? 200 : 400);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="relative w-full h-[100vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f2e9e1] to-[#e3e6e8] font-serif overflow-hidden">
      {/* Background image behind 3D Canvas */}
      <img
        src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1500&q=80"
        alt="Contrasting fashion background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-70 blur-sm"
        style={{ pointerEvents: 'none' }}
        loading="lazy"
      />
      {/* 3D Canvas above background image - hidden on very small screens */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {show3D ? (
          <Canvas 
            camera={{ position: [0, 0, isMobile ? 7 : 6], fov: isMobile ? 55 : 50 }} 
            shadows
            frameloop={isMobile ? "demand" : "always"} // Improve performance on mobile
            dpr={[1, isMobile ? 1.5 : 2]} // Lower resolution on mobile
          >
            {/* Key light for strong highlight - reduced lights on mobile */}
            <directionalLight position={[5, 8, 10]} intensity={2.2} castShadow={!isMobile} shadow-mapSize-width={isMobile ? 512 : 1024} shadow-mapSize-height={isMobile ? 512 : 1024} />
            
            {/* Fill light for softer shadows */}
            <directionalLight position={[-6, 2, 2]} intensity={0.7} color="#fff" />
            
            {/* Rim light removed on mobile to improve performance */}
            {!isMobile && <directionalLight position={[0, 8, -8]} intensity={0.8} color="#fff" />}
            
            {/* Ambient light for base illumination */}
            <ambientLight intensity={0.7} />
            
            {/* Point light removed on mobile to improve performance */}
            {!isMobile && <pointLight position={[0, 3, 6]} intensity={0.5} color="#ffffff" distance={10} decay={2} />}
            
            <Suspense fallback={<Spinner />}>
              {isMobile ? <MobileCube /> : <SpinningCube />}
            </Suspense>
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={isMobile ? 0.8 : 1.2}
            />
          </Canvas>
        ) : (
          <Spinner />
        )}
      </div>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl mx-auto"
        style={{ textShadow: '0 4px 32px rgba(0,0,0,0.45)' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold text-white mb-4 md:mb-6 drop-shadow-2xl tracking-tight leading-[1.1]"
        >
          Atelier Luxe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gray-100 mb-8 md:mb-12 max-w-2xl font-light font-sans px-2"
        >
          Timeless Fashion. Modern Craft. Your Signature Style.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.06, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
          whileTap={{ scale: 0.98 }}
          href="#about"
          className="px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full bg-white text-gray-900 text-lg sm:text-xl font-semibold shadow-lg hover:bg-gray-100 transition-colors duration:200 focus:outline-none focus:ring-2 focus:ring-gray-400 tracking-wide font-sans w-[80%] max-w-[300px] md:w-auto"
          aria-label="View Collection"
        >
          View Collection
        </motion.a>
        {/* Scroll cue - positioned closer to content on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 16, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
        >
          <svg width="28" height="28" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
