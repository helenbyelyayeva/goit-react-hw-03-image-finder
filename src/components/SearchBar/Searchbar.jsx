import propTypes from 'prop-types';
import { Component } from 'react';
import css from "./Searchbar.module.css";
import { FaSearch } from 'react-icons/fa';



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
            return alert('Enter data for search');
        }
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
        return (
            <header className={css.header}>
                <form className={css.search_form} onSubmit={this.handleSubmit}>
                    <button className={css.search_btn} type="submit" >
                        <FaSearch />
                    </button>
                    <input
                        name="query"
                        type="text"
                        value={ this.state.query}
                        onChange={this.handleChange}
                        className={css.search_input}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photo..."
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,
};
