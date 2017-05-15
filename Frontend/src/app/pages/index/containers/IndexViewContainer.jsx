import { connect } from 'react-redux';

import { navigateToPath } from '../../../actions';

import IndexView from '../components/IndexView';

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);
