<template>
    <NCard title="智能助教登录中心">
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="账号" path="username">
                <NInput v-model:value="form.username" />
            </NFormItem>
            <NFormItem label="密码" path="password">
                <NInput v-model:value="form.password" type="password" />
            </NFormItem>
        </NForm>
        <NButton class="w-full mb-5" :loading="loading" type="primary" @click="login">登录</NButton>
        <RouterLink to="/">
            <NButton class="w-full">游客身份登录</NButton>
        </RouterLink>
        <div class="mt-10 flex-(~ justify-between)">
            <RouterLink to="/register">
                <NButton quaternary>注册认证</NButton>
            </RouterLink>
            <RouterLink to="/pwdForget">
                <NButton quaternary>忘记密码</NButton>
            </RouterLink>
        </div>
    </NCard>
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'
import type { FormRules, NForm } from 'naive-ui'

const form = ref<authApi.AuthLoginForm>({
    username: '',
    password: '',
    grantType: 'password'
});

const rules: FormRules = {
    username: {
        required: true,
        message: '用户名不能为空！',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '密码不能为空！',
        trigger: 'blur'
    }
};

const formRef = ref<InstanceType<typeof NForm>>();
const authStore = useAuthStore();

const { run: login, loading } = useRequest(
    async () => {
        await formRef.value?.validate();
        await authStore.login(form.value);
    },
    {
        manual: true
    }
)
</script>

<style scoped></style>