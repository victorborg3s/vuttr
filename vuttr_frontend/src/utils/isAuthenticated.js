export const isAuthenticated = (state) => {
    return typeof(state.AuthReducer.userToken) !== 'undefined' && state.AuthReducer.userToken !== "";
}