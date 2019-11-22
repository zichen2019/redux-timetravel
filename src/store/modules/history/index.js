import stateHistory from './stateHistory'

const history = reducer => (state = stateHistory.present, action) => {
    console.log('action=', action);
    switch (action.type) {
        case 'onNext':
            stateHistory.onNext();
            break;
        case 'onPrev':
            stateHistory.onPrev();
            break;
        case 'onGoTo':
            stateHistory.gotoState(action.stateIndex);
            break;
        default:
            const newDate = new Date();
            const newState = reducer(state, action);
            newState.currentDate = newDate.toLocaleString();
            console.log('newState=', newState);
            // 每次dipatch(action)都会像将状态保存到stateHistory
            stateHistory.push(newState);
    }

    console.log('stateHistory=', JSON.parse(JSON.stringify(stateHistory)));
    return stateHistory.present; // 返回当前状态
}

export {
    history
};