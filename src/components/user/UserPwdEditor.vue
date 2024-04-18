<template>
    <NModal class="max-w-600" preset="card" v-model:show="show" title="修改密码">
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="新密码" path="password">
                <NInput v-model:value="form.password" type="password" />
            </NFormItem>
            <NFormItem label="重复密码" path="repeatPassword">
                <NInput v-model:value="form.repeatPassword" type="password" />
            </NFormItem>
        </NForm>
        <template #footer>
            <div class="flex justify-end">
                <NButton class="mr-20px" v-if="!loading" @click="show = false">取消
                </NButton>
                <NButton type="info" :loading="loading" @click="submit">确认</NButton>
            </div>
        </template>
    </NModal>
</template>

<script setup lang="ts">
import * as userApi from '@/apis/user'
import { BusinessError } from '@/utils/errors'
import type { FormRules, NForm } from 'naive-ui'

interface Emits {
    (e: 'success'): void;
}

const emit = defineEmits<Emits>();

const show = ref(false);
const formRef = ref<InstanceType<typeof NForm>>();

const formModel: () => userApi.UserInfoUpdateForm & { repeatPassword: string } = () => ({
    password: '',
    repeatPassword: ''
});
const form = ref(formModel());

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
    }
};

const message = useMessage();
const { loading, run: submit } = useRequest(
    async () => {
        await formRef.value?.validate();
        if (form.value.password !== form.value.repeatPassword) {
            throw new BusinessError('密码输入不一致！');
        }
        await userApi.updateInfo(form.value);
    },
    {
        manual: true,
        onSuccess() {
            show.value = false;
            emit('success');
            message.success('修改密码成功！');
        },
        onError(error) {
            if (error instanceof BusinessError) {
                message.error(error.message);
            }
        }
    }
);

function open() {
    show.value = true;

    form.value = formModel();
    formRef.value?.restoreValidation();
};

defineExpose({
    open
});

</script>