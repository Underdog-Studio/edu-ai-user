<template>
    <NForm label-placement="left" disabled>
        <NFormItem label="学号">
            <NInput :value="info?.jobNum" />
        </NFormItem>
        <NFormItem label="姓名">
            <NInput :value="info?.realName" />
        </NFormItem>
        <NFormItem label="班级">
            <NInput :value="info?.className" />
        </NFormItem>
        <NFormItem label="邮箱">
            <NInput :value="info?.email" />
        </NFormItem>
        <NFormItem label="手机号">
            <NInput :value="info?.phone" />
        </NFormItem>
    </NForm>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const info = computed(() => userStore.info);
</script>

<style scoped></style>