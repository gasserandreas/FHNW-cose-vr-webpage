import React, { PropTypes } from 'react';

const renderProductListRow = ({ name, links }) => {
  return (

    <div className="row product-list-row">
      <div className="col-xxs-12 col-xs-6 legend">
        {name}:
      </div>
      <div className="col-xxs-12 col-xs-6">
        <ul className="content">
          { links.map(({ url, text }, i) => {
            return (
              <li key={i}>
                <a
                  href={url}
                  alt={text}
                  target="_blank"
                >{text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const renderHashtagRow = ({ green, red }) => {
  const greenHtml = green.map((color, i) => <li key={`green-${i}`} className="green">#{color}</li>);
  const redHtml = red.map((color, i) => <li key={`red-${i}`} className="red">#{color}</li>);
  return (
    <div className="row hashtag-list-row">
      <div className="col-xxs-12 col-xs-6 legend">
        Most used hastags:
      </div>

      <div className="col-xxs-12 col-xs-6">
        <ul className="content">
          {greenHtml}{redHtml}
        </ul>
      </div>
    </div>
  );
};

const ProductList = ({ data, reversed }) => {
  const { rows, hashtags } = data;
  const rowsHtml = rows.map((row) => renderProductListRow(row));
  const hashtagsHtml = renderHashtagRow(hashtags);
  return (
    <div className={`row link-container ${reversed ? '' : 'is-reversed'}`} style={{ marginTop: '2rem' }}>
      <div className="off-md-1 col-xxs-12 col-sm-5">
        <div className="product-list">
          {rowsHtml}
        </div>
      </div>
      <div className="off-sm-1 col-xxs-12 col-sm-5">
        <div className="product-list">
          {hashtagsHtml}
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.shape({
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            text: PropTypes.string,
          })
        )
      })
    ),
    hashtags: PropTypes.shape({
      green: PropTypes.arrayOf(PropTypes.string),
      red: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default ProductList;
