
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'Python', position: [2, 0, 0], color: '#3776ab' },
  { name: 'TensorFlow', position: [-2, 0, 0], color: '#ff6f00' },
  { name: 'PyTorch', position: [0, 2, 0], color: '#ee4c2c' },
  { name: 'SQL', position: [0, -2, 0], color: '#336791' },
  { name: 'AWS', position: [1.5, 1.5, 0], color: '#ff9900' },
  { name: 'Docker', position: [-1.5, 1.5, 0], color: '#2496ed' },
  { name: 'Jupyter', position: [1.5, -1.5, 0], color: '#f37626' },
  { name: 'Pandas', position: [-1.5, -1.5, 0], color: '#150458' },
];

const SkillOrb = ({ skill, index }: { skill: any; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = skill.position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={skill.position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={0.8}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
};

const SkillsSphere = () => {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {skills.map((skill, index) => (
          <SkillOrb key={skill.name} skill={skill} index={index} />
        ))}
      </Canvas>
    </div>
  );
};

export default SkillsSphere;
