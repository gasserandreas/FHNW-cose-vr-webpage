import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'

import { navigateToPath } from '../../../actions';
import { loadSearchItems } from '../../../redux/search-item/actions';

import EbayItemsComponent from '../components/EbayItemsComponent';

const filterItems = (filter, itemsObject) => {
  if (filter === '' || itemsObject === null) return itemsObject;
  const filteredObject = {};

  Object.keys(itemsObject).forEach((key) => {
    if (itemsObject[key].device.name.toLowerCase().includes(filter.toLowerCase())) filteredObject[key] = itemsObject[key];
  });

  return filteredObject;
};


const mapStateToProps = (state) => {
  const { searchItem } = state;
  const { async, byId, ids } = searchItem;
  const currentSearchValue = state.form.search && state.form.search.values && state.form.search.values.search ? state.form.search.values.search : '';
  return {
    async,
    searchItemById: filterItems(currentSearchValue, byId),
    searchItemIds: ids,
  };
};

const mapDispatchToProps = ({
  loadSearchItems,
  navigateToPath,
});

const formContainer = reduxForm({ form: 'search' })(EbayItemsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(formContainer);
