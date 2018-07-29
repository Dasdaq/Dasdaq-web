import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { userLogout } from '../../actions'
import Logout from "../../pages/Account/Logout";

const mapStateToProps =
    ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
    userLogout: token => dispatch(userLogout(token)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)(Logout)
    )