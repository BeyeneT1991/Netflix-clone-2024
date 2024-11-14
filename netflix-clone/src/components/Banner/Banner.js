import React, { useState, useEffect } from 'react';
import axios from "../../Utils/axios";
import requests from '../../Utils/requests';
import './banner.css'
const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request); 
                setMovie(request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]);
            } catch (error) {
                console.log("error", error);
            }
        })(); // Close the async function and invoke it immediately

    }, []); // Close the useEffect hook

    // useEffect is used to run a side effect (data fetching) when the component mounts (the empty dependency array [] ensures this only runs once).
    // fetchMovie is an asynchronous function that fetches Netflix original movies using axios and requests.fetchNetflixOriginals (presumably a URL for the Netflix Originals API endpoint).
    // request.data.results holds an array of movies. A random movie is selected using Math.floor(Math.random() * request.data.results.length) and set in the movie state.
  


    function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }
    
    // truncate is a helper function that shortens a long text (str) to a specified length n and appends an ellipsis ... if it’s longer than n characters. If str is undefined or null, it safely returns undefined because of optional chaining str?.length.

  return (
    <div className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
    >
        <div className='banner_contents'>
            <h1 className='banner_title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className='banner_buttons'>
                <button className="banner_button play">Play</button>
                <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">{truncate(movie?.overview, 150) }</h1>
        </div>           
        < div className='banner_fadeBottom'/>
    
    </div>
    )
};

export default Banner
