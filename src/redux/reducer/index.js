
let initState = {
    
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_CHECK': {
            return {
                ...state,
                loginPage:{
                    ...state.loginPage,
                    passFlag: (action.payload.username === state.loginPage.username 
                        && action.payload.password === state.loginPage.password),
                    wrongFlage: !(action.payload.username === state.loginPage.username 
                        && action.payload.password === state.loginPage.password)
                }
            }
        }
        default: return state
    }

}

export default reducer;