<template>
  <div class="list-item" :class="itemData.status">
    <span class="check-box-btn" @click="handleStatus(itemData)" />
    <span class="item-cont">{{ itemData.value }}</span>
    <span class="del-btn" @click="handleDel(itemData)" />
  </div>
</template>

<script>
export default {
  name: "list-item",
  props: ["itemData"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    handleStatus(item) {
      let vm = this;
      let { dispatch } = vm.$store;
      switch (item.status) {
        case "todo":
          item.status = "done";
          break;
        case "done":
          item.status = "todo";
          break;
      }

      dispatch({
        type: item.status,
        data: item
      });
    },

    handleDel(item) {
      let vm = this;
      let { dispatch } = vm.$store;
      switch (item.status) {
        case "todo":
          dispatch({
            type: "delToDo",
            data: item
          });
          break;
        case "done":
          dispatch({
            type: "delDone",
            data: item
          });
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-item {
  height: 39px;
  line-height: 39px;
  /* border-radius: 5px; */
  background: #fff;
  display: flex;
  font-size: 14px;
  color: #333;
  font-family: PingFangSC-Regular;
  margin-bottom: 1px;
}

.done {
  opacity: 0.6;
}

/* .list-item::before {
  flex: 0 0 10px;
  content: "";
  display: inline-block;
  background: #3cb6db;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
} */

.check-box-btn {
  /* display: inline-block; */
  position: relative;
  flex: 0 0 13px;
  margin: 12px;
  height: 13px;
  width: 13px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.done .check-box-btn {
  background: #3cb6db;
  border-color: #3cb6db;
}
.done .check-box-btn::after {
  display: inline-block;
  content: "";
  position: absolute;
  left: 2px;
  top: 3px;
  width: 50%;
  height: 25%;
  border: 2px solid #fff;
  border-radius: 1px;
  border-top: none;
  border-right: none;
  background: transparent;
  transform: rotate(-45deg);
}

.item-cont {
  flex: 1;
}

.del-btn {
  flex: 0 0 13px;
  margin: 12px;
  height: 15px;
  width: 15px;
  background: url(../assets/delete.png) no-repeat;
  background-size: contain;
}
</style>
