import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api/Api';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    items: [],
    loading: false,
    largeImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (im, page) => {
    this.setState({ loading: true });
    if (!im) {
      return;
    } const { hits, totalHits } = await fetchImages(im, page);
    if (im.length === 0 || totalHits === 0) {
      toast.error('Nothing was found :(');
      this.setState({ loading: false });
      return;
    } else if (page === 1) {
      toast.success(`${totalHits} images were found`);
    }

    this.setState(prevState => ({
      items: [...prevState.items, ...hits],
      loading: false,
    }));
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, items: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = link => {
    this.setState({ largeImageUrl: link });
  };

  onCloseModal = () => {
    this.setState({ largeImageUrl: '' });
  };

  render() {
    const {loading, items, largeImageUrl } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading ? (
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

