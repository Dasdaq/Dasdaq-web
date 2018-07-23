import Cookies from "js-cookie";

export const getter = ({ name, defaultValue = null }) => (Cookies.get(name) || defaultValue)

export const setter = (name) => (data) => Cookies.set(name, data)

export const deleter = (name) => Cookies.remove(name)