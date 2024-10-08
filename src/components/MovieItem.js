import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
    const routeState = {
        id: movie.id,
    }
    return (
        <div>
            <div class="card w-50">
                <div class="card-body">
                    <h5 class="card-title"><b>{movie.name}</b></h5>
                    <p class="card-text">{movie.movieType}</p>
                    <Link
                        to='/booking' state={routeState}
                    ><a href="#" class="btn btn-success">Book</a></Link>

                </div>
            </div>
        </div>
    )
}

export default MovieItem;
