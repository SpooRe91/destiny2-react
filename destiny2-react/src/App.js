import '../src/css/styles.css';
import { Route, Routes } from "react-router-dom"

import { HomePage } from './Components/HomePage/HomePage';
import { NavBar } from './Components/NavBar/NavBar';
import { NewsPage } from './Components/NewsComponent/NewsPage';
import { ThemeSwitcher } from './Components/ThemeChanger/ThemeChanger';
import { useEffect } from 'react';
import { UsefulLinks } from './Components/UsefulLinks/UsefulLinks';
import { VideosComponent } from './Components/VideosComponent/VideosComponent';

function App() {

  useEffect(() => {
    document.body.style.backgroundImage = (sessionStorage.getItem('theme'));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ThemeSwitcher />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/bgs/news' element={<NewsPage />} />
        <Route path='/bgs/links' element={<UsefulLinks />} />
        <Route path='/bgs/videos' element={<VideosComponent />} />
      </Routes>
    </div>
  );
}

export default App;
