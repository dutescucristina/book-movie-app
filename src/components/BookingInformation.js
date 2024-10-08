import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';

const BookingInformation = (props) => {
    var location = useLocation();
    const movie = location.state?.response

    return (
        <div>
            <Header />
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>{movie.name} - {movie.movie_type}</b></h5><br></br>
            <div style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 5 }}>Email: </label>
                <label style={{ fontSize: 20, marginRight: 5 }}><b>{movie.email}</b></label>
            </div>
            <div style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 5 }}>Date: </label>
                <label style={{ fontSize: 20, marginRight: 5 }}><b>{movie.date}</b></label>
            </div>
            <div style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 5 }}>Hour: </label>
                <label style={{ fontSize: 20, marginRight: 5 }}><b>{movie.hour}</b></label>
            </div>
            <div style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 5 }}>Cinema: </label>
                <label style={{ fontSize: 20, marginRight: 5 }}><b>{movie.cinema}</b></label>
            </div>
            <div style={{ marginLeft: 20 }}>
                <label style={{ fontSize: 20, marginRight: 5 }}>Price: </label>
                <label style={{ fontSize: 20, marginRight: 5 }}><b>{movie.price}</b></label>
            </div>
            <Footer />
        </div>
    );
}

export default BookingInformation;
