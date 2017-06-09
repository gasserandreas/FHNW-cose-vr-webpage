import React, { Component, PropTypes } from 'react';
import Datamap from './DataMapComponent';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
    this.createDataMapBubbles = this.createDataMapBubbles.bind(this);
  }

  componentDidMount() {
    this.props.loadMapData();
    this.props.loadMapLocations();
  }

  createDataMapBubbles() {
    const { earthquakeById, earthquakeIds } = this.props;

    //const radius = 10;

    const bubbles = earthquakeIds.map((id) => {
      const item = earthquakeById[id];

      const { location, lat, lng, magnitude, deaths } = item;

      return {
        name: location,
        radius: deaths / 7500,
        latitude: lat,
        longitude: lng,
        fillKey: 'bubbleFill',
      };
    });
    return bubbles;
  }

  createDataMapBubbles2() {
    const { locationsById, locationsIds } = this.props;

    //const radius = 10;

    const bubbles = locationsIds.map((id) => {
      const item = locationsById[id];

      const { Latitude, Longitude } = item;

      return {
        radius: 1.5,
        latitude: Latitude,
        longitude: Longitude,
        fillKey: 'bubbleFill',
      };
    });
    return bubbles;
  }

  renderMap() {
    const bubbles = this.createDataMapBubbles2();

    /*
     fills={{
     'USA': '#1f77b4',
     'RUS': '#9467bd',
     'PRK': '#ff7f0e',
     'PRC': '#2ca02c',
     'IND': '#e377c2',
     'GBR': '#8c564b',
     'FRA': '#d62728',
     'PAK': '#7f7f7f',
     defaultFill: '#EDDC4E',
     bubbleFill: '#DD0000',
     }}
     data={{
     'RUS': {fillKey: 'RUS'},
     'PRK': {fillKey: 'PRK'},
     'PRC': {fillKey: 'PRC'},
     'IND': {fillKey: 'IND'},
     'GBR': {fillKey: 'GBR'},
     'FRA': {fillKey: 'FRA'},
     'PAK': {fillKey: 'PAK'},
     'USA': {fillKey: 'USA'},
     }}
     */

    return (
      <Datamap
        responsive
        scope="world"
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
    const { earthquakeIds, locationsIds, isFetching } = this.props;
    return (
      <div className="map-view">
        { isFetching && <p>Loading...</p> }
        { locationsIds.length > 0 && this.renderMap() }
      </div>
    );
  }
}

MapView.propTypes = {
  earthquakeById: PropTypes.object,
  earthquakeIds: PropTypes.arrayOf(PropTypes.number),
  locationsById: PropTypes.object,
  locationsIds: PropTypes.arrayOf(PropTypes.number),
  loadMapData: PropTypes.func.isRequired,
  loadMapLocations: PropTypes.func.isRequired,
};

export default MapView;
