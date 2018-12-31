import React from 'react';
import {rootReducer} from "./source/store/rootReducer";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import MainContainer from "./source/main/containers/MainContainer";
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainContainer />
            </Provider>
        );
    }
}
