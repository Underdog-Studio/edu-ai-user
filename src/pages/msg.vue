<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
        <MsgList />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '消息'
    }
})
</script>

<style scoped></style>