import store from "../redux-js/store/index";
import { loginUser } from "../redux-js/actions/index";
window.store = store;
window.loginUser = loginUser;
console.log(store)
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch(loginUser({
    _id : 'hhhhh',
    name : '',
    email : '',
    token : '',
    projects: []
}))
store.getState()
// store.subscribe(() => console.log('Look ma, Redux!!'))