import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { adminEndpoint } from '../utils/Constants';
import axios from 'axios';

const AddCinema = () => {
    var navigate = useNavigate();
    const [cinemaNameValue, setCinemaNameValue] = useState('');
    const [error, setError] = useState("");

    const handleCinemaNameChange = (event) => {
        setCinemaNameValue(event.target.value);
    }

    const handleAddCinema = async () => {
        let url = `${adminEndpoint}cinemas`
        var objToSend = {
            name: cinemaNameValue
        }

        try {
            const response = (await axios.post(url, objToSend));
            if (response.data != null) {
                navigate("/viewCinemas");
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
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>Add Cinema</b></h5><br></br>
            <span style={{ "color": "red" }}>{error}</span>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, color: "#348269" }}>Cinema name: </label><br></br>
                <input style={{ marginTop: 10 }} type="text" placeholder="Fill in name of cinema.." value={cinemaNameValue} onChange={handleCinemaNameChange} />
            </div>

            <div class="form-group" style={{ marginLeft: 20 }}>
                <Button style={{ marginTop: 30, alignSelf: "flex-end" }} onClick={handleAddCinema}>Add Cinema</Button>
            </div>
            <Footer />
        </form>
    );
}

export default AddCinema;
