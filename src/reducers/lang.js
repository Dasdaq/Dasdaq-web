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

const lang = (state = languageDetection(), action) => {
    switch (action.type) {
        case 'SWITCH_TO_CHINESE':
            return 'zh_CN'
        case 'SWITCH_TO_JAPANESE':
            return 'ja-JP'
        case 'SWITCH_TO_KOREAN':
            return 'ko-KR'
        case 'SWITCH_TO_ENGLISH':
            return 'en-US'
        default:
            return state
    }
}

export default lang