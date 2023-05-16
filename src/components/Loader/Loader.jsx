import React, { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
    render() {
      return (
        <ColorRing
          className={css.loader}
          type="Puff"
          color="#47acce"
          height={500}
          width={500}
          timeout={3000}
        />
      );
    }
  }
