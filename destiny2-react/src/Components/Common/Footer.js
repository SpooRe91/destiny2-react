import styles from "./Common.module.css"

export const Footer = () => {

    return (
        <footer className={styles["footer"]}>
            <p> Designed by <a href="https://github.com/SpooRe91" target={"_blank"} rel="noreferrer"
                className={styles["btn-footer-created-by"]}>Martin Bogdanov</a> © </p>

            <a href="https://www.bungie.net/en/ClanV2?groupid=4131725" className={styles["btn-footer"]}
                name="about" target={"_blank"} rel="noreferrer">Our clan</a>

            <a href="https://www.bungie.net/7/en/User/Profile/3/4611686018489889396?bgn=SpooRe"
                className={styles["btn-footer"]} name="contacts" target={"_blank"} rel="noreferrer">Contact us</a>
        </footer >
    )
}