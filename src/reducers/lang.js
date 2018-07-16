import Cookies from "js-cookie";
function localeDetection() {
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

// Express them in One Line of code 😄
 
const getUserLocale = () => (Cookies.get('userLanguage') || localeDetection())
const saveLocale = (localeCode) => Cookies.set('userLanguage', localeCode)

const lang = (state = getUserLocale(), action) => {
    switch (action.type) {
        case 'SWITCH_TO_CHINESE': {
            saveLocale('zh_CN')
            return 'zh_CN'
        }
        case 'SWITCH_TO_JAPANESE': {
            saveLocale('ja-JP')
            return 'ja-JP'
        }
        case 'SWITCH_TO_KOREAN': {
            saveLocale('ko-KR')
            return 'ko-KR'
        }
        case 'SWITCH_TO_ENGLISH': {
            saveLocale('en-US')
            return 'en-US'
        }
        default: return state
    }
}

export default lang