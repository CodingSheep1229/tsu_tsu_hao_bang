import { LOGIN } from "../constants/action-types";
const initialState = {
    user:{
        _id : '',
        name : '',
        email : '',
        token : ''
    }
};
function rootReducer(state = initialState, action) {
  if (action.type === LOGIN) {
    return Object.assign({}, state, {
        user: state.user = action.payload
      });
  }
  return state;
}
export default rootReducer;