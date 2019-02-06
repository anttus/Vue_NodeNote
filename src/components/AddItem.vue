<template>
  <div>
    <form @submit="checkForm">
      <input
        autocomplete="off"
        ref="itemInput"
        type="text"
        v-model="Name"
        name="Name"
        placeholder="Add something"
      >
      <button type="submit" value="Add" class="btn fa fa-cross">
        <font-awesome-icon icon="plus"/>
      </button>
    </form>
  </div>
</template>

<script>
import uuid from "uuid";

export default {
  name: "AddItem",
  data() {
    return {
      Name: "",
      error: ""
    };
  },
  methods: {
    addItem(e) {
      e.preventDefault();
      const newItem = {
        Name: this.Name
      };
      // Send up to parent
      this.$emit("add-item", newItem);
      this.Name = "";
    },
    checkForm(e) {
      if (this.Name) {
        this.addItem(e);
        return true;
      }
      this.error = "";
      if (!this.Name);
      e.preventDefault();
    }
  },
  mounted() {
    this.$refs.itemInput.focus();
  }
};
</script>

<style scoped>
form {
  display: flex;
  max-width: 900px;
  margin-top: 40px;
  width: 90%;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #aaa;
  font-size: 15px;
}

input[type="submit"] {
  flex: 2;
}

.btn {
  padding: 11px;
  font-size: 15px;
  margin-left: 5px;
  width: 39px;
  transition: 0.7s;
}
</style>
