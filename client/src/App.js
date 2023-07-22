import { ChakraProvider, Container} from '@chakra-ui/react';
import { BrowserRouter as Router} from 'react-router-dom';
import theme from './lib/theme.js';
import NavBar from './components/navbar.js';
import Routes from './routes.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Football from './lib/Model.js';
import Footer from './components/footer.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar/>
        <Container height="35vh">
          <Canvas>
            <PerspectiveCamera makeDefault fov={20} position={[5, 5, 5]} />
            <Football></Football>
            <OrbitControls/>
            {/* <ambientLight/> */}
            <pointLight position={[10, 15, 10]}/>
          </Canvas>
        </Container>
        <Routes/>
      </Router>
      <Footer/>
    </ChakraProvider>
  );
}

export default App;
