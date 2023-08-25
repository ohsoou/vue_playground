<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-card flat bordered style="max-width: 250px" v-for="(post, index) in posts" :key="index">
        <q-card-section>
          <div class="text-h6"> {{ post.title }}</div>
          <div class="text-subtitle2">by. {{ post.author }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div>{{ post.body }}</div>
          <div><a href="#">comments ></a></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import fetchMixins from "@/mixins/fetch-mixins";
export default {
  name: "PostsBoard",
  mixins: [ fetchMixins ],
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.$fetch('/posts').then(jsonList => this.posts = jsonList);
    },
  }
}
</script>
