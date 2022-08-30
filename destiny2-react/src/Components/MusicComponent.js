export const MusicComponent = () => {

    return (
        <div className="music-div">
            <label htmlFor="hardstyle">Listen to Hardstyle</label>

            <audio controls src="http://51.75.65.100:8000/fearfm" name="hardstyle">
                <source src="http://51.75.65.100:8000/fearfm" />
                Hardstyle radio is not available right now!
            </audio>
        </div>
    )
}