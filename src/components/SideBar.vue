<template>
  <div>
    <DeleteDialog ref="delete"/>
    <ShareDialog ref="share" v-on:agree-share="shareList"/>
    <Slide right>
      <div class="loggedInUser">{{curUser.email}}</div>
      <div v-bind:key="list.id" v-for="list in userLists">
        <div class="listElement" href="#">
          <span class="iconBtn shareBtn" @click="openShareDialog(list)">
            <font-awesome-icon icon="share"/>
          </span>
          <span class="listName" @click="openList(list)">{{list.Name}}</span>
          <span v-bind:list="list" class="iconBtn deleteBtn" @click="openDeleteDialog(list)">
            <font-awesome-icon icon="trash"/>
          </span>
        </div>
      </div>
      <button @click="signOut" class="signOutBtn">
        <font-awesome-icon icon="sign-out-alt"/>&nbsp; Sign out
      </button>
    </Slide>
  </div>
</template>

<script>
import Slide from "./SideMenu/slide";
import DeleteDialog from "./dialogs/DeleteDialog";
import ShareDialog from "./dialogs/ShareDialog";
import firebase from "firebase/app";
import "firebase/auth";
const db = require("../../api-server/db/dbController");

export default {
  data() {
    return {
      items: [],
      userLists: [],
      listIdToShare: null,
      curUser: firebase.auth().currentUser,
      currentList: JSON.parse(localStorage.getItem("curList"))
    };
  },
  components: {
    Slide,
    DeleteDialog,
    ShareDialog
  },
  methods: {
    openDeleteDialog(list) {
      this.$root.$delete
        .open(
          "List removal",
          'Are you sure you want to delete the list "' + list.Name + '"?',
          {
            color: "gray"
          }
        )
        .then(value => {
          if (value) {
            db.deleteList(list.List_id).then(() => {
              if (
                list.List_id ===
                JSON.parse(localStorage.getItem("curList")).List_id
              ) {
                if (this.userLists.length === 1)
                  localStorage.removeItem("curList");
                else
                  localStorage.setItem(
                    "curList",
                    JSON.stringify(this.userLists[0])
                  );
              }
              this.getUserLists();
            });
          }
        });
    },
    openShareDialog(list) {
      this.listIdToShare = list.List_id;
      this.$root.$share.open(
        "List sharing",
        'Who do you want to share the list "' + list.Name + '" with?',
        {
          color: "gray"
        }
      );
    },
    openList(list) {
      this.currentList = list;
      this.loadItems(this.currentList.List_id);
    },
    openListByName(listName) {
      db.getListIdByName(listName, this.curUser.uid).then(res => {
        // return (this.currentList = this.userLists.find(
        //   list => list.List_id === res.data[0]["List_id"]
        // ));
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
      localStorage.removeItem("curList");
    },
    getUserLists() {
      db.getListsOfUser(this.curUser.uid).then(res => {
        this.userLists = res.data;
        if (this.userLists.length != 0) {
          if (localStorage.getItem("curList") === null) {
            this.currentList = this.userLists[0];
          } else this.currentList = JSON.parse(localStorage.getItem("curList"));
          this.loadItems(this.currentList.List_id);
        }
      });
    },
    // Used from Header, that gets the list name from AddListDialog
    addList(listName) {
      db.addList(this.curUser.uid, listName).then(() => {
        this.getUserLists();
      });
    },
    addItem(newItem) {
      if (this.currentList.List_id) {
        db.addItem(this.currentList.List_id, newItem.Name).then(() => {
          this.loadItems(this.currentList.List_id);
        });
      }
    },
    loadItems(listId) {
      db.getItems(listId)
        .then(value => {
          this.items.push(value.data);
        })
        .then(() => {
          this.$emit("cur-list", this.currentList);
          this.$emit("items-list", this.items[0]);
          this.items = [];
        });
    },
    deleteItem(listId, itemId, itemName) {
      if (listId && itemId && itemName) db.deleteItem(listId, itemId, itemName);
    },
    shareList(email) {
      if (this.$refs.share.alertEmail(email)) {
        db.checkUserExists(email).then(result => {
          result = result.data[0]["COUNT(*)"];
          if (result === 1) {
            db.shareList(email, this.listIdToShare);
            this.$refs.share.resolve(true);
            this.$refs.share.dialog = false;
          } else this.$refs.share.alertShare(email);
        });
      }
    }
  },
  mounted() {
    this.getUserLists();
    this.$root.$delete = this.$refs.delete;
    this.$root.$share = this.$refs.share;
  }
};
</script>

<style scoped>
.iconBtn {
  padding: 15px;
}
.shareBtn:hover {
  color: rgb(63, 173, 91);
  transition: 0.5s;
}
.deleteBtn:hover {
  color: rgb(187, 67, 63);
  transition: 0.5s;
}
.listName:hover {
  color: rgb(240, 202, 77);
  transition: 0.5s;
}
.activeList:active {
  color: rgb(240, 202, 77);
}
.listElement {
  padding: 0;
  padding-left: 0;
  align-content: left;
  margin: 0;
  color: #f4f4f4;
}
.signOutBtn {
  color: #f4f4f4;
  font-weight: bold;
  position: fixed;
  bottom: 0px;
  text-align: left !important;
  background-color: #ff6961;
  width: 300px;
  display: block;
  padding-left: 30px;
}
.signOutBtn:hover {
  opacity: 0.8;
  transition: 0.5s;
}
.loggedInUser {
  padding: 0;
  padding-left: 30px;
  margin-bottom: 10px;
  color: #f4f4f4b2;
  font-size: 16px;
}
</style>
