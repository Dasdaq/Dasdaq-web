import Cookies from "js-cookie";

// Express them in One Line of code 😄
 
const getUserTheme = () => (Cookies.get('theme') || 'light')
const saveTheme = (themeCode) => Cookies.set('theme', themeCode)

const theme = (state = getUserTheme(), action) => {
    switch (action.type) {
        case 'SWITCH_TO_DARK': {
            saveTheme('dark')
            return 'dark'
        }
        case 'SWITCH_TO_LIGHT': {
            saveTheme('light')
            return 'light'
        }
        default: return state
    }
}

export default theme