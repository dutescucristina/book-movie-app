import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { adminEndpoint } from '../utils/Constants';
import axios from 'axios';

const AddMovie = (props) => {
    var location = useLocation();
    var navigate = useNavigate();
    const [cinemas, setCinemas] = useState([]);
    const [error, setError] = useState("");

    const [movieNameValue, setMovieNameValue] = useState('');
    const [movieTypeValue, setMovieTypeValue] = useState('drama');

    const handleMovieNameChange = (event) => {
        setMovieNameValue(event.target.value);
    }

    const handleMovieTypeChange = (event) => {
        setMovieTypeValue(event.target.value);
    }

    const [cinemasValue, setCinemasValue] = useState([]);
    useEffect(() => {
        const getCinemas = async () => {
            //setCinemas([{ cinema: { id: 1, name: "cinema1" } }, { cinema: { id: 2, name: "cinema2" } }, { cinema: { id: 3, name: "cinema3" } }])

            try {

                const response = (await axios.get(`${adminEndpoint}cinemas`));
                if (response.data != null) {
                    setCinemas(response.data)
                } else {
                    setError(response.data)
                }
            } catch (error) {
                setError(error)
            }
        }
        getCinemas()
    }, [])

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if (event.target.checked) {
            setCinemasValue([...cinemasValue, checkedId])
        } else {
            setCinemasValue(cinemasValue.filter(id => id !== checkedId))
        }
    }

    const handleAddMovie = async () => {
        let cinemasObj = []
        cinemasValue.map(c =>
            cinemasObj.push({ id: c })
        )

        var objToSend = {
            name: movieNameValue,
            movieType: movieTypeValue,
            cinemas: cinemasObj
        }

        try {
            let url = `${adminEndpoint}movies`
            const response = (await axios.post(url, objToSend));
            if (response.data.id != null) {
                navigate("/viewMovies");
            } else {
                setError(response.data)
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form>
            <Header />
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>Add Movie</b></h5><br></br>
            <span style={{ "color": "red" }}>{error}</span>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, color: "#348269" }}>Movie name: </label><br></br>
                <input style={{ marginTop: 10 }} type="text" placeholder="Fill in name of movie.." value={movieNameValue} onChange={handleMovieNameChange} />
            </div>

            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, color: "#348269" }}>Movie type: </label><br></br>
                <select style={{ marginTop: 10 }} name="types" id="types" onChange={handleMovieTypeChange}>
                    <option value={"drama"}>{"Drama"}</option>
                    <option value={"comedy"}>{"Comedy"}</option>
                    <option value={"thriller"}>{"Thriller"}</option>
                    <option value={"romance"}>{"Thriller"}</option>
                    <option value={"action"}>{"Action"}</option>
                </select>
            </div>

            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, color: "#348269" }}>Cinemas: </label><br></br>
                {cinemas.map(c => {
                    return (
                        <div>
                            <label key={c.id}>
                                <input
                                    type="checkbox"
                                    value={c.id}
                                    checked={cinemasValue.includes(c.id.toString())}
                                    onChange={(event) => { handleCheckboxChange(event) }}
                                />
                                {c.name}
                            </label><br></br>
                        </div>

                    )
                })}
            </div>

            <div class="form-group" style={{ marginLeft: 20 }}>
                <Button style={{ marginTop: 30, alignSelf: "flex-end" }} onClick={handleAddMovie}>Add Movie</Button>
            </div>
            <Footer />
        </form>
    );
}

export default AddMovie;
