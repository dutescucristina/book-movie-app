import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';
import { reservationEndpoint } from '../utils/Constants';
import axios from 'axios';

const Booking = (props) => {
    var location = useLocation();
    var navigate = useNavigate();
    const id = location.state?.id
    const movies = useSelector(state => state.initialMovies)
    const email = useSelector(state => state.email)
    let movie = movies.find(m => m.id == id)
    var currentDate = new Date();
    const [dayValue, setDayValue] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [hourValue, setHourValue] = useState(10);
    const [emailValue, setEmailValue] = useState('');
    const [cinemaValue, setCinemaValue] = useState(movie?.cinemas[0].id);
    const [showCalendar, setShowCalendar] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value);
    }

    const handleHourValue = (event) => {
        setHourValue(event.target.value);
    }

    const handleCinemaValue = (event) => {
        setCinemaValue(event.target.value);
    }

    const handleBooking = async () => {
        let url = `${reservationEndpoint}makeReservation`
        var finalBookTimeZone = hourValue * 3600000;
       
        var objToSend = {
            email: email,
            movieId: movie.id,
            cinemaId: cinemaValue,
            reservationDateFe: dayValue.getTime() + finalBookTimeZone
        }
        var response = {
            email: email,
            name: movie.name,
            date: `${dayValue.getDate()}/${dayValue.getMonth() + 1}/${dayValue.getFullYear()}`,
            hour: `${hourValue}:00`,
            cinema: movie.cinemas.find(c => c.id === cinemaValue).name,
            movie_type: movie.movieType
        }
        try {

            const responseServer = (await axios.post(url, objToSend));
            if (responseServer.data != null) {
                navigate("/bookingInformation", { state: { response: {...response, price: responseServer.data.price }} });
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
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>{movie.name} - {movie.movieType}</b></h5><br></br>
            <span style={{ "color": "red" }}>{error}</span>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, color: "#348269" }}>Date: </label><br></br>
                <input style={{ marginTop: 10 }} type="button" placeholder="Select date" value={`${dayValue.getDate()}/${dayValue.getMonth() + 1}/${dayValue.getFullYear()}`} onClick={() => setShowCalendar(!showCalendar)} />
                {showCalendar && <Calendar
                    onChange={(val) => {
                        setDayValue(val)
                        setShowCalendar(!showCalendar)
                    }
                    }
                    value={dayValue}
                />}
            </div>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 6, color: "#348269" }}>Choose hour: </label><br></br>
                <select style={{ marginTop: 10 }} name="types" id="types" onChange={handleHourValue}>
                    <option value={10}>{"10:00"}</option>
                    <option value={12}>{"12:00"}</option>
                    <option value={14}>{"14:00"}</option>
                    <option value={16}>{"16:00"}</option>
                    <option value={18}>{"18:00"}</option>
                    <option value={20}>{"20:00"}</option>
                </select>
            </div>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 6, color: "#348269" }}>Choose cinema: </label><br></br>
                <select style={{ marginTop: 10 }} name="types" id="types" onChange={handleCinemaValue}>
                    {movie.cinemas.map(c => {
                        return (<option value={c.id}>{c.name}</option>)
                    })}
                </select>
            </div>
            <div class="form-group" style={{ marginLeft: 20 }}>
                <Button style={{ marginTop: 30, alignSelf: "flex-end" }} onClick={handleBooking}>Book</Button>
            </div>
            <Footer />
        </form>
    );
}

export default Booking;
