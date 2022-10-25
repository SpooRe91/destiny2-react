import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import styles from "./Common.module.css"

//-------------------------------------------------------------------------------------------------
export const ScrollButton = () => {
    //-------------------------------------------------------------------------------------------------
    const [visible, setVisible] = useState(false)
    //-------------------------------------------------------------------------------------------------
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if (scrolled > 300) return setVisible(state => true);
        //else
        setVisible(state => false)
    };
    //-------------------------------------------------------------------------------------------------
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    };
    //-------------------------------------------------------------------------------------------------
    window.addEventListener('scroll', toggleVisible);
    //-------------------------------------------------------------------------------------------------
    return (
        <FaArrowCircleUp onClick={scrollToTop} className={styles["to-top"]}
            style={{ display: visible ? 'inline' : 'none' }} title="To top" />
    );
}