<template>
    <NCard>
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="输入密码" path="password">
                <NInput v-model:value="form.password" type="password" />
            </NFormItem>
            <NFormItem label="重复密码" path="repeatPassword">
                <NInput v-model:value="form.repeatPassword" type="password" />
            </NFormItem>
            <NFormItem v-if="props.init" label="邮箱" path="email">
                <NInput v-model:value="form.email" />
            </NFormItem>
        </NForm>
        <NButton class="w-full" :loading="loading" type="primary" @click="setPwd">完成</NButton>
    </NCard>
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'
import type { FormRules, NForm } from 'naive-ui'
import { BusinessError } from '@/utils/errors'

interface Props {
    init?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    init: false
})

const form = ref<authApi.AuthPwdSetForm & { repeatPassword: string }>({
    password: '',
    repeatPassword: '',
    email: ''
});

const rules: FormRules = {
    password: {
        required: true,
        message: '密码不能为空！',
        trigger: 'blur'
    },
    repeatPassword: {
        required: true,
        message: '重复密码不能为空！',
        trigger: 'blur'
    },
    email: {
        required: true,
        message: '邮箱不能为空！',
        trigger: 'blur'
    }
};

const formRef = ref<InstanceType<typeof NForm>>();
const authStore = useAuthStore();
const message = useMessage();

const { run: setPwd, loading } = useRequest(
    async () => {
        await formRef.value?.validate();
        if (form.value.password !== form.value.repeatPassword) {
            throw new BusinessError('密码输入不一致！');
        }
        const { repeatPassword, ...others } = form.value;
        await authStore.setPwd(others);
    },
    {
        manual: true,
        onError(error) {
            if (error instanceof BusinessError) {
                message.error(error.message);
            }
        }
    }
)
</script>

<style scoped></style>