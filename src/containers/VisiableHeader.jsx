import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setLanguage } from '../actions'
import Header from '../components/Header'



const mapStateToProps = state => ({
  lang: state.lang
})

const mapDispatchToProps = dispatch => ({
    setLanguage: code => dispatch(setLanguage(code))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
