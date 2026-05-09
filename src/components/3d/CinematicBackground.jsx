import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Environment } from '@react-three/drei';

const Scene = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      const scrollY = window.scrollY || 0;
      groupRef.current.rotation.y = scrollY * 0.0005;
      // Clamping or limiting Z movement so objects stay in front of camera
      groupRef.current.position.z = Math.min(scrollY * 0.002, 5); 
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#00ffff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} speed={1} />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[-3, 2, -5]} scale={1.5}>
            <MeshDistortMaterial color="#000000" emissive="#00ffff" emissiveIntensity={0.2} distort={0.4} speed={2} roughness={0} metalness={1} />
          </Sphere>
        </Float>
        
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]} position={[4, -1, -8]} scale={2}>
            <MeshDistortMaterial color="#000000" emissive="#ff00ff" emissiveIntensity={0.15} distort={0.3} speed={1.5} roughness={0.1} metalness={0.8} />
          </Sphere>
        </Float>
      </group>

      <Environment preset="city" />
    </>
  );
};

const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default CinematicBackground;
