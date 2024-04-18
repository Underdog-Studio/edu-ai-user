<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
        <Chat />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '聊天'
    }
})
</script>

<style scoped></style>