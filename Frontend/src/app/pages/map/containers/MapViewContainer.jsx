import { connect } from 'react-redux';

import { loadMapData, loadMapLocations } from '../../../redux/map/actions';
import { navigateToPath } from '../../../actions';

import MapView from '../components/MapView';

const mapStateToProps = (state) => {
  const { map } = state;
  const {
    earthquakeById,
    earthquakeIds,
    locationsById,
    locationsIds,
    async
  } = map;
  const { isFetching, error } = async;
  return {
    earthquakeById,
    earthquakeIds,
    locationsById,
    locationsIds,
    isFetching,
    error
  }
};

const mapDispatchToProps = ({
  loadMapData,
  loadMapLocations,
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
