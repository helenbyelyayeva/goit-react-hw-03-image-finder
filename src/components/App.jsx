import React from 'react';
// import { ToastContainer} from 'react-toastify';
// import { toast } from 'react-toastify';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import {fetchImages} from './Api/Api';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    items: [],
    per_page: 12,
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
  getImages = async (im, page) => {
    this.setState({ loading: true });
    if (!im) {
      return;
    }
    try {
      const { hits } = await fetchImages(im, page);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        // loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };
  handleFormSubmit = query => {
    this.setState({ query, page: 1, items: [] });
  };
  // handleFormSubmit = query => {
  //   if (query !== this.state.query) {
  //     this.setState({ query, page: 1 });
  //     this.setState({ items: [] })
  //     toast.success(`We found it for you ${query}`)
  //     return;
  //   }
  //   else {
  //     toast.info(`Sorry image ${query} not found`, {
  //     });
  //   }

  // };

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
    const {  status, items, largeImageUrl } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {status === 'idle' && (
          <div>
            <h2>Please, enter query</h2>
          </div>
        )}
        {status === 'rejected' && (
          <div>
            <h2>{error.message}</h2>
          </div>
        )} */}
        {/* {items.length > 0 && ( */}
          <ImageGallery items={items} onSelect={this.openModal} />
    /
        {items.length > 11 && <Button onLoadMore={this.loadMore} />}
        {status === 'pending' && (
          <Loader />

        )}
        {largeImageUrl.length > 0 && (
          <Modal url={largeImageUrl} onClose={this.onCloseModal} />
        )}
      {/* <ToastContainer autoClose={2000}/> */}
        {/* {status === 'idle' && (
          <div>
            <h2>Please, enter query</h2>
          </div>
        )}
        {status === 'rejected' && (
          <div>
            <h2>{error.message}</h2>
          </div>
        )}
        {items.length > 0 && (
          <ImageGallery items={items} onSelect={this.openModal} />
        )}
        {items.length > 11 && <Button onLoadMore={this.loadMore} />}
        {status === 'pending' && (
          <div>
            <Loader />
          </div>
        )}
        {largeImageUrl.length > 0 && (
          <Modal url={largeImageUrl} onClose={this.onCloseModal} />
        )} */}
      </>
    );
  }
}

