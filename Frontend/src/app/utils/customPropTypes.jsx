import { PropTypes } from 'react';

export const validationPropType = PropTypes.shape({
  type: PropTypes.oneOf(['regex', 'ajax']).isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
});

export const stylePropType = PropTypes.arrayOf(PropTypes.any);

export const clientPropType = PropTypes.shape({
  clientTypes: PropTypes.arrayOf(PropTypes.any),
  email: PropTypes.string,
  firstname: PropTypes.string,
  id: PropTypes.number,
  lastname: PropTypes.string,
  raceOrganizers: PropTypes.any,
});
