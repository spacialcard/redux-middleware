import * as postsAPI from '../api/posts';
import { createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST,postsAPI.getPostById);

export const goToHome = () => (dispatch,getState, {history}) => {
    history.push('/');
};

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