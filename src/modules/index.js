import {combineReducers} from 'redux';
import counter, { counterSage } from './counter';
import posts, { postsSaga } from './posts';
import { all } from 'redux-saga/effects';


const rootReducer = combineReducers({counter ,posts});
export function* rootSaga(){
    yield all([counterSage(),postsSaga()]);
}

export default rootReducer;