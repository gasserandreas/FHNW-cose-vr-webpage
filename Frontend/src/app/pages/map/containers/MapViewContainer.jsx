import { connect } from 'react-redux';

import { loadMapData } from '../../../redux/map/actions';
import { navigateToPath } from '../../../actions';

import MapView from '../components/MapView';

const mapStateToProps = (state) => {
  const { map } = state;
  const { earthquakeById, earthquakeIds, async } = map;
  const { isFetching, error } = async;
  return {
    earthquakeById,
    earthquakeIds,
    isFetching,
    error
  }
};

const mapDispatchToProps = ({
  loadMapData,
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
