import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { adminEndpoint } from '../utils/Constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ViewMovies = (props) => {
    const dispatch = useDispatch()
    var location = useLocation();
    var navigate = useNavigate();
    const [cinemaNameValue, setCinemaNameValue] = useState('');
    const movies = useSelector(state => state.initialMovies)
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getMovies = async () => {

            //setMovies([{cinema: {id: 1, name: "cinema1"}}, {cinema: {id: 2, name: "cinema2"}}, {cinema: {id: 3, name: "cinema3"}}])
            //             setMovies([{"movie" : {"id": 1, "name": "movie1", 
            //             "movie_type": 'drama', 
            //             "cinemas": [{"cinema": {id: 1, name: "cinema1"}}, {"cinema": {id: 2, name: "cinema2"}}]}
            //         },
            //         {"movie" : {"id": 2, "name": "movie2", 
            //         "movie_type": 'comedy', 
            //         "cinemas": [{"cinema": {id: 3, name: "cinema3"}}, {"cinema": {id: 2, name: "cinema2"}}]}
            //     },
            //     {"movie" : {"id": 3, "name": "movie3", 
            //     "movie_type": 'drama', 
            //     "cinemas": [{"cinema": {id: 2, name: "cinema2"}}, {"cinema": {id: 4, name: "cinema4"}}]}
            // }, {"movie" : {"id": 4, "name": "movie4", 
            // "movie_type": 'drama', 
            // "cinemas": [{"cinema": {id: 1, name: "cinema1"}}, {"cinema": {id: 2, name: "cinema2"}}]}
            // }
            //     ])

            try {
                const response = (await axios.get(`${adminEndpoint}movies`));
                if (response.data != null) {
                    dispatch({ type: 'GET_MOVIES', payload: response.data });
                } else {
                    setError(response.data)
                }
            } catch (error) {
                setError(error)
            }
        }
        getMovies()
    }, [refresh])

    const handleDeleteMovie = async (id) => {
        try {
            const response = (await axios.delete(`${adminEndpoint}movies/${id}`));
            setRefresh(!refresh)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error });
        }
    }

    return (
        <form>
            <Header />
            
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>View Movies</b></h5><br></br>
            <div style={{marginLeft: 20}}>
            <Link
                    to='/admin'
                >Go to Admin</Link>
            <span style={{ "color": "red" }}>{error}</span>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Handle</th>

                    </tr>
                </thead>
                <tbody>
                    {movies.map(c => {
                        return (
                            <tr>
                                <th scope="row">{c.id}</th>
                                <td>{c.name}</td>
                                <td>{c.movieType}</td>

                                <td><Button onClick={() => handleDeleteMovie(c.id)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            <Footer />
        </form>
    );
}

export default ViewMovies;
