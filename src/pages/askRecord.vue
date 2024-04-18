<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
        <StatisAksRecordAll />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '提问历史列表'
    }
})
</script>

<style scoped></style>