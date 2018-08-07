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

export async function login({ username, password, login_type }) {
    const path = getAPIPath('login')
    const result = await axios.post(path, {
        username, password, login_type
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
        signature, "login_type": 1
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}

export async function loginByScatter({ signature }) {
    const path = getAPIPath('login')
    const result = await axios.post(path, {
        signature, "login_type": 2
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}

export async function update_profile(data) {
    const path = getAPIPath('update_profile')
    const result = await axios.post(path, data)
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}

export async function bindMetaMask({ eth_address, metamask_signature }) {
    return update_profile({ eth_address, metamask_signature })
}

export async function bindScatter({ eos_address, scatter_signature }) {
    return update_profile({ eos_address, scatter_signature })
}

export async function changePassword({ old_password, new_password }) {
    const path = getAPIPath('change_password')
    const result = await axios.post(path, {
        old_password, new_password
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        throw new Error(err_msg)
    }
    return result
}