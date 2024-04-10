import axios from 'axios';
import { BASEURL } from './constant';

const httpClient = axios.create({
    baseURL: `${BASEURL}`,
});

export function setDefaultHeader(header, value) {
    httpClient.defaults.headers.common[header] = value
}
export async function apiCall(method, url, data, header = { 'Content-Type': 'application/json' }) {
    try {
        const res = await httpClient({
            method,
            url,
            data: data,
            headers: header,
            withCredentials: false
        })
        //  console.log('response: ',res);
        return res;
    } catch (error) {
        if (error.response) {
            console.log('Error request : ', error.request);
            if (error.response.status === 401) {
                return error.response;
            }
        } else if (error.request) {
            console.log('Error request : ', error.request);
        } else {
            console.log('Error message : ', error.message);
        }
        return error
    }
}
