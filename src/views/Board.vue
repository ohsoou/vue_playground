<template>
  <div class="q-pa-md">
    <div class="column items-end">
<!--      <q-icon name="add_circle_outline" :right="true" size="2rem" color="primary"/>-->
      <q-btn round color="primary" icon="add_circle_outline" @click="changeVisibleFormDialog"/>
    </div>
    <div class="q-gutter-md row items-start">
      <q-card flat bordered style="max-width: 250px" v-for="(post, index) in posts" :key="index">
        <q-card-section>
          <div class="text-h6"> {{ post.title }}</div>
          <div class="text-subtitle2">by. {{ post.author }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div v-dompurify-html="post.body"></div>
          <div><a href="#">comments ></a></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <BoardFormDialog :toolbar="visibleFormDialog" @closeDialog="changeVisibleFormDialog"></BoardFormDialog>
</template>
<script>
import fetchMixins from "@/mixins/fetch-mixins";
import { add_circle_outline } from '@quasar/extras/material-icons';
import BoardFormDialog from "@/components/BoardFormDialog.vue";

export default {
  name: "PostsBoard",
  mixins: [ fetchMixins ],
  components: {BoardFormDialog},

  data() {
    return {
      posts: [],
      visibleFormDialog: false
    }
  },
  created() {
    this.getPosts();
    this.add_circle_outline = add_circle_outline;
  },
  methods: {
    async getPosts() {
      this.posts = await this.$fetch('/posts');
      return this.posts;
    },
    changeVisibleFormDialog() {
      this.visibleFormDialog = !this.visibleFormDialog;
    }
  }
}
</script>
