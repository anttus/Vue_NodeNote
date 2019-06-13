<template>
  <div>
    <Header
      ref="Header"
      v-on:add-list-dialog="addListDialog"
      v-on:items-list="renderItems"
      v-on:cur-list="setCurList"
    />
    <div v-if="currentList">
      <div class="homeHeader">
        <h1 class="currentList" v-bind:currentList="currentList">{{currentList.Name}}</h1>
        <button v-on:click="isHidden = !isHidden" class="showHideSharedWith">Shared with: &nbsp;
          <div v-if="!isHidden">
            <font-awesome-icon icon="chevron-up"/>
          </div>
          <div v-else>
            <font-awesome-icon icon="chevron-down"/>
          </div>
        </button>
        <div v-if="!isHidden">
          <p class="sharedTo" v-bind:key="email" v-for="email in listSharedTo">{{email}}</p>
        </div>
      </div>
      <AddItem v-on:add-item="addItem"/>
      <Items v-bind:items="items" v-on:delete-item="deleteItem"/>
    </div>
    <div v-else class="noListsDiv">Start by pressing the "+" button!</div>
  </div>
</template>

<script>
import Items from "../components/Items";
import AddItem from "../components/AddItem";
import Header from "../components/layouts/Header";
import firebase from "firebase/app";
import "firebase/auth";
const db = require("../../api-server/db/dbController");

export default {
  name: "Home",
  components: {
    Items,
    AddItem,
    Header
  },
  data() {
    return {
      items: [],
      user: firebase.auth().currentUser,
      currentList: JSON.parse(localStorage.getItem("curList")),
      listSharedTo: [],
      isHidden: true,
      listStorage: window.localStorage
    };
  },
  methods: {
    deleteItem(id) {
      let itemToDel = this.items.filter(el => el.Item_id === id)[0];
      this.items = this.items.filter(item => item.Item_id !== id);
      this.$refs.Header.deleteItem(
        itemToDel.List_id,
        itemToDel.Item_id,
        itemToDel.Name
      );
    },
    addItem(newItem) {
      this.items = [...this.items, newItem.Name];
      this.$refs.Header.addItem(newItem); // Chains the function call to SideBar
    },
    addListDialog() {
      this.$root.$addList.open("Add list", "", {
        color: "gray"
      });
    },
    renderItems(items) {
      this.items = [];
      items.forEach(element => {
        this.items.push(element);
      });
    },
    setCurList(list) {
      this.currentList = list;
      this.listStorage.setItem("curList", JSON.stringify(list));
      this.getListSharedTo();
    },
    getListSharedTo() {
      this.listSharedTo = [];
      db.getSharedToUsers(this.currentList.List_id).then(res => {
        res.data.forEach(v => {
          this.listSharedTo.push(v["email"]);
        });
      });
    }
  },
  created() {
    if(this.user) db.addUser(this.user.uid, this.user.email);
  }
};
</script>

<!-- Global -->
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  align-content: center;
  margin: auto;
  font-family: "Raleway", sans-serif;
}
body {
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
.currentList {
  text-align: center;
  margin-top: 20px;
  text-transform: capitalize;
}
.homeHeader {
  text-align: center;
}
.sharedTo {
  margin: 0;
}
.showHideSharedWith {
  display: flex;
}
.showHideSharedWith:focus {
  outline: 0;
}
.noListsDiv {
  text-align: center;
  font-size: 25px;
  color: #666;
  margin-top: 50%;
}
</style>