import React, { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <ColorRing
          type="Puff"
          color="#47acce"
          height={400}
          width={400}
          timeout={3000}
        />
      </div>
    );
  }
}
