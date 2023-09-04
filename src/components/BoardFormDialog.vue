<script setup>
import PageLogo from "@/components/Logo.vue";
import {ref, watchEffect} from 'vue';
import { $fetch } from "@/mixins/fetch-mixins";

const props = defineProps({
  toolbar: {
    Type: Boolean,
    default: false
  }
});
const emit = defineEmits(['closeDialog']);


const dialogOpen = ref(false);
const title = ref('');
const body = ref('');

watchEffect(() => {
  dialogOpen.value = props.toolbar;
})
const closeDialog = () => {
  emit("closeDialog", dialogOpen);
};
const getPostId = async () => {
  const postList = await $fetch('/posts');
  return Math.max(...postList.map(post => post.id));
};
const onSubmit = () => {
  getPostId().then(postId => {
    const param = {
      "id": ++postId,
      "title": title.value,
      "body": body.value,
      // TODO: user 정보 수정
      "userId": 1,
      "author": "Chrolla"
    };
    $fetch('/posts', param, 'POST');
  });
};
const onReset = () => {
  title.value = null;
  body.value = null;
}

</script>

<template>
  <q-dialog v-model="dialogOpen" @hide="closeDialog">
    <div class="q-pa-md bg-white rounded-borders">
      <q-toolbar>
        <page-logo :bg-color="'black'"/>

        <q-toolbar-title><span class="text-weight-bold">Add</span> Board</q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
      >
        <q-input
            filled
            v-model="title"
            label="Title *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-editor v-model="body" :placeholder="'Please type something'"/>

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </q-dialog>
</template>
