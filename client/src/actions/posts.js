import * as api from '../api';

// Action creators for posts
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};