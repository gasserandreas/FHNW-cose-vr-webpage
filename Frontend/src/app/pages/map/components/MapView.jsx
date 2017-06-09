import React, { Component, PropTypes } from 'react';
import Datamap from './DataMapComponent';

const scopes = {
  world: 'world',
  usa: 'usa',
};

const initialState = {
  scope: scopes.world,
};

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleOnChange = this.handleOnChange.bind(this);

    this.renderViewOption = this.renderViewOption.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    this.props.loadMapLocations();
  }

  handleOnChange(key) {
    return (event) => {
      const { value } = event.target;
      const newState = { ...this.state };
      newState[key] = value;
      this.setState(newState);
    };
  }

  renderViewOption() {
    return (
      <select
        onChange={this.handleOnChange('scope')}
        value={this.state.scope}
      >
        {Object.keys(scopes).map((key) => {
          const scope = scopes[key];
          return (
            <option
              key={scope}
              value={scope}
            >{scope}</option>
          )
        })}
      </select>
    );
  }

  renderBubbles() {
    const { locationsIds, locationsById } = this.props;

    return locationsIds.map((id) => {
      const location = locationsById[id];
      const { name, Latitude, Longitude } = location;

      return {
        name,
        latitude: Latitude,
        longitude: Longitude,
        radius: 1.5,
        fillKey: 'bubbleFill',
      }
    });
  }

  renderMap() {
    const { scope } = this.state;

    const bubbles = this.renderBubbles();

    return (
      <Datamap
        responsive
        scope={scope}
        geographyConfig={{
          popupOnHover: false,
          highlightOnHover: false, // false
        }}
        fills={{
          defaultFill: '#EEEEEE',
          bubbleFill: '#DD0000',
        }}
        bubbles={bubbles}
        bubbleOptions={{
          borderWidth: 1,
          borderColor: '#FF0000',
        }}
      />
    );
  }

  render() {
    const { isFetching, locationsIds } = this.props;
    return (
      <div className="row">
        <div className="view-option">
          Show map as { this.renderViewOption() }
        </div>
        <div className="col-xxs-12">
          <div className="filter">
          </div>
        </div>
        <div className="col-xxs-12" style={{ minHeight: '750px' }}>
          <div className="map-view">
            { isFetching && <p>Loading...</p> }
            { locationsIds.length > 0 && this.renderMap() }
          </div>
        </div>
      </div>
    )
  }
}

MapView.propTypes = {
  locationsById: PropTypes.object,
  locationsIds: PropTypes.arrayOf(PropTypes.number),
  loadMapLocations: PropTypes.func.isRequired,
};

export default MapView;
