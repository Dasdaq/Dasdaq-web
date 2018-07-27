import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { compose } from "ramda";
import User from "../../pages/Account/User";
import withContent from "../../pages/ContentWrapper";

const mapStateToProps =
    ({ user }) => ({ user })


// export default withRouter(
//     connect(
//         mapStateToProps,
//         // mapDispatchToProps
//     )
//     (withContent(User))
// )
export default compose(
    withRouter,
    connect(mapStateToProps),
    withContent
)(User)