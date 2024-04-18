<template>
    <UserPwdEditor ref="pwdEditorRef" />
    <UserInfoEditor ref="infoEditorRef" />

    <NCard title="基本信息">
        <UserForm />
        <NDivider title-placement="left">账号操作</NDivider>
        <NSpace>
            <NButton ghost type="primary" @click="pwdEditorRef?.open">修改密码</NButton>
            <NButton ghost type="info" @click="infoEditorRef?.open">编辑</NButton>
        </NSpace>
    </NCard>
    <NCard title="其它操作">
        <NButton ghost type="error" @click="authStore.logout">退出登录</NButton>
    </NCard>
</template>

<script setup lang="ts">
import type UserPwdEditor from './UserPwdEditor.vue'
import type UserInfoEditor from './UserInfoEditor.vue'

const pwdEditorRef = ref<InstanceType<typeof UserPwdEditor>>();
const infoEditorRef = ref<InstanceType<typeof UserInfoEditor>>();
const authStore = useAuthStore();
</script>

<style scoped></style>