import axios from "../utils/request";

export function Login(data) {
    return axios({
        method: 'get',
        url: `get_login`,
        data
    })
}