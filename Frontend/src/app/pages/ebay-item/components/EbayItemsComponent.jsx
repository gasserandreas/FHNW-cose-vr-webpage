import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

class EbayItemsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadSearchItems();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xxs-12 col-sm-6">
            <div className="input-container search">
              <Field name="search" id="search" component="input" type="text" placeholder="Search for a product" />
            </div>
          </div>
          <div className="col-xxs-12 col-sm-6">
            <div className="input-container sort">
              <label htmlFor="sort">Sort:</label>
              <Field defaultValue={"0"} name="sort" id="sort" component="select">
                <option>Name</option>
                <option value="1">Price descending</option>
                <option value="2">Biders descending</option>
                <option value="3">Interested descending</option>
              </Field>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxs-12">
            <div className="table-container">
              <table cellPadding="0" cellSpacing="0">
                <thead>
                <tr>
                  <th>Product</th>
                  <th>No. of biders</th>
                  <th>No. of interesteds</th>
                  <th className="text-right-align">Price</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.props.searchItemById && this.props.searchItemById.map((item, index) => (
                    <tr key={`search-item-${index}`}>
                      <td className="Product" data-title="Product">{item.device.name}</td>
                      <td data-title="Biders">{item.sellingStatus.bidCount > 0 ? item.sellingStatus.bidCount : 0}</td>
                      <td data-title="Interesteds">{item.sellingStatus.interestCount}</td>
                      <td data-title="Price" className="text-right-align">$ {item.sellingStatus.currentPrice}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
              {
                this.props.async.isFetching && (
                  <div className="text-center-align">loading data...</div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EbayItemsComponent.propTypes = {
  loadSearchItems: PropTypes.func.isRequired,
  async: PropTypes.shape({}),
  searchItemById: PropTypes.arrayOf(PropTypes.shape({})),
  searchItemIds: PropTypes.arrayOf(PropTypes.number),
};

export default EbayItemsComponent;
