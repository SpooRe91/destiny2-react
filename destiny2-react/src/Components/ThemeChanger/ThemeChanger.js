import { useEffect, useState } from "react";

import stlyes from './ThemeChanger.module.css';
import darkTheme from "../../backgrounds/destiny2oldbulgarianstyleBGsdark.png"
import lightTheme from "../../backgrounds/destiny2oldbulgarianstyleBGslight.jpg"
export const ThemeSwitcher = () => {

    const [currTheme, setCurrTheme] = useState(localStorage.getItem("mode")
        ? localStorage.getItem("mode")
        : "light");

    useEffect(() => {

        if (currTheme === 'dark') {

            sessionStorage.setItem('theme', `url(${darkTheme})`);
            localStorage.setItem('theme', `url(${darkTheme})`);
            sessionStorage.setItem('mode', 'dark');
            localStorage.setItem('mode', 'dark');
        } else {

            sessionStorage.setItem('theme', `url(${lightTheme})`);
            localStorage.setItem('theme', `url(${lightTheme})`);
            sessionStorage.setItem('mode', 'light');
            localStorage.setItem('mode', 'light');
        }

        document.body.style.backgroundImage = (localStorage.getItem('theme'));
    }, [currTheme])


    return (
        <>
            <button onClick={() => setCurrTheme((curr) => (curr === "light" ? "dark" : "light"))} className={stlyes['toggle-background']}
                style={currTheme === "light" ? { "color": "darkblue" } : { "color": 'antiquewhite' }} >
                {currTheme === "light" ? "To the Dark" : "To the Light"}
            </button>
        </>
    )
}