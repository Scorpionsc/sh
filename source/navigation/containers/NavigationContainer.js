import { connect } from 'react-redux';
import Navigation from './../components/Navigation'

const putStateToProps = state => ({
    authorized: state.auth.authorized
});

export default connect(putStateToProps)(Navigation);
