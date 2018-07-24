import intl from "react-intl-universal";

const i18n = (name) => intl.get(`navbar.${name}`)

export const menus = ({logined}) => ([
    {
        path: '/',
        icon: 'home',
        name: i18n('home')
    },
    {
        path: '/market',
        icon: 'area-chart',
        name: i18n('market')
    },
    {
        path: '/dapp',
        icon: 'appstore',
        name: i18n('app store')
    },
    {
        path: '/account/info',
        icon: 'user',
        name: i18n('my account'),
        float: 'right',
        isDisplay: logined
    },
    {
        path: '/account/login',
        name: intl.get('user.login.login'),
        float: 'right',
        isDisplay: !logined
    },
    {
        path: '/account/register',
        name: intl.get('user.register.register'),
        float: 'right',
        isDisplay: !logined
    }
])

const setMenuDefaultDisplay = menu => (menu.isDisplay === undefined ? Object.assign(menu, { isDisplay: true }) : menu)

export default (props) => 
    menus(props)
        .map(setMenuDefaultDisplay)
        .filter(menu => menu.isDisplay)

