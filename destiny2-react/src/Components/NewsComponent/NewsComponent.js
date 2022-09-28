import styles from "./NewsPage.module.css";


export const NewsComponent = ({ data }) => {
    return (
        <div className={styles["news-element"]}>
            <section key={data.identifier}>
                <a href={`https://www.bungie.net${data.link}`} target="_blank" rel="noreferrer" className={styles["title-anchor"]}>
                    <h3>{data.displayName}</h3>
                </a>
                <a href={`https://www.bungie.net${data.link}`} target="_blank" rel="noreferrer" className={styles["image-anchor"]}>
                    <img src={`https://www.bungie.net${data.image}`} alt="#" />
                </a>
            </section>
        </div>
    )

}