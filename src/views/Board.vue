<script setup>
import { onBeforeMount, ref } from 'vue';
import { $fetch } from "@/mixins/fetch-mixins";
import BoardFormDialog from "@/components/BoardFormDialog.vue";
import { add_circle_outline } from '@quasar/extras/material-icons';

const posts = ref([]);
const visibleFormDialog = ref(false);

const getPosts = async () => {
  posts.value = await $fetch('/posts');
  return posts;
};
const changeVisibleFormDialog = () => {
  visibleFormDialog.value = !visibleFormDialog.value;
};

onBeforeMount(getPosts);
</script>

<template>
  <div class="q-pa-md">
    <div class="column items-end">
      <q-btn round color="primary" :icon="add_circle_outline" @click="changeVisibleFormDialog"/>
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
export default {
  name: 'PostsBoard',
}
</script>
