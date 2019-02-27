import {
  POST_MATCH_FAILURE,
  POST_MATCH_REQUEST,
  POST_MATCH_SUCCESS,
  PAGE_INCREMENT
} from '../actions/matches';
const initialMatchState = { page: 1, matches: null, isLoading: false };

function matches(state = initialMatchState, action) {
  switch (action.type) {
  case POST_MATCH_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    }
  case POST_MATCH_REQUEST:
    return {
      ...state,
      hasErrored: false,
      isLoading: action.isLoading,
    }
  case POST_MATCH_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      matches: action.matches,
    }
  case PAGE_INCREMENT:
    return {
      ...state,
      page: state.page+1
    }
  default:
    return state;
  }
}

export default matches;