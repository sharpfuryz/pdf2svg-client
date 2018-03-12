import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import pako from 'pako';
// Extract API for production
const host = "http://localhost:8080";

const decrypt = (json) => {
    var Buffer = require('buffer/').Buffer;
    let bindata = json.bindata;
    let buf = Buffer.from(bindata, 'base64');
    try {
        let result = pako.inflate(buf);
        let string = Buffer(result).toString();
        return JSON.parse(string);
    } catch (err) {
        console.log(err);
    }
}

function requestItemsFromServer(){
    return axios.get(`${host}/api/v1/pdf.json`)
}
function requestDocumentFromServer(id){
    return axios.get(`${host}/api/v1/pdf/${id}`)
}
function requestPageFromServer(id){
    return axios.get(`${host}/api/v1/page/${id}`)
}
function pushPageToServer(payload) {
    return axios({
        method: 'put',
        url:`${host}/api/v1/page/${payload.id}`,
        data: {
          svg: payload.svg
        }
    });
}
const API = {
    fetchItems: requestItemsFromServer,
    fetchDocument: requestDocumentFromServer,
    fetchPage: requestPageFromServer,
    updatePage: pushPageToServer
}
// 
function* fetchDocuments(action){
    let resp = yield call(API.fetchItems);
    const items = resp.data;
    yield put({ type: 'COMPLETE_DOCUMENTS', payload: { items: items } } );
};
function* fetchDocument(action){
    let resp = yield call(API.fetchDocument, action.payload.id);
    let document = decrypt(resp.data);
    yield put({ type: 'COMPLETE_DOCUMENT', payload: { document: document } } );
    let page_id = document.pages[0];
    yield put({ type: 'REQUEST_PAGE', payload: { id: page_id }});
}
function* fetchPage(action){
    let resp = yield call(API.fetchPage, action.payload.id);
    let page = decrypt(resp.data);
    yield put({ type: 'COMPLETE_PAGE', payload: { page: page } } );
}
function* updatePage(action){
    let resp = yield call(API.updatePage, action.payload);
    let data = resp.data;
    yield put({ type: 'COMPLETE_UPDATE_PAGE', payload: { id: data.id }});
}
export default function* itemsSaga() {
    yield takeLatest("REQUEST_DOCUMENTS", fetchDocuments);
    yield takeLatest("REQUEST_DOCUMENT", fetchDocument);
    yield takeLatest("REQUEST_PAGE", fetchPage);
    yield takeLatest("UPDATE_PAGE", updatePage);
 }