import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setLanguage, setTheme, setCrypto } from '../actions'
import Header from '../components/Header'



const mapStateToProps = state => {
  const {lang, theme, crypto, user} = state
  return {lang, theme, crypto, user}
}

const mapDispatchToProps = dispatch => ({
    setLanguage: code => dispatch(setLanguage(code)),
    setTheme: theme => dispatch(setTheme(theme)),
    setCrypto: code => dispatch(setCrypto(code))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
