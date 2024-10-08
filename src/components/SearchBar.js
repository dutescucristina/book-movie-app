import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const SearchBar = ({ onSearch }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const movies = useSelector(state => state.initialMovies);
    const movieTypes = useSelector(state => state.movieTypes)

    useEffect(() => {
        dispatch({ type: 'FILTER_MOVIES', searchTerm, typeFilter })
    }, [searchTerm, typeFilter])

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleTypeFilter = (event) => {
        setTypeFilter(event.target.value);
    }

    return (
        <div>
            {movies != null && movies.length > 0 &&
                <div style={{ marginTop: 100 }}>
                    <h3 style={{ color: "#348269" }}>Filters: </h3>
                    <label style={{ fontSize: 20, marginRight: 10, color: "#348269" }}>Name: </label>
                    <input type="text" placeholder="Search Movies....." value={searchTerm} onChange={handleChange} />
                    <br></br>
                    <label style={{ fontSize: 20, marginRight: 6, color: "#348269" }}>Type: </label>
                    <select name="types" id="types" onChange={handleTypeFilter}>
                        <option value={"all"}>{"All"}</option>
                        {movieTypes.map(mt => {
                            return (<option value={mt}>{mt}</option>)
                        })}
                    </select>
                    <br></br>
                </div>
            }
        </div>
    )
}

export default SearchBar;
