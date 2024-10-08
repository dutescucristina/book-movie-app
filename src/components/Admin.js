import { Link } from "react-router-dom";
import { Header } from './Header';
import { Footer } from "./Footer";

function Admin() {
    return (
        <div class="container">
            <Header />
            <div style={{ marginTop: 100 }}>
                <h3>Admin Dashboard</h3>
                <Link
                    to='/viewMovies'
                ><a href="#" class="btn btn-success" style={{ marginRight: 20 }}>View movies</a></Link>
                <Link
                    to='/addMovie'
                ><a href="#" class="btn btn-success">Add movie</a></Link>
                <br>
                </br>
                <br></br>
                <Link
                    to='/viewCinemas'
                ><a href="#" class="btn btn-success" style={{ marginRight: 20 }}>View cinemas</a></Link>
                <Link
                    to='/addCinema'
                ><a href="#" class="btn btn-success">Add cinema</a></Link>
            </div>
            <Footer />
        </div>
    )
}

export default Admin;
