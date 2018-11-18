import React from 'react';
import {rootReducer} from "./source/store/rootReducer";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import DrawerNav from './source/components/drawerNav';
import NavigationContainer from "./source/navigation/containers/NavigationContainer";


const store = createStore(rootReducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer />
            </Provider>
        );
    }
}
