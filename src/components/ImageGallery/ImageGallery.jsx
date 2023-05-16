import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from "./ImageGallery.module.css";
import { Component } from 'react';

export class ImageGallery extends Component {
    render() {
        const { items, onSelect } = this.props;
        return (
            <ul className={css.gallery}>
                {items.map(({ id, webformatURL, tags, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        alt={tags}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        onSelect={onSelect}
                    />
                ))}
            </ul>
        );
    }
};




ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
};