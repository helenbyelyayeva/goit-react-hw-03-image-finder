import propTypes from 'prop-types';
import { Component } from 'react';
import css from "./Searchbar.module.css";
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            toast.error('Please enter some data');
            return;
        }
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };


    render() {
        const { query } = this.state;
        return (
            <header className={css.header}>
                <form className={css.search_form} onSubmit={this.handleSubmit}>
                    <button className={css.search_btn} type="submit" >
                        <FaSearch />
                    </button>
                    <input
                        name="query"
                        type="text"
                        value={query}
                        onChange={this.handleChange}
                        className={css.search_input}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photo..."
                    />
                </form>
                <ToastContainer autoClose={2000} />
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
};
