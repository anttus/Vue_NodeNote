<template>
  <div data-app>
    <v-dialog
      v-model="dialog"
      :max-width="options.width"
      @keydown.esc="cancel"
      @keydown.enter="$emit('agree-share', email)"
      v-bind:style="{ zIndex: options.zIndex }"
    >
      <v-card>
        <v-toolbar dark :color="options.color" dense flat>
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text v-show="!!message">{{ message }}</v-card-text>
        <v-flex xs12 class="email" color="#f44336">
          <v-text-field autofocus v-model="email" type="email" label="Email*" required></v-text-field>
          <v-alert
            class="warning"
            color="orange"
            :value="this.inputAlert"
            type="warning"
          >The address is not valid.</v-alert>
        </v-flex>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            flat="flat"
            @click.native="$emit('agree-share', email)"
          >Share</v-btn>
          <v-btn color="grey" flat="flat" @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    email: null,
    inputAlert: false,
    options: {
      color: "primary",
      width: 320,
      zIndex: 300
    }
  }),
  methods: {
    open(title, message, options) {
      this.email = null;
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    alertEmail(email) {
      if (this.validateEmail(this.email)) return true;
      else {
        this.inputAlert = true;
        setTimeout(() => {
          this.inputAlert = false;
        }, 1000);
      }
    },
    alertShare(email) {
      this.inputAlert = true;
      setTimeout(() => {
        this.inputAlert = false;
      }, 1000);
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style scoped>
.email {
  padding: 15px;
}
.warning {
  padding: 3px;
  font-size: 15px;
  margin: auto;
  border-radius: 5px;
}
</style>
