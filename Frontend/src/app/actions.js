import { browserHistory } from 'react-router';

function navigateToPath(route) {
  return () => {
    browserHistory.push(route);
  };
}

const empty = () => {};

export {
  navigateToPath,
  empty,
};
