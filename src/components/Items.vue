<template>
  <div>
    <div v-bind:key="item.Item_id" v-for="item in items">
      <Item
        v-if="!itemCompleted(item)"
        v-bind:item="item"
        v-on:delete-item="$emit('delete-item', item.Item_id)"
      />
    </div>
    <br>
    <div v-bind:key="item.Item_id+'completed'" v-for="item in items">
      <Item
        v-if="itemCompleted(item)"
        v-bind:item="item"
        v-on:delete-item="$emit('delete-item', item.Item_id)"
      />
    </div>
    <br>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "Items",
  components: {
    Item
  },
  props: ["items"],
  methods: {
    itemCompleted(item) {
      if (item.Completed === 1) return true;
      else if (item.Completed === 0) return false;
    }
  }
};
</script>

<style scoped>
</style>
