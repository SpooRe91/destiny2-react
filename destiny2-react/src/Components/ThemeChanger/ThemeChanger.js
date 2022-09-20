import { useEffect, useState } from "react";

import styles from './ThemeChanger.module.css';
import darkTheme from "../../backgrounds/destiny2oldbulgarianstyleBGsdark.png"
import lightTheme from "../../backgrounds/destiny2oldbulgarianstyleBGslight.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
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
            <div className={currTheme === "light" ? styles["slider-container-light"] : styles["slider-container-dark"]}>

                <button onClick={() => setCurrTheme((curr) => (curr === "light" ? "dark" : "light"))}
                    className={currTheme === "dark" ? styles['toggle-background-left'] : styles["toggle-background-right"]}
                >
                    {
                        currTheme === "light" ?
                            <>
                                {"To the dark"} <FontAwesomeIcon icon={faMoon} />
                            </>

                            :
                            <>
                                {"To the light"} <FontAwesomeIcon icon={faSun} />
                            </>
                    }
                </button>
            </div>
        </>
    )
}