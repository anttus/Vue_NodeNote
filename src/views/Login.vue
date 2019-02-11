<template>
  <div class="login">
    <h3>Welcome to NodeNote!</h3>
    <div id="tabs" class="container tabs">
      <div class="tabs">
        <a
          v-on:click="activetab=1, email='', password=''"
          v-bind:class="[ activetab === 1 ? 'active' : '' ]"
        >SIGN IN</a>
        <a
          v-on:click="activetab=2, email='', password='', confirmPassword=''"
          v-bind:class="[ activetab === 2 ? 'active' : '' ]"
        >REGISTER</a>
      </div>
    </div>
    <div class="tabcontent">
      <div v-if="activetab === 1">
        <input class="input" v-model="email" type="text" placeholder="Sähköposti">
        <input class="input" v-model="password" type="password" placeholder="Salasana">
        <button @click="signIn">Sign in</button>
      </div>
      <div v-if="activetab === 2">
        <input class="input" v-model="email" type="text" placeholder="Sähköposti">
        <input class="input" v-model="password" type="password" placeholder="Salasana">
        <input
          class="input"
          v-model="confirmPassword"
          type="password"
          placeholder="Varmista salasana"
        >
        <button @click="signUp">Register</button>
      </div>
      <button @click="signInGoogle" class="google">Google</button>
      <v-alert
        class="warning"
        color="orange"
        :value="this.emailAlert"
        type="warning"
      >Check the address.</v-alert>
      <v-alert
        class="warning"
        color="orange"
        :value="this.passwordAlert"
        type="warning"
      >The password should be at least 6 characters long.</v-alert>
      <v-alert
        class="warning"
        color="green"
        :value="this.emailVerificationAlert"
        type="warning"
      >Activation email sent!</v-alert>
      <v-alert
        class="warning"
        color="orange"
        :value="this.checkEmailVerificationAlert"
        type="warning"
      >Check the activation email.</v-alert>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
const db = require("../../api-server/db/dbController");
let provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {
  name: "login",
  data() {
    return {
      activetab: 2,
      activetab: 1,
      email: "",
      password: "",
      confirmPassword: "",
      emailAlert: false,
      passwordAlert: false,
      emailVerificationAlert: "",
      checkEmailVerificationAlert: ""
    };
  },
  methods: {
    signIn() {
      if (this.validateEmail(this.email)) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            result => {
              let user = result.user;
              if (this.CheckEmailVerification(user)) this.$router.replace("home");
            },
            err => {
              this.checkEmailVerificationAlert = true;
              setTimeout(() => {
                this.checkEmailVerificationAlert = false;
              }, 1200);
              throw err.message;
            }
          );
      }
    },
    signUp() {
      if (
        this.validateEmail(this.email) &&
        this.validatePassword(this.password) &&
        this.password === this.confirmPassword
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            result => {
              let user = result.user;
              if (!this.CheckEmailVerification(user))
                this.sendEmailVerification(user);
              else this.$router.replace("home");
            },
            err => {
              throw err.message;
            }
          );
      }
    },
    signInGoogle() {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(
          result => {
            this.$router.replace("home");
          },
          err => {
            throw err.message;
          }
        );
    },
    sendEmailVerification(user) {
      user
        .sendEmailVerification()
        .then(() => {
          this.emailVerificationAlert = true;
          setTimeout(() => {
            this.emailVerificationAlert = false;
          }, 3000);
        })
        .catch(error => {
          throw error.message;
        });
    },
    CheckEmailVerification(user) {
      if (user.emailVerified) {
        db.addUser(user.uid, user.email);
        return true;
      }
      else return false;
    },
    validateEmail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        this.emailAlert = true;
        setTimeout(() => {
          this.emailAlert = false;
        }, 1200);
        return false;
      } else return true;
    },
    validatePassword(password) {
      if (password.length < 6) {
        this.passwordAlert = true;
        setTimeout(() => {
          this.passwordAlert = false;
        }, 1200);
        return false;
      } else return true;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0;
}

.login {
  margin-top: 40px;
  text-align: center;
  max-width: 900px;
  width: 75%;
}

h3 {
  padding: 30px;
  font-size: 30px;
  text-align: center;
}

.input {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
  width: 75%;
}

p {
  margin-top: 30px;
  font-size: 14px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-bottom: -9px;
  width: 100%;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  font-weight: bold;
  margin-bottom: 15px;
}

.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 6px #e1e1e1;
}

button {
  background-color: #333;
  color: white;
  padding: 14px 20px;
  margin: 8px 0 10px;
  border: none;
  cursor: pointer;
  width: 75%;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

button:hover,
button:active,
button:focus {
  outline: none;
  opacity: 0.8;
}

.google {
  background-color: #ea4335;
}

.warning {
  padding: 5px;
}
</style>
