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
                  this.props.searchItemById && Object.keys(this.props.searchItemById).map((key, index) => (
                    <tr key={`search-item-${index}`}>
                      <td className="Product" data-title="Product">{this.props.searchItemById[key].device.name}</td>
                      <td data-title="Biders">{this.props.searchItemById[key].sellingStatus.bidCount > 0 ? this.props.searchItemById[key].sellingStatus.bidCount : 0}</td>
                      <td data-title="Interesteds">{this.props.searchItemById[key].sellingStatus.interestCount}</td>
                      <td data-title="Price" className="text-right-align">$ {this.props.searchItemById[key].sellingStatus.currentPrice}</td>
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
  searchItemById: PropTypes.shape({}),
  searchItemIds: PropTypes.arrayOf(PropTypes.number),
};

export default EbayItemsComponent;
