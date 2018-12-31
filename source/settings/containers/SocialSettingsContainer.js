import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../user/store/actions';
import SocialSettings from "../components/SocialSettings";

const mapStateToProps = state => ({
    user: state.userData.user,
});

const mapActionsToProps = dispatch => (
    {
        setUser: bindActionCreators( setUser, dispatch ),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(SocialSettings);
