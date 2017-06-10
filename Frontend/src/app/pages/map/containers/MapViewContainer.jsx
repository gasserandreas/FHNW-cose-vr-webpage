import { connect } from 'react-redux';

import { loadDevices, loadMapLocations, loadItems } from '../../../redux/map/actions';
import { navigateToPath } from '../../../actions';

import MapView from '../components/MapView';

const mapStateToProps = (state) => {
  const { map } = state;
  const {
    devicesById,
    devicesIds,
    locationsById,
    locationsIds,
    itemIds,
    itemById,
    async
  } = map;
  console.log(map);
  const { isFetching, error } = async;
  return {
    devicesById,
    devicesIds,
    locationsById,
    locationsIds,
    itemIds,
    itemById,
    isFetching,
    error
  }
};

const mapDispatchToProps = ({
  loadItems,
  loadDevices,
  loadMapLocations,
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
