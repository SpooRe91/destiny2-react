import '../src/css/styles.css';
import { Route, Routes } from "react-router-dom"

import { HomePage } from './Components/HomePage/HomePage';
import { NavBar } from './Components/NavBar/NavBar';
import { NewsPage } from './Components/NewsComponent/NewsPage';
import { ThemeSwitcher } from './Components/ThemeChanger/ThemeChanger';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.body.style.backgroundImage = (sessionStorage.getItem('theme'));
  }, [])


  return (
    <div className="App">
      <NavBar />
      <ThemeSwitcher />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bungie/news' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
