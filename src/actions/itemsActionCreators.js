import { push } from 'react-router-redux'
export function loadPDFs(){
    return {
        type: 'REQUEST_DOCUMENTS'
    }
}
export function selectItem(item){
    return push(`/view/${item}`)
}
export function requestPage(id){
    return {
        type: 'REQUEST_PAGE',
        payload: {
            id: id
        }
    }
}
export function requestPDF(id){
    return {
        type: 'REQUEST_DOCUMENT',
        payload: {
            id: id
        }
    }
}
export function updatePageContents(id, svg){
    return {
        type: 'UPDATE_PAGE',
        payload: {
            id: id,
            svg: svg
        }
    }
}