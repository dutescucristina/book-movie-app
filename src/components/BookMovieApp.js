import React from 'react';
import SearchBar from './SearchBar';
import { MovieList } from './MovieList';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Footer } from './Footer';

const BookMovieApp = () => {
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    return (
        <div className="container">

            <Header />
            <SearchBar />
            {error && <p>{error}</p>}

            <MovieList />
            <Footer />
        </div>);
}

export default BookMovieApp;
