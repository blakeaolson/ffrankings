import { useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Football(){
  const meshRef = useRef(null);
  useFrame(() => {
    if (!meshRef.current){
      return;
    }
    meshRef.current.rotation.x -= 0.03;
  });

  const texture = useLoader(TextureLoader, 'compressed-texture.jpg'); 
  const football = useLoader(
    FBXLoader,
    'nfl-football-centered.fbx'
  );

  football.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
    }
  });


  return <primitive object={football} ref={meshRef}/>;
}