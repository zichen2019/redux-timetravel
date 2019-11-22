function createStore(reducer, initState) {
    let state = initState;
    let listeners = [];

    // 分发action
    let dispatch = (action) => {
        if (typeof action !== 'object') throw Error('Expected the action to be a object')
        if (action.type === undefined) throw Error('The action.type is not defined')
        // 获取新的state
        state = reducer(state, action)
        listeners.forEach(listener => listener());
    }

    // 订阅数据更新
    let subscribe = (fn) => {
        if (typeof fn !== 'function') throw Error('Excepted the listener to be a function')
        listeners.push(fn);
        return () => listeners = listeners.filter(listener => fn !== listener);
    }

    //初始化state
    dispatch({ type: '@@redux/INIT' });

    // 获取store
    let getState = () => state && JSON.parse(JSON.stringify(state));

    return {
        getState,
        subscribe,
        dispatch
    }
}

// 合并reducer
// key是新状态的命名空间，值是reducer, 执行后会返回一个新的reducer
function combineReducers(reducers) {
    // 第二次调用reducer,内部会自动的把第一次的状态传给reducer
    return (state = {}, action) => {
        // reducer默认要返回一个状态
        let newState = {};
        for (let key in reducers) {
            // 默认recuder有两个参数：state和action
            let s = reducers[key](state[key], action)
            // console.log('s=', s)
            newState[key] = s;
            // console.log('newState=', newState)
        } 
        return newState;
    }
}

export {
    createStore,
    combineReducers
}