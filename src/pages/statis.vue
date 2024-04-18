<template>
    <Layout>
        <template #left>
            <LayoutBackRouterLink />
        </template>
        <StatisOverall />
        <StatisAskTrendDays />
        <StatisAskTrendYear />
        <StatisLikeRecord />
        <StatisAksRecord />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '数据统计'
    }
})
</script>

<style scoped>

</style>