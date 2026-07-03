import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Module01 from './components/Module01';
import Module02 from './components/Module02';
import Module03 from './components/Module03';
import Module04 from './components/Module04';
import Templates from './components/Templates';
import Whitepaper from './components/Whitepaper';
import { ProgressProvider } from './context/ProgressContext';
import './index.css';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module-01" element={<Module01 />} />
          <Route path="/module-02" element={<Module02 />} />
          <Route path="/module-03" element={<Module03 />} />
          <Route path="/module-04" element={<Module04 />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
        </Routes>
      </Router>
    </ProgressProvider>
  );
}

export default App;
