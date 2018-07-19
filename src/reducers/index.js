import { combineReducers } from 'redux'
import lang from './lang'
import theme from './theme'
import crypto from './userCrypto'

export default combineReducers({
    lang,
    theme,
    crypto
})