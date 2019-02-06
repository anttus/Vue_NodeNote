<template>
  <div class="list-item" v-bind:class="{'is-complete':item.Completed}">
    <div class="item">
      <button alt="Set the item as done" v-on:click="setComplete" class="checkComplete">
        <font-awesome-icon icon="check"/>
      </button>
      {{item.Name}}
    </div>
    <button @click="$emit('delete-item', item.Item_id)" class="delete">
      <font-awesome-icon icon="times"/>
    </button>
  </div>
</template>

<script>
const db = require('../../api-server/db/dbController');

export default {
  name: "Item",
  props: ["item"],
  methods: {
    setComplete() {
      this.item.Completed = !this.item.Completed;
      let complete = 0;
      if (this.item.Completed) complete = 1;
      db.setItemStatus(this.item.Item_id, complete);
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
}
.is-complete {
  text-decoration: line-through;
  color: #a3a3a3;
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

