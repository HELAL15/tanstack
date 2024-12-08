import { Route, Routes } from 'react-router';
import Home from './Home';
import About from './About';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
