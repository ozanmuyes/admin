<template>
  <div>
    <span>users index</span>

    <br>
    <router-link :to="{ name: 'index' }">Dashboard</router-link>

    <br>
    <router-link :to="{ name: 'users.index' }">Users List</router-link>

    <br>
    <router-link :to="{ name: 'users.view', params: { userId: 2 } }">View User with Id 2</router-link>
  </div>
</template>

<script>
  export default {
    //
  };
</script>
