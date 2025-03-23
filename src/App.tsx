import './App.css';
import EmailManager from './component/EmailManager';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<EmailManager />} />
    </Routes>
  </Router>
  );
}

export default App;
