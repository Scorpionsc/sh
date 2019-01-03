import React from 'react';
import {rootReducer} from "./source/store/rootReducer";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { createAppContainer } from "react-navigation";
import AppNavigator from './source/navigation/Navigation';


const AppContainer = createAppContainer(AppNavigator);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
