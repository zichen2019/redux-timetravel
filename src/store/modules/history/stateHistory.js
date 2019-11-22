 const stateHistory = {
    past: [],
    future: [],
    present: undefined,

    gotoState(i) {
        const index = i * 1; // 避免传入值为string类型 3
        const allState = [
            ...this.past,
            this.present,
            ...this.future, //a -> b [1,2,3,4,5]
        ];
        this.present = allState[index];
        this.past = allState.slice(0, index);
        this.future = allState.slice(index + 1, allState.length);
    },

    getIndex() {
        return this.past.length; 
    },

    getTotalLen() {
        const allState = [
            ...this.past,
            this.present,
            ...this.future,
        ];

        return allState && allState.length;
    },

    // 查询是否有过去或者将来的状态
    hasPast() {
        return this.past && this.past.length > 0;
    },

    hasFuture() {
        return this.future && this.future.length > 0;
    },

    // 向前
    onNext() {
        this.gotoState(this.getIndex() + 1);
    },

    // 向后len - 1
    onPrev() {
        this.gotoState(this.getIndex() - 1);
    },

    // 将状态保存，并更新当前状态
    push(currentState) {
        console.log('this.present=', this.present)
        this.present && this.past.push(this.present);
        this.setPresent(currentState);
    },

    // 更新当前状态
    setPresent(state) {
        this.present = state;
    },
}

export default stateHistory;