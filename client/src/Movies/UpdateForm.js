import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";

export default function UpdateForm(props) {
    const [display, setDisplay] = useState(<div>state not loading correctly?</div>)
    const [filmData, setFilmData] = useState({
        id: "",
        title: "",
        metascore: "",
        director: "",
        stars: ""
    })
    useEffect(() => {
        alert("hey")
        if (props.initMovies && props.initMovies.length > 0) {
            const selectedMovie = props.initMovies.filter(movie => { return movie.id === Number(props.match.params.id) })
            console.log(selectedMovie, "selected Movie")
            setFilmData({
                id: "",
                title: selectedMovie[0].title,
                metascore: selectedMovie[0].metascore,
                director: selectedMovie[0].director,
                stars: selectedMovie[0].stars.join(", ")
            });
            setDisplay(
                <div className="movie-list">
                    <MovieCard movie={selectedMovie[0]} />
                </div>)

        }

    }, [props.initMovies, props.match.params.id, props.edited])

    const handleChange = (e) => {
        e.persist();
        setFilmData({
            ...filmData,
            [e.target.id]: e.target.value
        })
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, { ...filmData, stars: filmData.stars.split(", ") })
            .then(res => {
                console.log(res);
                props.setEdited(!props.edited)
            })
            .catch(error => {
                console.log(error);
            });
    };
    const saveAndExit = (e) => {
        e.persist();
        e.preventDefault();
        handleUpdate(e);
        setFilmData({
            title: "",
            metascore: "",
            director: "",
            stars: ""
        })
        props.setEdited(true);
        props.history.push("/")
    };
    const deleteAndExit = (e) => {
        e.persist();
        e.preventDefault();
        axios
            .delete(`http://localhost:5000/api/movies/${props.match.params.id}`, { ...filmData, stars: filmData.stars.split(", ") })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setFilmData({
            id: "",
            title: "",
            metascore: "",
            director: "",
            stars: ""
        })
        props.setEdited(true);
        props.history.push("/")
    };

    return (
        <div>
            {display}
            <form action="submit">
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" value={filmData.title} onChange={handleChange} />
                <label htmlFor="metascore">Metascore:</label>
                <input id="metascore" type="text" value={filmData.metascore} onChange={handleChange} />
                <label htmlFor="director">Director:</label>
                <input id="director" type="text" value={filmData.director} onChange={handleChange} />
                <label htmlFor="stars">Stars:</label>
                <input id="stars" type="text" value={filmData.stars} onChange={handleChange} />
                <button onClick={handleUpdate}>Edit</button>
                <button onClick={saveAndExit}>Done</button>
                <button onClick={deleteAndExit}>Delete</button>
            </form>
        </div>
    )
}
