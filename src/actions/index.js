export const setLanguage = (locale_code) => ({
    type: locale_code
})

export const userLogin = (token) => ({
    type: "LOGIN",
    token
})

export const userLogout = () => ({ type: "LOGOUT" })

const defaultSetterAction = (type) => ({ type })

export const setTheme = defaultSetterAction

export const setCrypto = defaultSetterAction
