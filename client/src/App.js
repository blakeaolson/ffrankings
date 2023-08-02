import { ChakraProvider, Container} from '@chakra-ui/react';
import { BrowserRouter as Router} from 'react-router-dom';
import theme from './lib/theme.js';
import NavBar from './components/navbar.js';
import Routes from './routes.js';
import FootballScene from './components/footballScene.js';
import Footer from './components/footer.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar/>
        <FootballScene/>
        <Routes/>
      </Router>
      <Footer/>
    </ChakraProvider>
  );
}

export default App;
