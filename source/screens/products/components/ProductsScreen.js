import React from 'react';
import SearchFilterScreen from '../../../share/searchFilter/components/SearchFilterScreen';
import RoundButton from '../../../share/roundButton/RoundButton';

class ProductsScreen extends SearchFilterScreen {

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;

      return {
        title: 'Products',
        tabBarVisible: false,
        headerRight: (<RoundButton androidName="md-add" iosName="ios-add" onPress={() => params.handleHeaderButton()}/>),
      };
    };


    componentDidMount() {
      const { navigation } = this.props;
      navigation.setParams({ handleHeaderButton: () => this.addProduct() });
    }


    addProduct = () => {
      const { navigation } = this.props;
      navigation.navigate('ProductFabric', {
        mode: 'add',
      });
    };

    onItemClick = (data) => {
      const { navigation, menuItems } = this.props;
      const product = { ...menuItems.find(item => item.id === data.id) };
      delete product.id;

      navigation.navigate('ProductFabric', {
        mode: 'view',
        product,
        productId: data.id,
      });
    };
}

export default ProductsScreen;
