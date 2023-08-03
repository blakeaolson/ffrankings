import { ChakraProvider, Container} from '@chakra-ui/react';
import { BrowserRouter as Router} from 'react-router-dom';
import theme from './lib/theme.js';
import NavBar from './components/navbar.js';
import Routes from './routes.js';
import FootballScene from './components/footballScene.js';
import Footer from './components/footer.js';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwg45gNkUYdKAfqgA6fMAI_mSrYkGolF0",
  authDomain: "ffrankings-frontend.firebaseapp.com",
  projectId: "ffrankings-frontend",
  storageBucket: "ffrankings-frontend.appspot.com",
  messagingSenderId: "1093569550445",
  appId: "1:1093569550445:web:9d004416651ae03c820764",
  measurementId: "G-D1GLD6P494"
};

function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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
