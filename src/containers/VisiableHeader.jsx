import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setLanguage, setTheme, setCrypto, setSettingVisible } from '../actions'
import Header from '../components/Header'



const mapStateToProps = state => {
  const {lang, theme, crypto, user, settingVisible} = state
  return {lang, theme, crypto, user, settingVisible}
}

const mapDispatchToProps = dispatch => ({
    setLanguage: code => dispatch(setLanguage(code)),
    setTheme: theme => dispatch(setTheme(theme)),
    setCrypto: code => dispatch(setCrypto(code)),
    setSettingVisible: b => dispatch(setSettingVisible(b))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
