import React, { Component } from 'react';
import { Redirect } from 'react-router';

class KiddosPanel extends Component {
  constructor(props) {
    super(props);
  }

  zoomHandler() {
    location.reload();
  }

  render() {
    const markersList = this.props.kiddos.map(kiddo => {
      return (
        <li key={ kiddo._id } onClick={ () => this.props.onKiddoSelected(kiddo) } >
          <img
            style={{ height:'40px', with:'40px', borderRadius:'50%' }}
            src={ kiddo.avatar.url }
          />
        </li>
      );
    });

    return (
      <ul className="kiddo-panel" >
        { markersList }
        <li onClick={ this.zoomHandler } >
          <img
            style={{ height:'40px', with:'40px', borderRadius:'50%' }}
            src={ './img/view-all.png' }
          />
        </li>
      </ul>
    );
  }
}

export default KiddosPanel;
