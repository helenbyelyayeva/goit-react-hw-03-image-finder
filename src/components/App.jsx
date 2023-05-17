import React from 'react';
import { scrollToBottom } from './Info/Scroll';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Info/Api';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    items: [],
    loading: false,
    largeImageUrl: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (search, page) => {
    this.setState({ loading: true });
    if (!search) {
      return;
    } try {
      const { hits, totalHits } = await fetchImages(search, page);
      if (search.length === 0 || totalHits === 0) {
        toast.error('Nothing was found :(');
        return;
      } else if (page === 1) {
        toast.success(`${totalHits} images were found`);
      }
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, items: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scrollToBottom();
  };

  openModal = largeImageUrl => {
    this.setState({ largeImageUrl: largeImageUrl });
  };

  onCloseModal = () => {
    this.setState({ largeImageUrl: '' });
  };

  render() {
    const { error, page, loading, items, largeImageUrl } = this.state;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && page === 1 ? (
          <Loader />
        ) : (
          <ImageGallery items={items} onSelect={this.openModal} />
        )}
        {items.length >= 12 && <Button onLoadMore={this.loadMore} />}
        {largeImageUrl.length > 0 && (
          <Modal url={largeImageUrl} onClose={this.onCloseModal} />
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

