import React, { useEffect, useState } from "react";
import "../Row/row.css";
import axios from "../../../Utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        (async () => {
            try {
                console.log(fetchUrl);
                const request = await axios.get(fetchUrl);
                console.log(request);
                setMovies(request.data.results);
            } catch (error) {
                console.log("Error:", error);
            }
        })();
    }, [fetchUrl]);

//  Purpose: This code fetches a list of movies from the provided fetchUrl when  
//  the component loads or if fetchUrl changes.
// Visual Explanation:
// When the component loads, it runs an async function to get data.
// axios.get(fetchUrl) fetches movie data, and if successful:
// setMovies(request.data.results) stores the list of movies in the state.
// If there’s an error, it logs "Error" and the error details.
// This happens only once (when the component loads) or if the fetchUrl changes.


    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    console.log(url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(urlParams)
                    console.log(urlParams.get('v'))
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

//     Purpose: Plays or stops the trailer for the clicked movie.
// Visual Explanation:
// If trailerUrl already exists (meaning a trailer is playing), it stops the trailer by setting trailerUrl to an empty string.
// Otherwise:
// It tries to find the trailer URL for the clicked movie using movieTrailer.
// If successful, it extracts the video ID from the URL using URLSearchParams and sets this ID in trailerUrl (to start playing the trailer).
// If there’s an error, it logs the error to the console.

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
// Sets the YouTube player’s dimensions (height and width).
// Enables autoplay (video starts playing automatically when loaded).

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    />
                ))}
            </div>
            <div style={{ padding: "10px" }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
};

// Purpose: The component’s visual layout.
// Visual Explanation:
// <h1>{title}</h1>: Displays the title of the movie row.
// <div className="row_posters">: Holds all movie posters.
// Poster Images:
// Each movie has a clickable <img> displaying the movie poster.
// On click, handleClick runs to show or hide the trailer.
// Trailer Display:
// If trailerUrl exists, <YouTube videoId={trailerUrl} opts={opts} /> renders the embedded YouTube player, playing the movie trailer.
// This code fetches movies, displays them in a row of posters, and allows users to view a trailer on click.


export default Row;
