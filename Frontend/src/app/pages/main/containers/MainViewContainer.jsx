import { connect } from 'react-redux';

import { navigateToPath } from '../../../actions';

import MainView from '../components/MainView';

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
  navigateToPath,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
