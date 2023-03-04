export const loginCheck = (username, password) => {
    return {
        type: 'LOGIN_CHECK',
        payload: {
            username: username,
            password: password
        }
    }
}