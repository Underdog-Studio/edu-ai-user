<template>
    <NCard>
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="姓名" path="realName">
                <NInput v-model:value="form.realName" />
            </NFormItem>
            <NFormItem label="工号" path="jobNum">
                <NInput v-model:value="form.jobNum" />
            </NFormItem>
        </NForm>
        <NButton class="w-full" :loading="loading" type="primary" @click="register">注册认证</NButton>
    </NCard>
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'
import type { FormRules, NForm } from 'naive-ui'
import { BusinessError } from '@/utils/errors'

interface Emits {
    (e: 'success'): void;
}

const emit = defineEmits<Emits>();

const form = ref<authApi.AuthRegisterForm>({
    realName: '',
    jobNum: ''
});

const rules: FormRules = {
    realName: {
        required: true,
        message: '姓名不能为空！',
        trigger: 'blur'
    },
    jobNum: {
        required: true,
        message: '工号不能为空！',
        trigger: 'blur'
    }
};

const formRef = ref<InstanceType<typeof NForm>>();
const authStore = useAuthStore();
const message = useMessage();

const { run: register, loading } = useRequest(
    async () => {
        await formRef.value?.validate();
        await authStore.register(form.value);
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