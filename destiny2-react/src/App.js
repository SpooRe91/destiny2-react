import '../src/css/styles.css';
import { Route, Routes } from "react-router-dom"

import { HomePage } from './Components/HomePage/HomePage';
import { NavBar } from './Components/NavBar/NavBar';
import { NewsPage } from './Components/NewsComponent/NewsPage';

function App() {

  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bungie/news' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
