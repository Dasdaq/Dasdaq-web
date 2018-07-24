import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import User from "../../pages/Account/User";

const mapStateToProps =
    ({ user }) => ({ user })


export default withRouter(
    connect(
        mapStateToProps,
        // mapDispatchToProps
    )(User)
)


