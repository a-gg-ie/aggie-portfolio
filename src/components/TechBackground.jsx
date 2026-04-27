import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const TechMesh = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={1} // XYZ rotation intensity
      floatIntensity={2} // Up/down float intensity
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#8a2be2" 
          wireframe={true} 
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#050505"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

// Particles floating around
const Particles = ({ count = 500 }) => {
  const mesh = useRef();
  const dummy = new THREE.Object3D();
  
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

const TechBackground = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8a2be2" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <TechMesh />
        <Particles count={300} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default TechBackground;
