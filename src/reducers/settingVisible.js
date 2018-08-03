
const settingVisible = (state = null, action) => {
    switch (action.type) {
        case 'setSettingVisible': {
            const { b } = action
            return b
        }
        default: return state
    }
}

export default settingVisible