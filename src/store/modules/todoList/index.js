const defaultState = {
    tList: [],
    dList: []
}

export default (state = defaultState, action) => {
    let tList = null;
    let dList = null;
    switch (action.type) {
        case 'add':
            tList = [
                action.data,
                ...state.tList
            ];
            return {
                ...state,
                tList
            }
        case 'todo':
            tList = [
                ...state.tList,
                action.data,
            ];
            dList = state.dList.filter(item => item.id !== action.data.id);
            return {
                ...state,
                tList,
                dList
            };
        case 'done':
            dList = [
                action.data,
                ...state.dList
            ];
            tList = state.tList.filter(item => item.id !== action.data.id);
            return {
                ...state,
                tList,
                dList
            };
        case 'delToDo': 
            tList = state.tList.filter(item => item.id !== action.data.id);
            return {
                ...state,
                tList
            };
        case 'delDone': 
            dList = state.dList.filter(item => item.id !== action.data.id);
            return {
                ...state,
                dList
            };
        default: 
            return state;
    }
}