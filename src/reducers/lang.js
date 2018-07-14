const lang = (state = 'en-US', action) => {
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