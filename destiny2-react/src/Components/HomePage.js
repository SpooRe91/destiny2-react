import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

export const HomePage = () => {

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clanData, setClanData] = useState(null);
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
                    setIsLoading(false);
                } else {
                    setIsLoading(true);
                    throw new Error('Unable to fetch news!')
                }
            }).catch(error => {
                alert(error);
            })

        fetch('https://www.bungie.net/Platform/GroupV2/4131725', {
            headers: {
                'content-type': 'application/json',
                "X-API-Key": API_KEY
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.ErrorCode !== 2101 && data.Response.detail !== null && data.Response.detail !== undefined) {
                    setClanData(data.Response.detail);
                } else {
                    throw new Error("Unable to fetch clan info!");
                }
            })
            .catch(error => {
                alert(error);
            })
    }, [API_KEY]);

    const creation = new Date(clanData?.creationDate);

    return (
        <div className="homeContainer">

            <>
                <h1>Welcome to the BGs clan Destiny 2 app! <p style={{ 'fontSize': '14px' }}>Created by: SpooRe</p></h1>
                {
                    isLoading
                        ? <ClockLoader color="lightblue" size="50px" />
                        :
                        clanData
                        &&
                        <div>
                            <div>
                                <h3>{clanData?.name}</h3>
                                <p>Since: {`${creation?.getDate()}/${creation?.getMonth() + 1}/${creation?.getFullYear()}`}</p>
                                <p>Our moto: </p>
                                <h4>{clanData?.motto}</h4>
                                <h4>Callsign: {clanData?.clanInfo.clanCallsign}</h4>
                                <div>
                                    <article>
                                        {clanData?.about}
                                    </article>
                                </div>
                            </div>
                            <button onClick={() => setToShowNews(state => !state)} className="newsButton"
                                style={toShowNews ? { 'color': 'coral' } : { 'color': 'lightblue' }}>
                                {toShowNews ? 'Hide news' : 'Show Bungie.net news'}
                            </button>
                        </div>
                }
                {
                    <>
                        {
                            toShowNews
                            &&
                            <>
                                <h1>NEWS</h1>
                                {news.map(el =>
                                    <article key={el.identifier} className="newsContainer">
                                        <a href={`https://www.bungie.net/${el.link}`} target="_blank" rel="noreferrer"><h3>{el.displayName}</h3>
                                            <img src={`https://www.bungie.net/${el.image}`} alt="#" />
                                        </a>
                                    </article>)}
                            </>
                        }
                    </>
                }
            </>
        </div>
    )
}