<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { loadingBarRef } from './permission'
import { hintRef, messageRef } from '@/utils/request'

loadingBarRef.value = useLoadingBar();
hintRef.value = useHint();
messageRef.value = useMessage();
</script>

<style></style>
