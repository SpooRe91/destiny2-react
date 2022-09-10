import { useState } from "react";
import { ScrollButton } from "../Common/ScrollButton";

import styles from "./UsefulLinks.module.css";

export const UsefulLinks = () => {

    const [toShowLinks, setToShowLinks] = useState(false);

    return (
        <>
            <div className={styles["link-container"]}>

                <iframe src="https://raid.report/" frameborder="1" title="trials-report" style={{ "width": "1200px", "height": "850px", "overflow": "auto" }}>
                    Raid report
                </iframe>
                <iframe src="https://dungeon.report/" frameborder="1" title="braytech" style={{ "width": "1200px", "height": "850px", "overflow": "auto" }}>
                    Dungeon report
                </iframe>
                <iframe src="https://trials.report/" frameborder="1" title="trials-report" style={{ "width": "1200px", "height": "850px", "overflow": "auto" }}>
                    Trials report
                </iframe>
                <iframe src="https://bray.tech/" frameborder="1" title="braytech" style={{ "width": "1200px", "height": "850px", "overflow": "auto" }}>
                    Braytech
                </iframe>
            </div>
            <button className={styles["showLinks"]}
                onClick={() => [setToShowLinks(state => !state)]}
                style={toShowLinks ? { 'color': 'coral' } : { 'color': 'lightblue' }}
            >
                {!toShowLinks ? "Show more links" : "Show less links"}
            </button>
            {
                toShowLinks &&
                <div className={styles["more-links"]}>
                    <a href="https://app.destinyitemmanager.com/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Destiny item manager
                    </a>
                    <a href="https://destinytracker.com/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Destiny tracker
                    </a>
                    <a href="https://alpha.guardian.theater/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Alpha guardian theater
                    </a>
                    <a href="https://whereisxur.com/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Where is Xur
                    </a>
                    <a href="https://www.light.gg/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Light GG
                    </a>
                    <a href="https://www.blueberries.gg/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        blueberries
                    </a>
                    <a href="https://grandmaster.report/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Grandmaster report
                    </a>
                    <a href="https://d2armorpicker.com/#/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        D2 Armor picker
                    </a>
                    <a href="https://docs.google.com/spreadsheets/d/1mItOsJnE9n3Duu5xs6nRontkcookxJ2uQyPb-rwoFDk/edit#gid=0" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Useful game info
                    </a>
                    <a href="https://www.todayindestiny.com/" target="_blank" rel="noreferrer"
                        className={styles["other-link"]}>
                        Today in Destiny
                    </a>
                </div>
            }
            <ScrollButton />
        </>
    )
}