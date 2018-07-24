import { getter, setter, deleter } from "./cookieHandler";
// Express them in One Line of code 😄

const name = 'user'

// Currying setter, saveToken require another function parameter
const saveToken = setter(name)

const user = (state = getter({name}), action) => {
    switch (action.type) {
        case 'LOGIN': {
            const { token } = action
            saveToken(token)
            return token
        }
        case 'LOGOUT': {
            deleter(name)
            return null
        }
        default: return state
    }
}

export default user