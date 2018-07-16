import Cookies from "js-cookie";
function languageDetection() {
    const langs = window.navigator.languages
    const listOfLangs = langs.map(obj => obj.slice(0, 2))
    for (let lang of listOfLangs) {
        switch (lang) {
            case 'zh': return 'zh_CN'
            case 'ja': return 'ja-JP'
            case 'ko': return 'ko-KR'
            default: return 'en-US'
        }
    }
}

const userLanguageDetection = () => (Cookies.get('userLanguage') || languageDetection())


const setLanguageCookie = (localeCode) => Cookies.set('userLanguage', localeCode)

const lang = (state = userLanguageDetection(), action) => {
    switch (action.type) {
        case 'SWITCH_TO_CHINESE': {
            setLanguageCookie('zh_CN')
            return 'zh_CN'
        }
        case 'SWITCH_TO_JAPANESE': {
            setLanguageCookie('ja-JP')
            return 'ja-JP'
        }
        case 'SWITCH_TO_KOREAN': {
            setLanguageCookie('ko-KR')
            return 'ko-KR'
        }
        case 'SWITCH_TO_ENGLISH': {
            setLanguageCookie('en-US')
            return 'en-US'
        }
        default: return state
    }
}

export default lang