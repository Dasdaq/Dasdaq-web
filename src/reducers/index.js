import { combineReducers } from 'redux'
import lang from './lang'
import theme from './theme'
import crypto from './userCrypto'
import user from './user'
import settingVisible from './settingVisible'

export default combineReducers({
    lang,
    theme,
    crypto,
    user,
    settingVisible
})