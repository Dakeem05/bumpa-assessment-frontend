import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Purchase from './pages/Purchase';
import Achievements from './pages/Achievements';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Purchase />} />
        <Route path="/achievements/:email" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
