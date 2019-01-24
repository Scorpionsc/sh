import React from "react";
import PropTypes from "prop-types";
import SearchFilterScreen from "./SearchFilterScreen";
import RoundButton from "../../roundButton/RoundButton";

class ProductsScreen extends SearchFilterScreen {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return options = {
            title: 'Products',
            tabBarVisible: false,
            headerRight: (<RoundButton androidName="md-add" iosName="ios-add" onPress={() => params.handleHeaderButton()}/>),
        };
    };



    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({handleHeaderButton: () => this.addProduct()});
    }


    addProduct = () => {
        const {navigation} = this.props;
        navigation.navigate('ProductFabric');
    };

}

export default ProductsScreen;