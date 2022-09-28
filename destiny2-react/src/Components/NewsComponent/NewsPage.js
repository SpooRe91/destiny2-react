import { ClockLoader } from "react-spinners";

import { useEffect, useState } from "react";
import { NewsComponent } from "../NewsComponent/NewsComponent";

import styles from "./NewsPage.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const NewsPage = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [toShowNews, setToShowNews] = useState(false);

    const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;

    useEffect(() => {
        fetch('https://www.bungie.net/Platform/Trending/Categories/', {
            headers: {
                'content-type': 'application/json',
                "X-API-Key": API_KEY
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Response?.categories[1].entries.results.length > 0) {
                    setNews(data.Response?.categories[1].entries.results);
                    setIsLoading(state => false);
                } else {
                    setIsLoading(state => true);
                    throw new Error('Unable to fetch news, please try again later!')
                }
            }).catch(error => {
                alert(error);
            });

    }, [news.length, API_KEY]);

    return (
        <>
            <title>News</title>
            <h1>NEWS</h1>
            {isLoading
                ?
                <div className={styles["clock-loader"]}>
                    <ClockLoader color="lightblue" size="80px" />
                </div>
                :
                <div className={styles["newsContainer"]}>
                    {
                        <>
                            {/* <button onClick={() => setToShowNews(state => !state)} className={styles["news-button"]}
                                    style={toShowNews ? { 'color': 'coral' } : { 'color': 'whitesmoke' }}>
                                    {toShowNews ? 'Show latest news' : 'Show ALL Bungie.net news'}
                                </button> */}
                            <Carousel className={styles["carousel-short"]} emulateTouch={true}
                                useKeyboardArrows={true} autoFocus={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>
                                {
                                    news?.map(el => <NewsComponent key={el.identifier} data={el} />)
                                }
                            </Carousel>
                        </>
                    }
                </div>
            }
        </>
    )
}