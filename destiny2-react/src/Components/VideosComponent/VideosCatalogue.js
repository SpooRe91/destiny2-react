import styles from "./VideoComponent.module.css"
import { ScrollButton } from "../Common/ScrollButton";
import { Link } from "react-router-dom";

export const VideosCatalogue = () => {

    return (
        <>
            <title>Videos</title>
            <div className={styles["all-buttons-container"]}></div>
            <Link to='/bgs/videos/v=OiiNBQ7hev8&list=PLh8Yxx5KxoxmkdHBUOnpSmG5-IISGM_OB&index=1&ab_channel=M.B.'
                className={styles["video-button"]}>
                SpooRe's playlist
            </Link>
            <Link to='/bgs/videos/v=D9s_X176gRs&list=PLh8Yxx5KxoxmZT9FZY1oTzUS6sJjd57Pz&index=1&ab_channel=M.B.'
                className={styles["video-button"]}>
                Raid guides
            </Link>
            <Link to='/bgs/videos/v=hv28twBiXfY&list=PLeZb0pbAM8v1aRR3ZvPGR-w0zJe6l6g6_&ab_channel=PetkoPetkov'
                className={styles["video-button"]}>
                PecTheSpec's playlist
            </Link>
            <ScrollButton />
        </>
    )

}