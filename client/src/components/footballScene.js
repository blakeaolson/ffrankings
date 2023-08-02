import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Football from '../lib/Model.js';
import { Container } from '@chakra-ui/react';

export default function FootballScene() {
  return (
    <Container height="35vh">
      <Canvas>
        <PerspectiveCamera makeDefault fov={20} position={[-0.6, 0.6, 0.6]} />
        <Football></Football>
        <OrbitControls/>
        <ambientLight/>
        <pointLight position={[1, 5, 1]} intensity={3}/>
      </Canvas>
    </Container>
    
  )
}