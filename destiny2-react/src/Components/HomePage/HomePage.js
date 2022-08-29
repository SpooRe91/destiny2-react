import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

import { NewsComponent } from "../NewsComponent/NewsComponent";

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
                    setIsLoading(state => false);
                } else {
                    setIsLoading(state => true);
                    throw new Error('Unable to fetch news, please try again later!')
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
                if (data?.ErrorCode !== 2101 && data?.Response?.detail !== null && data.Response?.detail !== undefined) {
                    setClanData(data.Response?.detail);
                } else {
                    throw new Error("Unable to fetch clan info, please try again later!");
                }
            })
            .catch(error => {
                alert(error);
            })
    }, [API_KEY]);

    const creation = new Date(clanData?.creationDate);

    console.log(clanData);
    return (
        <>
            <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto', 'background': '#000000ce', "padding": '10px', 'width': 'fit-content' }}>
                Welcome to the BGs Destiny 2 clan, website!
                <p style={{ 'fontSize': '14px' }}>
                    Created by: SpooRe
                </p>
            </h1>
            {
                <div className="homeContainer">
                    {isLoading
                        ?
                        <ClockLoader color="lightblue" size="50px" />
                        :
                        clanData
                        &&
                        <div>
                            <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto 15px', "padding": '10px', "textDecoration": "underline" }}>CLAN INFO</h1>
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
                            <p>Visit our clan in Bungie.net - <a href={'https://www.bungie.net/en/ClanV2?groupid=4131725'} style={{ 'color': 'coral', 'fontWeight': 'bold' }} target="_blank" rel="noreferrer">
                                HERE!
                            </a></p>

                        </div>
                    }
                </div>
            }
            {
                <>
                    <h1 style={{ 'fontSize': '25px', 'color': 'white', 'margin': 'auto 15px', 'background': '#000000ce', "padding": '10px' }}>NEWS</h1>
                    <div className="newsContainer">
                        {
                            <>
                                {isLoading
                                    ?
                                    <ClockLoader color="lightblue" size="50px" />
                                    :
                                    <>
                                        <button onClick={() => setToShowNews(state => !state)} className="newsButton"
                                            style={toShowNews ? { 'color': 'coral' } : { 'color': 'lightblue' }}>
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
            }
        </>
    )
}