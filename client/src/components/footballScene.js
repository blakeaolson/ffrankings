import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Football from '../lib/Model.js';
import { Container } from '@chakra-ui/react';

export default function FootballScene() {
  return (
    <Container height="35vh">
      <Canvas>
        <PerspectiveCamera makeDefault fov={35} position={[-30, 30, 30]} />
        <Football></Football>
        <OrbitControls/>
        <ambientLight intensity={0.2}/>
      </Canvas>
    </Container>
    
  )
}