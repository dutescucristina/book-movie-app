import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { adminEndpoint } from '../utils/Constants';

const ViewCinemas = (props) => {
    var navigate = useNavigate();
    const [cinemaNameValue, setCinemaNameValue] = useState('');
    const [cinemas, setCinemas] = useState([]);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getCinemas = async () => {

            //setCinemas([{cinema: {id: 1, name: "cinema1"}}, {cinema: {id: 2, name: "cinema2"}}, {cinema: {id: 3, name: "cinema3"}}])

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
    }, [refresh])

    const handleDeleteCinema = async (id) => {
        try {
            const response = (await axios.delete(`${adminEndpoint}cinemas/${id}`));
            setRefresh(!refresh)
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form>
            <Header />
            <h5 style={{ marginTop: 80, marginBottom: 10, marginLeft: 20 }} class="card-title"><b>View Cinemas</b></h5><br></br>
            <div style={{ marginLeft: 20 }}>
                <Link
                    to='/admin'
                >Go to Admin</Link>
                <span style={{ "color": "red" }}>{error}</span>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cinemas.map(c => {
                            return (
                                <tr>
                                    <th scope="row">{c.id}</th>
                                    <td>{c.name}</td>
                                    <td><Button onClick={() => handleDeleteCinema(c.id)}>Delete</Button></td>
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

export default ViewCinemas;
