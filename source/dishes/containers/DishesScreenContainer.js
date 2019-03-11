import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DishesScreen from '../components/DishesScreen';
import { removeDish } from '../../store/dishes/actions';

const mapStateToProps = (state) => {
  const { dishes } = state.dishesData;

  return ({
    menuItems: dishes ? Object.keys(dishes).map(key => ({
      ...state.dishesData.dishes[key],
      id: key,
    })) : [],
  });
};

const mapActionsToProps = dispatch => ({
  deleteItem: bindActionCreators(removeDish, dispatch),
});


export default connect(mapStateToProps, mapActionsToProps)(DishesScreen);
