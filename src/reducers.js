export default function(state = {items: []}, action) {
    console.log(action);
    switch (action.type) {
        case 'COMPLETE_DOCUMENT':
            return Object.assign({}, state, action.payload)
        case 'COMPLETE_PAGE': 
            let document = state.document;
            document.current_page = action.payload.page.id;
            return Object.assign({}, state, {document: document}, action.payload)
        case 'COMPLETE_DOCUMENTS':
            return Object.assign({}, state, action.payload)
       
        default:
            return state;
    }
}