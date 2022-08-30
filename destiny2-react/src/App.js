import '../src/css/styles.css';
import { Route, Routes } from "react-router-dom"

import { HomePage } from './Components/HomePage/HomePage';
import { NavBar } from './Components/NavBar/NavBar';
import { NewsPage } from './Components/NewsComponent/NewsPage';
import { MusicComponent } from './Components/MusicComponent';
function App() {

  return (
    <div className="App">
      <NavBar />
      <MusicComponent />
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/bungie/news' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
