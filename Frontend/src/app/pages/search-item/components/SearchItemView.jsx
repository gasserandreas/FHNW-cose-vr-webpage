import React, { Component, PropTypes as Types } from 'react';

class SearchItemView extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.renderDataTable = this.renderDataTable.bind(this);
  }

  loadData() {
    this.props.loadSearchItems();
  }

  renderDataTable() {
    const { searchItemById, searchItemIds } = this.props;
    const firstItem = searchItemById[searchItemIds[0]];
    const keys = Object.keys(firstItem).map((key, i) => <th key={i}>{key}</th>);

    const rows = searchItemIds.map((id, i) => {
      const item = searchItemById[id];
      return (
        <tr>
          { Object.keys(item).map((key, i2) => <td key={`${i}-${i2}`}>{item[key]}</td>) }
        </tr>
      );
    });
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            {keys}
          </tr>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    const { async, searchItemIds } = this.props;
    return (
      <div className="container-fluid search-item-view">
        <div className="demo">
          <h1>Welcome to Search Item View</h1>
          <div className="row">
            <div className="col-xs-12">
              <button
                className="btn btn-default"
                onClick={this.loadData}
              >
                { async.isFetching
                  ? 'Loading...'
                  : 'Load data'
                }
              </button>
            </div>
            { searchItemIds.length > 0 && this.renderDataTable() }
          </div>
        </div>
      </div>
    );
  }
}

SearchItemView.propTypes = {
  loadSearchItems: Types.func.isRequired,
  async: Types.object,
  searchItemById: Types.object,
  searchItemIds: Types.arrayOf(Types.number),
};

export default SearchItemView;
