import * as postsAPI from '../api/posts';
import { 
    createPromiseThunk, 
    createPromiseThunkById, 
    handleAsyncActions, 
    handleAsyncActionsById, 
    reducerUtils,
    createPromiseSaga,
    createPromiseSagaById 
} from '../lib/asyncUtils';
import { call, put, takeEvery,getContext,select } from 'redux-saga/effects'
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const CLEAR_POST = 'CLEAR_POST';
const GO_TO_HOME = 'GO_TO_HOME';
const PRINT_STATE = 'PRINT_STATE';
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST,postsAPI.getPostById);

export const getPosts = () =>({type: GET_POSTS});
export const getPost = (id) =>({type: GET_POST, payload: id, meta: id});
export const printState = () => ({type: PRINT_STATE});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

function* goToHomeSaga(){
    const history = yield getContext('history');
    history.push('/');
}

function* printStateSaga(){
    const state = yield select(state => state.posts);
    console.log(state);
}

// function* getPostsSaga() {
//     try{
//         const posts = yield call(postsAPI.getPosts);
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             payload: posts
//         })
//     }catch(e){
//         yield put({
//             type: GET_POSTS_ERROR,
//             payload: e,
//             error: true,
//         });
//     }
// }

// function* getPostSaga(action){
//     const id = action.payload;
//     try{
//         const post = yield call(postsAPI.getPostById, id);
//         yield put({
//             type: GET_POST_SUCCESS,
//             payload: post,
//             meta: id
//         })
//     }catch(e){
//         yield put({
//             type: GET_POST_ERROR,
//             payload: e,
//             error: true,
//             meta: id,
//         })
//     }
// }

export function* postsSaga(){
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(GO_TO_HOME, goToHomeSaga);
    yield takeEvery(PRINT_STATE, printStateSaga);
}

// export const goToHome = () => (dispatch,getState, {history}) => {
//     history.push('/');
// };
export const goToHome = () => ({type: GO_TO_HOME});

// 그전에 getPost 직접 작성한것
// id => async dispatch => {
//     dispatch({type: GET_POST, meta: id});
//     try{
//         const payload = await postsAPI.getPostById(id);
//         dispatch({type: GET_POST_SUCCESS, payload, meta: id})
//     }catch(e){
//         dispatch({
//             type: GET_POST_ERROR,
//             playload: e,
//             error: true,
//             meta: id
//         });

//     }
// }
export const clearPost = () => ({type: CLEAR_POST});

// export const getPosts = () => async dispatch => {
//     //요청이 시작됨
//     dispatch({
//         type: GET_POSTS
//     });
//     //API를 호출
//     try {
//         const posts = await postsAPI.getPosts();
//         // 성공했을 때
//         dispatch({
//             type: GET_POSTS_SUCCESS,
//             posts
//         });
//     } catch (e) {
//         // 실패했을 때
//         dispatch({
//             type: GET_POSTS_ERROR,
//             error: e
//         });
//     }

// }

// export const getPost = (id) => async dispatch => {
//     //요청이 시작됨
//     dispatch({
//         type: GET_POST
//     });
//     //API를 호출
//     try {
//         const post = await postsAPI.getPostById(id);
//         // 성공했을 때
//         dispatch({
//             type: GET_POST_SUCCESS,
//             post
//         });
//     } catch (e) {
//         // 실패했을 때
//         dispatch({
//             type: GET_POST_ERROR,
//             error: e
//         });
//     }
// }

const initialState = {
    posts: reducerUtils.initial(),
    post: {}
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST,'post', true);
// 그전에 작성했던 getPostReducer
// (state,action) => {
//     const id = action.meta;
//     switch(action.type){
//         case GET_POST:
//             return {
//                 ...state,
//                 post: {
//                     ...state.post,
//                     [id]: reducerUtils.loading(state.post[id] && state.post[id].data)
//                 }
//             }
//         case GET_POST_SUCCESS:
//             return {
//                 ...state,
//                 post: {
//                     ...state.post,
//                     [id]: reducerUtils.success(action.payload)
//                 }
//             }
//         case GET_POST_ERROR:
//             return {
//                 ...state,
//                 post: {
//                     ...state.post,
//                     [id]: reducerUtils.error(action.payload)
//                 }
//             }
//         default:
//             return state;
//     }
// }

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return getPostsReducer(state,action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return getPostReducer(state,action);
        case CLEAR_POST:
            return {
                ...state,
                post: reducerUtils.initial(),
            }
        default:
            return state;
    }
}