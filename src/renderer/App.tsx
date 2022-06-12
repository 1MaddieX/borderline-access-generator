import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Card from './Card';

const containerStyles = {
  width: '100vw',
  height: '40vh',
  margin: '1rem 2rem',
  overflow: 'hidden',
};

const Hello = () => {
  return (
    <div>
      <h1>account generator</h1>
      <div className="Hello" style={containerStyles}>
        <Card />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
