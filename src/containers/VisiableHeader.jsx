import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setLanguage, setTheme } from '../actions'
import Header from '../components/Header'



const mapStateToProps = state => {
  const {lang, theme} = state
  return {lang, theme}
}

const mapDispatchToProps = dispatch => ({
    setLanguage: code => dispatch(setLanguage(code)),
    setTheme: theme => dispatch(setTheme(theme))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
