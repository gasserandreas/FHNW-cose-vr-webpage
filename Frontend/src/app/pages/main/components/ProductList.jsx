import React, { PropTypes } from 'react';

const renderProductListRow = ({ name, links }) => {
  return (
    <div className="product-list-row">
      <div className="legend">{name}:</div>
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
  );
};

const renderHashtagRow = ({ green, red }) => {
  const greenHtml = green.map((color, i) => <li key={`green-${i}`} className="green">#{color}</li>);
  const redHtml = red.map((color, i) => <li key={`red-${i}`}  className="red">#{color}</li>);
  return (
    <div className="hashtag-list-row">
      <div className="legend">Most used hashtags:</div>
      <ul className="content">
        {greenHtml}{redHtml}
      </ul>
    </div>
  );
};

const ProductList = ({ data }) => {
  const { rows, hashtags } = data;
  const rowsHtml = rows.map((row) => renderProductListRow(row));
  const hashtagsHtml = renderHashtagRow(hashtags);
  return (
    <div className="product-list">
      {rowsHtml}
      {hashtagsHtml}
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
