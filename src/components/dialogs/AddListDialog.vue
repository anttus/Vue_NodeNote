<template>
  <div data-app>
    <v-dialog
      v-model="dialog"
      :max-width="options.width"
      @keydown.esc="cancel"
      @keydown.enter="$emit('agree-add', listName)"
      v-bind:style="{ zIndex: options.zIndex }"
    >
      <v-card>
        <v-toolbar dark :color="options.color" dense flat>
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text v-show="!!message">{{ message }}</v-card-text>
        <v-flex xs12 class="listName" color="#f44336">
          <v-text-field autofocus v-model="listName" type="listName" label="List name" required></v-text-field>
          <v-alert
            class="warning"
            color="orange"
            :value="this.inputAlert"
            type="warning"
          >The name should be at least 2 characters long.</v-alert>
        </v-flex>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            flat="flat"
            @click.native="$emit('agree-add', listName)"
          >Add</v-btn>
          <v-btn color="grey" flat="flat" @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
const db = require("../../../api-server/db/dbController");

export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    listName: null,
    inputAlert: false,
    curUser: firebase.auth().currentUser,
    options: {
      color: "primary",
      width: 320,
      zIndex: 300
    }
  }),
  methods: {
    open(title, message, options) {
      this.listName = null;
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  },
};
</script>

<style scoped>
.listName {
  padding: 15px;
}
.warning {
  padding: 3px;
  font-size: 15px;
  margin: auto;
  border-radius: 5px;
}
</style>
