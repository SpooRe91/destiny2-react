import { ClockLoader } from "react-spinners";

import { useEffect, useState } from "react";
import { NewsComponent } from "../NewsComponent/NewsComponent";

import styles from "./NewsPage.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getNews } from "../../Services/requests";

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getNews(signal, controller)
      .then((news) => {
        if (news.Response?.categories[1].entries.results.length <= 0) {
          setIsLoading((state) => true);
          if (controller.signal.aborted) {
            return;
          }
          throw new Error("Unable to fetch news, please try again later!");
        }
        setNews(news.Response?.categories[1].entries.results);
        setIsLoading((state) => false);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <title>News</title>
      <h1>NEWS</h1>
      {isLoading ? (
        <div className={styles["clock-loader"]}>
          <ClockLoader color="lightblue" size="80px" />
        </div>
      ) : (
        <div className={styles["newsContainer"]}>
          {
            <>
              <Carousel
                className={styles["carousel-short"]}
                emulateTouch={true}
                useKeyboardArrows={true}
                autoFocus={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
              >
                {news?.map((el) => (
                  <NewsComponent key={el.identifier} data={el} />
                ))}
              </Carousel>
            </>
          }
        </div>
      )}
    </>
  );
};
