import React, { Component, PropTypes } from 'react';
import Datamap from './DataMapComponent';

const scopes = {
  world: 'world',
  usa: 'usa',
};

const initialState = {
  scope: scopes.world,
  device: '0',
};

const colors = {
  1: '#342cbd',
  2: '#ff7f0e',
  3: '#2ca02c',
  4: '#c6e33f',
  5: '#8c564b',
  6: '#d62728',
  7: '#1f77b4',
};

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleOnChange = this.handleOnChange.bind(this);

    this.renderViewOption = this.renderViewOption.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    this.props.loadMapLocations();
    this.props.loadDevices();
    this.props.loadItems();
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
            <option key={scope} value={scope}>{scope}</option>
          )
        })}
      </select>
    );
  }

  renderBubbles(locations) {
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
    const { locationsIds, locationsById, itemIds, itemById } = this.props;
    const { scope, device } = this.state;

    // get proper locations
    const locations = device === '0'
      ? itemIds.map(id => itemById[id])
      : itemIds.map(id => itemById[id])
        .filter(item => {
          return item.device.id === parseInt(device);
        });

    // create bubbles
    const bubbles = locations.map((location) => {
      const { device, name, latitude, longitude } = location;
      const fillKey = device.id;
      return {
        name,
        latitude: latitude,
        longitude: longitude,
        radius: 2.5,
        fillKey,
      };
    });

    const fills = {
      ...colors,
      defaultFill: '#EEEEEE',
      bubbleFill: '#DD0000',
    };

    return (
      <Datamap
        responsive
        scope={scope}
        geographyConfig={{
          popupOnHover: false,
          highlightOnHover: false, // false
        }}
        fills={fills}
        bubbles={bubbles}
        bubbleOptions={{
          borderWidth: 0,
          borderColor: '#FF0000',
        }}
      />
    );
  }

  renderFilters() {
    const { device } = this.state;
    const { devicesIds, devicesById } = this.props;
    return (
      <div className="filter-section">
        <div className="filter">
          <label>Device: </label>

          { devicesIds.length > 0 && (
            <select
              value={device}
              onChange={this.handleOnChange('device')}
            >
              <option value="0">All devices</option>
              { devicesIds.map((id) => {
                  const item = devicesById[id];
                  return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  );
                })
              }
            </select>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div className="row">
        <div className="col-xxs-12 col-xs-6">
          { this.renderFilters() }
        </div>
        <div className="col-xxs-12 col-xs-6">
          <div className="view-option">
            Show map as: { this.renderViewOption() }
          </div>
        </div>
        <div className="col-xxs-12">
          <div className="map-view">
            { isFetching && <p>Loading...</p> }
            { !isFetching && this.renderMap() }
          </div>
        </div>
      </div>
    )
  }
}

MapView.propTypes = {
  locationsById: PropTypes.object,
  locationsIds: PropTypes.arrayOf(PropTypes.number),
  devicesById: PropTypes.object,
  devicesIds: PropTypes.arrayOf(PropTypes.number),
  itemIds: PropTypes.arrayOf(PropTypes.number),
  itemById: PropTypes.object,
  loadMapLocations: PropTypes.func.isRequired,
  loadDevices: PropTypes.func.isRequired,
  loadItems: PropTypes.func.isRequired,

};

export default MapView;
