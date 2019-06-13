<template>
  <div class="list-item" v-bind:class="{'is-complete':item.Completed}">
    <button alt="Set the item as done" v-on:click="setComplete" class="checkComplete">
      <font-awesome-icon v-if="!item.Completed" icon="check"/>
      <font-awesome-icon v-else icon="chevron-up"/>
    </button>
    <div class="item">{{item.Name}}</div>
    <button @click="$emit('delete-item', item.Item_id)" class="delete">
      <font-awesome-icon icon="times"/>
    </button>
  </div>
</template>

<script>
const db = require("../../api-server/db/dbController");

export default {
  name: "Item",
  props: ["item"],
  methods: {
    setComplete() {
      if (this.item.Completed === 0) this.item.Completed = 1;
      else this.item.Completed = 0;
      db.setItemStatus(this.item.Item_id, this.item.Completed);
    }
  }
};
</script>

<style scoped>
.list-item {
  margin-top: 5px;
  border: 1px solid #aaa;
  max-width: 900px;
  width: 90%;
  display: flex;
}
.item {
  flex: 10;
  overflow-wrap: break-word;
  text-transform: capitalize;
}
.is-complete {
  text-decoration: line-through;
  color: #a3a3a3;
}
.is-complete .checkComplete {
  opacity: 0.4;
}
.delete {
  font-size: 15px;
  background: rgb(184, 50, 50);
  color: #fff;
  border: none;
  padding: 12px;
  width: 39px;
  cursor: pointer;
  float: right;
  transition: 0.7s;
}
.delete:hover {
  opacity: 0.8;
}
.checkComplete {
  background: rgb(53, 161, 53);
  color: #fff;
  font-size: 15px;
  border: none;
  padding: 12px;
  margin-right: 10px;
  transition: 0.7s;
}
.checkComplete:focus {
  outline: 0;
}
.checkComplete:hover {
  opacity: 0.8;
}
</style>

