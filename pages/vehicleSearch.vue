<template>
  <b-container fluid class="layout">
    <b-form-group id="input-group-6" label="Search:" label-for="input-6">
        <b-form-tags input-id="input-6" v-model="Tags" placeholder="search" />
    </b-form-group>
    <b-button variant="success" v-on:click="search" >Search</b-button>
    <b-list-group>
        <b-list-group-item v-for="item in results" :key="item.Id" >
            <NuxtLink :to="'/vehicle?id=' + item.id" >{{item.Make}} {{item.Model}} {{item.Derivative}}</NuxtLink>
        </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      Tags: [],
      results: []
    }
  },
  methods: {
    search () {
      this.$axios.$get('/api/search/vehicle?tags=' + this.Tags.join(','))
        .then((response) => {
          if (response) {
            this.results = response;
          }
        })
        .catch((error) => { console.log(error) });
    }
  },
  computed: {
    link (id) {
      return '/vehicle?id=' + id;
    }
  }
}
</script>
<style>
    .layout {
        margin: 5px;
    }
</style>
