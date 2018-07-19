export const setLanguage = (locale_code) => ({
    type: locale_code
})

const defaultSetterAction = (type) => ({type})

export const setTheme = defaultSetterAction

export const setCrypto = defaultSetterAction