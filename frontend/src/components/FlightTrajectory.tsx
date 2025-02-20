import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface TrajectoryProps {
  trajectory: [number, number, number][];
}

const TrajectoryLine: React.FC<TrajectoryProps> = ({ trajectory }) => {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return trajectory.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  }, [trajectory]);

  return <Line points={points} color='blue' lineWidth={2} />;
};

const FlightTrajectory: React.FC<TrajectoryProps> = ({ trajectory }) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      {/* <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} /> */}
      <TrajectoryLine trajectory={trajectory} />
      <OrbitControls />
    </Canvas>
  );
};

export default FlightTrajectory;
