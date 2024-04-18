<template>
    <img class="w-80" v-if="imgUrl" :src="`data:image/jpeg;base64,${imgUrl}`" />
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'

interface Emits {
    (e: 'updateUuid', value: string): void;
}

const emit = defineEmits<Emits>();

const uuid = ref<string>();
const imgUrl = ref<string>();

useRequest(
    authApi.genCode,
    {
        onSuccess({ data }) {
            uuid.value = data.uuid;
            imgUrl.value = data.img;

            emit('updateUuid', data.uuid);
        }
    }
);
</script>

<style scoped></style>