<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
        <StatisLikeRecordAll />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '点赞列表'
    }
})
</script>

<style scoped></style>