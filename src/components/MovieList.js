import { useDispatch, useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { adminEndpoint } from "../utils/Constants";

export const MovieList = () => {
    const dispatch = useDispatch()
    const filteredMovies = useSelector(state => state.filteredMovies);
    let [error, setError] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            dispatch({ type: 'SEND_REQUEST' });

            try {
                const response = (await axios.get(`${adminEndpoint}movies`));
                if (response.data != null) {
                    dispatch({ type: 'GET_MOVIES', payload: response.data });
                } else {
                    dispatch({ type: 'SET_ERROR', payload: response.data });
                    setError(response.data)
                }
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error });
                setError(error)
            }
        }
        getMovies()
    }, [])
    return (
        <div style={{ marginTop: 20 }}>
            <h2>{filteredMovies != null && filteredMovies.length > 0 ? "Movies" : ""}</h2>
            <span style={{ "color": "red" }}>{error}</span>
            <div className="row ">
                {filteredMovies != null && filteredMovies.map((movie) => (
                    <MovieItem className="row" key={movie.id} movie={movie} />
                )
                )}
            </div>
        </div>
    )
}
