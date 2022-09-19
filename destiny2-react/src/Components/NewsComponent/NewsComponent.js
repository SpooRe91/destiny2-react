import styles from "./NewsPage.module.css"

export const NewsComponent = ({ data }) => {
    return (
        <div className={styles["news-element"]}>
            <article key={data.identifier}>
                <a href={`https://www.bungie.net${data.link}`} target="_blank" rel="noreferrer"><h3>{data.displayName}</h3>
                    <img src={`https://www.bungie.net${data.image}`} alt="#" />
                </a>
            </article>
        </div>
    )

}