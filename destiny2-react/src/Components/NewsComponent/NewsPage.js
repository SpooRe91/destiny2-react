import { ClockLoader } from "react-spinners";

import { useEffect, useState } from "react";
import { NewsComponent } from "../NewsComponent/NewsComponent";
export const NewsPage = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toShowNews, setToShowNews] = useState(false);

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

    }, [news.length]);

    return (
        <>
        <title>News</title>
            <div className="newsContainer">
                {
                    <>
                        <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto 15px', 'background': '#000000ce', "padding": '10px' }}>NEWS</h1>
                        {isLoading
                            ?
                            <ClockLoader color="lightblue" size="50px" />
                            :
                            <>
                                <button onClick={() => setToShowNews(state => !state)} className="newsButton"
                                    style={toShowNews ? { 'color': 'coral' } : { 'color': 'whitesmoke' }}>
                                    {toShowNews ? 'Show latest news' : 'Show ALL Bungie.net news'}
                                </button>

                                {!toShowNews
                                    ?
                                    news?.slice(0, 4).map(el => <NewsComponent key={el.identifier} data={el} />)
                                    :
                                    news?.map(el => <NewsComponent key={el.identifier} data={el} />)}
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}