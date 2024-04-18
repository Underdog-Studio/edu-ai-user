<template>
    <Layout>
        <template #left>
            <UserRouterLink />
        </template>
        <template #right>
            <MsgRouterLink />
        </template>

        <RobotList />
    </Layout>
</template>

<script setup lang="ts">
definePage({
    meta: {
        title: '机器人广场'
    }
})
</script>

<style scoped></style>