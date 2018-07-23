import intl from "react-intl-universal";

const i18n = (name) => intl.get(`navbar.${name}`)

export const menus = () => ([
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
        path: '/account',
        icon: 'user',
        name: i18n('my account'),
        float: 'right'
    },
    {
        path: '/account/login',
        name: intl.get('user.login.login'),
        float: 'right'
    },
    {
        path: '/account/register',
        name: intl.get('user.register.register'),
        float: 'right'
    }
])