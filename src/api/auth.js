import axios from "axios";

axios.defaults.withCredentials = true;

const apiServer = `http://api.dasdaq.io`

const getAPIPath = (pathname) => `${apiServer}/${pathname}/`

export async function register({ username, password, inviter = '' }) {
    const path = getAPIPath('register')
    const result = await axios.post(path, {
        username, password, inviter
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    } else {
        return result
    }
}

export async function login({ username, password }) {
    const path = getAPIPath('login')
    const result = await axios.post(path, {
        username, password
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}

export function logout() {
    return axios.get(getAPIPath('logout'))
}

export async function getMyInfo() {
    const { data } = await axios.get(getAPIPath('get_my_info'))
    console.log(data)
    if (data.err_code) {
        return null
    } else {
        return data.user_info
    }
}

export async function loginByMetaMask({ signature }) {
    const path = getAPIPath('login')
    const result = await axios.post(path, {
        signature, "login_type":1
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}