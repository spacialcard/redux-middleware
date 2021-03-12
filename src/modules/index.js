import {combineReducers} from 'redux';
import counter, { counterSage } from './counter';
import posts from './posts';
import { all } from 'redux-saga/effects';


const rootReducer = combineReducers({counter ,posts});
export function* rootSaga(){
    yield all([counterSage()]);
}

export default rootReducer;