import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { userLogin } from '../../actions'
import Login from "../../pages/Account/Login";

const mapStateToProps =
    ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
    saveUser: token => dispatch(userLogin(token)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)(Login)
)


