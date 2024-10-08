const initialState={
    initialMovies:[],
    filteredMovies: [],
    movieTypes: [],
    loading: false,
    error: '',
    email: ''
};

const MovieReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "GET_MOVIES":
            let initialMovieTypes = []
            action.payload.map(m => {
                    if(!initialMovieTypes.includes(m.movieType)){
                        initialMovieTypes.push(m.movieType)
                    }
            })
        return {
            ...state,
            initialMovies: action.payload,
            filteredMovies: action.payload,
            loading: false,
            movieTypes: initialMovieTypes,
            error: ''
        }
        case "FILTER_MOVIES":
            let filteredMoviesList = [...state.initialMovies]
            if(action.searchTerm != null){
                filteredMoviesList = filteredMoviesList.filter((m) => m.name.includes(action.searchTerm))
            }
            if(action.typeFilter != null){
                if(action.typeFilter !='all'){
                    filteredMoviesList = filteredMoviesList.filter((m) => m.movieType.toLowerCase() === action.typeFilter.toLowerCase())
                }
            }
        return {
            ...state,
            filteredMovies: filteredMoviesList
        }
        case "SEND_REQUEST":
        return {
            ...state,
            movies: [],
            loading: true,
            error: ''
        }

        case "SET_ERROR":
        return {
            ...state,
            movies: [],
            loading: false,
            error: action.payload
        }

        case "CLEAR_MOVIES":
        return {
            ...state,
            movies: [],
            filteredMovies: null,
            error: ''
        }
    
        case "SET_USER":
        return {
            ...state,
            email: action.payload
        }
        default:
            return state;
    }
}

export default MovieReducer;
