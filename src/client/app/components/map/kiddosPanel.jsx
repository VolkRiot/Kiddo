import React, { Component } from 'react';

class KiddosPanel extends Component {
  constructor(props) {
    super(props);
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
      </ul>
    );
  }
}

export default KiddosPanel;
