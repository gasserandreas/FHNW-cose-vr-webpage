import { connect } from 'react-redux';

import { navigateToPath } from '../../../actions';
import { loadSearchItems } from '../../../redux/search-item/actions';

import SearchItemView from '../components/SearchItemView';

const mapStateToProps = (state) => {
  const { searchItem } = state;
  const { async, byId, ids } = searchItem;
  console.log(state);
  return {
    async,
    searchItemById: byId,
    searchItemIds: ids,
  };
};

const mapDispatchToProps = ({
  loadSearchItems,
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchItemView);
