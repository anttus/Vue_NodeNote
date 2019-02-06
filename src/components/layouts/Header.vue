<template>
  <header class="header">
    <AddListDialog ref="addList" v-on:agree-add="agree"/>
    <h1>NodeNote</h1>
    <div id="nav">
      <SideBar class="menuBtn" ref="SideBar" v-on:items-list="itemsList" v-on:cur-list="emitCurList"/>
      <button class="menuBtn" v-on:click="$emit('add-list-dialog')">
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
  </header>
</template>

<script>
import SideBar from "../SideBar";
import AddListDialog from "../dialogs/AddListDialog";

export default {
  name: "Header",
  components: {
    SideBar,
    AddListDialog
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    itemsList(items) {
      this.$emit("items-list", items);
    },
    // Chains to SideBar
    addItem(newItem) {
      this.$refs.SideBar.addItem(newItem);
    },
    // Chains to SideBar
    deleteItem(listId, itemId, itemName) {
      this.$refs.SideBar.deleteItem(listId, itemId, itemName);
    },
    // Agree the list addition from the child AddListDialog
    agree(listName) {
      if (this.validateListName(listName)) {
        this.$refs.SideBar.addList(listName);
        this.$refs.addList.resolve(true);
        this.$refs.addList.dialog = false;
      }
    },
    validateListName(listName) {
      if (listName && listName.length > 1) return true;
      else {
        this.$refs.addList.inputAlert = true;
        setTimeout(() => {
          this.$refs.addList.inputAlert = false;
        }, 1000);
      }
    },
    emitCurList(list) {
      this.$emit('cur-list', list);
    }
  },
  mounted() {
    this.$root.$addList = this.$refs.addList;
  }
};
</script>

<style scoped>
.header {
  font-family: "Slabo 27px", serif;
  background: #333;
  color: #fff;
  text-align: left;
  padding: 10px;
  padding-left: 25px;
  display: flex;
}

.header a {
  color: #fff;
  text-decoration: none;
}

h1 {
  padding: 0;
  flex: 10;
}

.menuBtn {
  float: right;
  margin-right: 40px;
  flex: 2;
  border: none;
  background-color: #333;
  color: #f4f4f4;
  font-size: 27px;
  cursor: pointer;
}

.menuBtn:hover {
  transition: 0.5s;
  color: #f4f4f4ab;
}
</style>


