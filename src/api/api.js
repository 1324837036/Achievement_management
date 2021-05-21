// appfront/src/api/api.js
import axiosInstance from './index'

const axios = axiosInstance

export const test = () => { var url = 'http://127.0.0.1:8000/api/test/'; return axios.get(url) }
export const test2 = () => { var url = '/apis/getScholarByName/?scholarName=王德庆'; return axios.get(url) }

// export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:8000/api/books/`, {'name': bookName, 'author': bookAuthor})}

export const get_Wait_persons = () => {
    var url = 'http://127.0.0.1:8000/api/get_Wait_persons/';
    return axios.get(url);
}

export const get_Wait_persons_messages = (scholarName, orgName) => {
    var url = '/v1/scholars/getScholarByName/?scholarName=' + scholarName + '&orgName=' + orgName;
    return axios.get(url);
}

