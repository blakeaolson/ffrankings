import { useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Football(){
  const meshRef = useRef(null);
  useFrame(() => {
    if (!meshRef.current){
      return;
    }
    meshRef.current.rotation.x -= 0.03;
  });

  const { scene } = useLoader(
    GLTFLoader,
    'nfl-football-compressed.glb'
  );
  return <primitive object={scene} ref={meshRef}/>;
}