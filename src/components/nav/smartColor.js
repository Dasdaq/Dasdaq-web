function smartNavbarColor({ location, theme }) {
    const isHomePage = location.pathname === '/'
    console.info(`${location.pathname} isHomePage: ${isHomePage}`)
    const navbarThemeColor = theme === 'light' ? "#FFF" : "#000"
    const isTransparent = isHomePage === true && theme !== 'light'
    const headerBackgroundColor = isTransparent ? "rgba(0, 0, 0, 0.47)" : navbarThemeColor
    const otherColor = isTransparent ? "#0000006e" : headerBackgroundColor
    return { headerBackgroundColor, otherColor }
}

export default smartNavbarColor