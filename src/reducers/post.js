import data from '../helpers';
export const ADD_COMMENT = 'ADD_COMMENT';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const MODIFY_COMMENT = 'MODIFY_COMMENT';

export const addComment = post => ({
  type: ADD_COMMENT,
  post,
});

export const toggleLike = post => ({
  type: TOGGLE_LIKE,
  post,
});

export const modifyComment = post => ({
  type: MODIFY_COMMENT,
  post,
});

export const AddComment = (post) => async dispatch => {
  dispatch(addComment(post));
};

export const ToggleLike = (post) => async dispatch => {
  dispatch(toggleLike(post));
};

export const ModifyComment = (post) => async dispatch => {
  dispatch(modifyComment(post));
};

const initialState = {
  post: data.post,
  user : data.currentUser
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
    case MODIFY_COMMENT:
    case TOGGLE_LIKE:
      return {
        ...state,
        post: action.post,
      };
    default:
      return { ...state };
  }
};
