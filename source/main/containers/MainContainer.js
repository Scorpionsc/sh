import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../../dataStorage/store/actions';
import Main from './../components/Main'

const mapStateToProps = state => {
    console.log(state);

    return ({
        userUpdatedAt: state.userData.user ? state.userData.user.updatedAt : null,
        patient: state.userData.user ? state.userData.user.patient : null,
    })
};


const mapActionsToProps = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
