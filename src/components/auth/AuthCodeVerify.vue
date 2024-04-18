<template>
    <NCard>
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="邮箱" path="email">
                <NInput v-model:value="form.email" />
            </NFormItem>
            <NFormItem label="图片验证码" path="code">
                <NInput v-model:value="form.code" />
                <AuthCode class="ml-10" @update-uuid="form.uuid = $event" />
            </NFormItem>
            <NFormItem label="邮箱验证码" path="emailCode">
                <NInput v-model:value="form.emailCode" />
                <AuthCodeSend :email="form.email" />
            </NFormItem>
        </NForm>
        <NButton class="w-full" :loading="loading" type="primary" @click="verifyCode">下一步</NButton>
    </NCard>
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'
import type { FormRules, NForm } from 'naive-ui'
import { BusinessError } from '@/utils/errors'
import AuthCode from './AuthCode.vue'

interface Emits {
    (e: 'success'): void;
}

const emit = defineEmits<Emits>();

const form = ref<authApi.AuthVerifyCodeForm>({
    email: '',
    code: '',
    emailCode: '',
    uuid: ''
});

const rules: FormRules = {
    email: {
        required: true,
        message: '邮箱不能为空！',
        trigger: 'blur'
    },
    code: {
        required: true,
        message: '图片验证码不能为空！',
        trigger: 'blur'
    },
    emailCode: {
        required: true,
        message: '邮箱验证码不能为空！',
        trigger: 'blur'
    }
};

const formRef = ref<InstanceType<typeof NForm>>();
const authStore = useAuthStore();
const message = useMessage();

const { run: verifyCode, loading } = useRequest(
    async () => {
        await formRef.value?.validate();
        await authStore.verifyCode(form.value);
    },
    {
        manual: true,
        onSuccess() {
            emit('success');
        },
        onError(error) {
            if (error instanceof BusinessError) {
                message.error(error.message);
            }
        }
    }
)
</script>

<style scoped></style>