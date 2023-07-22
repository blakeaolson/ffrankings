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
    meshRef.current.rotation.z -= 0.03;
  });

  const { scene } = useLoader(
    GLTFLoader,
    'football.glb'
  );
  return <primitive object={scene} ref={meshRef}/>;
}