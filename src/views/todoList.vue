<template>
  <div class="todo-list">
    <header>
      <p class="page-title">Redux 时间旅行</p>
      <input
        type="search"
        class="position-search"
        placeholder="添加ToDo"
        v-model="searchValue"
        @blur="onInput($event)"
      />
    </header>

    <section class="content">
      <p class="type-name">进行中</p>
      <ListItem v-for="item in todoList" :key="item.id" :itemData="item" />
      <p class="type-name">已完成</p>
      <ListItem v-for="item in doneList" :key="item.id" :itemData="item" />
    </section>

    <footer class="history-controller">
      <!-- <div class="progress">
        <div id="bar" ref="bar" class="bar">
          <div id="inner" class="inner" />
          <div id="out" :style="{width: MoveOffset + 'px'}" class="outer" />
          <div 
            id="dot" 
            ref="dot" 
            :style="{left: MoveOffset + 'px'}" 
            class="dot" 
            :class="{'ban-operate': !hasPast && !hasFuture }"
            />
        </div>
      </div>-->

      <div class="control-btns">
        <span class="prev-btn" :class="{'ban-operate': !hasPast }" @click="onPrev" />
        <span class="pending-btn" />
        <span class="next-btn" :class="{'ban-operate': !hasFuture }" @click="onNext" />
      </div>
    </footer>

    <toast 
      v-model="showToast" 
      type="text" 
      :time="2000" 
      position="bottom"
      @on-hide="toastHide">
      {{currentInfo}}
    </toast>
  </div>
</template>

<script>
import ListItem from "@/components/list-item";
import stateHistory from "@/store/modules/history/stateHistory";
import { Toast } from 'vux'
export default {
  name: "todoList",
  components: {
    ListItem,
    Toast
  },
  data() {
    return {
      searchValue: "",
      // currentDate: null,
      hasPast: false,
      hasFuture: false,
      MoveOffset: 0,
      currentIdx: null,
      currentInfo: "当前时间节点",
      showToast: false,
      barWidth: null,
      todoList: [],
      doneList: []
    };
  },
  // computed: {
  //   todoList: function() {
  //     console.log('this.$store.getState()1=', this.$store.getState().todoList)
  //     return this.$store.getState();
  //   }
  // },
  mounted() {
    let vm = this;
    console.log("this.$store=", vm.$store);
    var unsubscribe = vm.$store.subscribe(vm.onChange);
  },
  methods: {
    onChange() {
      let vm = this;
      console.log("this.$store subscribe=", this.$store.getState());
      let { todoList, currentDate } = vm.$store.getState();
      vm.todoList = todoList && todoList.tList;
      vm.doneList = todoList && todoList.dList;

      vm.currentInfo = `当前时间节点：${currentDate}`;
      vm.showToast = true;

      vm.hasPast = stateHistory.hasPast();
      vm.hasFuture = stateHistory.hasFuture();
    },

    onInput(e) {
      let vm = this;
      if (!vm.trimFun(vm.searchValue)) return;

      console.log(vm.searchValue);

      let newItem = {
        id: vm.createUUID(8),
        status: "todo",
        value: vm.searchValue
      };
      // vm.todoList = [newItem, ...vm.todoList];

      let { dispatch } = vm.$store;
      dispatch({
        type: "add",
        data: newItem
      });

      vm.searchValue = "";
      console.log("this.$store=", this.$store.getState());
    },

    onNext() {
      let vm = this;
      if (!vm.hasFuture) return;

      let { dispatch } = vm.$store;
      dispatch({
        type: "onNext"
      });
    },

    onPrev() {
      let vm = this;
      if (!vm.hasPast) return;

      let { dispatch } = vm.$store;
      dispatch({
        type: "onPrev"
      });
    },

    trimFun(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },

    createUUID(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join("");
    },

    toastHide() {
      let vm = this;
      vm.showToast = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-list {
  /* padding: 10px; */
  overflow: hidden;
}

.type-name {
  padding: 6px;
  color: #3cb6db;
  font-weight: 400;
  font-size: 15px;
  font-family: PingFangSC-Medium;
}

.page-title {
  height: 42px;
  line-height: 42px;
  text-align: center;
  background: #fff;
  font-weight: 500;
  font-size: 15px;
}

.position-search {
  display: block;
  background: #ffffff;
  font-size: 13px;
  border: none;
  width: calc(100vw - 50px);
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  padding: 0 5px 2px 0;
  margin: 10px auto 0;
  outline: none;
  text-indent: 10px;
}

header {
  background: #eee;
  padding-bottom: 10px;
}

.content {
  height: calc(100vh - 94px - 51px);
  overflow-y: scroll;
}

.history-controller {
  height: 50px;
  background: #fff;
  border-top: 1px solid #e1e1e1;
}

.progress {
  height: 1px;
}

.bar {
  box-sizing: border-box;
  position: relative;
}
.bar .inner {
  height: 1px;
  background-color: #e1e1e1;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.bar .outer {
  height: 1px;
  background-color: #3cb6db;
  width: 0%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
.bar .dot {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 3;
  background: #3cb6db;
}

.control-btns {
  height: calc(100% - 1px - 16px);
  padding: 8px 0;
  width: 75%;
  margin: 0 auto;
  display: flex;
}

.control-btns span {
  flex: 1;
  background-size: 20px 20px;
  background-position: center center;
  background-repeat: no-repeat;
}

.control-btns span.prev-btn {
  background-image: url(../assets/prev.png);
}

.control-btns span.pending-btn {
  background-image: url(../assets/icon-play.png);
}

.control-btns span.next-btn {
  background-image: url(../assets/next.png);
}

.ban-operate {
  opacity: 0.6;
}
</style>
