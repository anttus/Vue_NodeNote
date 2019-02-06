<template>
  <div>
      <div v-bind:key="item.Item_id" v-for="item in items">
          <Item v-bind:item="item" v-on:delete-item="$emit('delete-item', item.Item_id)" />
      </div>
  </div>
</template>

<script>
import Item from './Item';

export default {
    name: "Items",
    components: {
        Item
    },
    props: ["items"]
};
</script>

<style scoped>
</style>
