import data from '../helpers';
export const ADD_COMMENT = 'ADD_COMMENT';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';

export const addComment = post => ({
  type: ADD_COMMENT,
  post,
});

export const toggleLike = post => ({
  type: TOGGLE_LIKE,
  post,
});

export const AddComment = (comment, isReply, commentId) => async dispatch => {
  // dispatch(addComment(post));
};

export const ToggleLike = (postId, isComment, commentId) => async dispatch => {
  // dispatch(toggleLike(post));
};

const initialState = {
  post: data.post,
  user : data.currentUser
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
    case TOGGLE_LIKE:
      return {
        ...state,
        post: action.post,
      };
    default:
      return { ...state };
  }
};
