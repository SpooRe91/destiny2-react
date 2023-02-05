import '../src/css/styles.css';
import { Route, Routes } from "react-router-dom"

import { HomePage } from './Components/HomePage/HomePage';
import { NavBar } from './Components/NavBar/NavBar';
import { NewsPage } from './Components/NewsComponent/NewsPage';
import { ThemeSwitcher } from './Components/ThemeChanger/ThemeChanger';
import { useEffect } from 'react';
import { UsefulLinks } from './Components/UsefulLinks/UsefulLinks';
import { VideosCatalogue } from './Components/VideosComponent/VideosCatalogue';
import { VideoComponent } from './Components/VideosComponent/VideoComponent';
import { useState } from 'react';
import { ClanMemberDetails } from './Components/Details/ClanMemberDetails';
import { Footer } from './Components/Common/Footer';
import { PhotosComponent } from './Components/PhotosCopmonent/PhotosComponent';


function App() {

  useEffect(() => {
    document.querySelector('html').style.backgroundImage = (sessionStorage.getItem('theme'));
  }, []);

  const [videoName, setVideoName] = useState('');
  const [clanMembers, setClanMembers] = useState(null);

  return (
    <div className="App">
      <NavBar />
      <ThemeSwitcher />
      <Routes>
        <Route path='/' element={<HomePage clanMembers={clanMembers} setClanMembers={setClanMembers} />} />
        <Route path='/bgs/news' element={<NewsPage />} />
        <Route path='/bgs/links' element={<UsefulLinks />} />
        <Route path='/bgs/photos' element={<PhotosComponent />} />
        <Route path='/bgs/videos' element={<VideosCatalogue setVideoName={setVideoName} />} />
        <Route path='/bgs/videos/:id' element={<VideoComponent videoName={videoName} />} />
        <Route path='/bgs/details/:id' element={<ClanMemberDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
