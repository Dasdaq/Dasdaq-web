import axios from "axios";

axios.defaults.withCredentials = true;

async function register({ username, password, inviter = '' }) {
    const result = await axios.post('http://api.dasdaq.io/register/', {
        username, password, inviter
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        return new Error(err_msg)
    }
}

async function login({ username, password }) {
    const result = await axios.post('http://api.dasdaq.io/login/', {
        username, password
    })
    if (result.data.err_code !== 0) {
        const { err_msg } = result.data;
        return new Error(err_msg)
    }
}

async function logout() {
    axios.get('http://api.dasdaq.io/logout/')
}

export default {
    register,
    login,
    logout
} 