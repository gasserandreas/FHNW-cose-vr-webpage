import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'

import { navigateToPath } from '../../../actions';
import { loadSearchItems } from '../../../redux/search-item/actions';

import EbayItemsComponent from '../components/EbayItemsComponent';

const sortItems = (sortOrder, products) => {
  switch (sortOrder) {
    case '1':
      return products.sort(orderByPriceDesc);
    case '2':
      return products.sort(orderByBidersDesc);
    case '3':
      return products.sort(orderByInterestedsDesc);
    default:
      return products.sort(orderByName);
  }
};

const orderByPriceDesc = (a, b) => {
  if (a.sellingStatus.currentPrice > b.sellingStatus.currentPrice)
    return -1;
  if (a.sellingStatus.currentPrice < b.sellingStatus.currentPrice)
    return 1;
  return 0;
};

const orderByName = (a, b) => {
  if (a.device.name < b.device.name)
    return -1;
  if (a.device.name > b.device.name)
    return 1;
  return 0;
};

const orderByBidersDesc = (a, b) => {
  if (a.sellingStatus.bidCount > b.sellingStatus.bidCount)
    return -1;
  if (a.sellingStatus.bidCount < b.sellingStatus.bidCount)
    return 1;
  return 0;
};

const orderByInterestedsDesc = (a, b) => {
  if (a.sellingStatus.interestCount > b.sellingStatus.interestCount)
    return -1;
  if (a.sellingStatus.interestCount < b.sellingStatus.interestCount)
    return 1;
  return 0;
};


const filterItems = (filter, itemsObject) => {
  if (filter === '' || itemsObject === null) return productsToArray(itemsObject);
  const filteredObject = [];

  Object.keys(itemsObject).forEach((key) => {
    if (itemsObject[key].device.name.toLowerCase().includes(filter.toLowerCase())) filteredObject.push(itemsObject[key]);
  });

  return filteredObject;
};

const productsToArray = (itemsObject) => {
  const products = [];
  Object.keys(itemsObject).forEach((key) => {
    products.push(itemsObject[key]);
  });

  return products;
};


const mapStateToProps = (state) => {
  const { searchItem } = state;
  const { async, byId, ids } = searchItem;
  const currentSearchValue = state.form.search && state.form.search.values && state.form.search.values.search ? state.form.search.values.search : '';
  const currentSortOrder = state.form.search && state.form.search.values && state.form.search.values.sort ? state.form.search.values.sort : 0;
  return {
    async,
    searchItemById: sortItems(currentSortOrder, filterItems(currentSearchValue, byId)),
    searchItemIds: ids,
  };
};

const mapDispatchToProps = ({
  loadSearchItems,
  navigateToPath,
});

const formContainer = reduxForm({ form: 'search' })(EbayItemsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(formContainer);
