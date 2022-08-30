export const MusicComponent = () => {

    return (
        <div className="music-div">
            <label htmlFor="hardstyle">Listen to Hardstyle</label>

            <audio controls name="hardstyle">
                <source src="https://51.75.65.100:8000/fearfm" />
                Hardstyle radio is not available right now!
            </audio>
        </div>
    )
}