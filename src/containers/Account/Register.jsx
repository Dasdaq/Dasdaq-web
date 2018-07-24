import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { userLogin } from '../../actions'
import Register from "../../pages/Account/Register";

const mapStateToProps =
    ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
    saveUser: token => dispatch(userLogin(token)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)(Register)
)


