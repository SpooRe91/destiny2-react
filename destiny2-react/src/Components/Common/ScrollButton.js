import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

//-------------------------------------------------------------------------------------------------
export const ScrollButton = () => {
    //-------------------------------------------------------------------------------------------------
    const [visible, setVisible] = useState(false)
    //-------------------------------------------------------------------------------------------------
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(state => true)
        }
        else if (scrolled <= 300) {
            setVisible(state => false)
        }
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
        <FaArrowCircleUp onClick={scrollToTop} className={"to-top"}
            style={{ display: visible ? 'inline' : 'none' }} title="To top" />
    );
}