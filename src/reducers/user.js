import { getter, setter, deleter } from "./cookieHandler";
// Express them in One Line of code 😄

const name = 'session_token'
const getUserToken = getter({ name })

// Currying setter, saveToken require another function parameter
const saveToken = setter(name)

const removeToken = deleter(name)

const token = (state = getUserToken, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const { token } = action
            saveToken(token)
            return token
        }
        case 'LOGOUT': {
            removeToken()
            return undefined
        }
        default: return state
    }
}

export default token