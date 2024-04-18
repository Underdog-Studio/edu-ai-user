<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
       <UserInfo />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '我的'
    }
})
</script>

<style scoped>

</style>