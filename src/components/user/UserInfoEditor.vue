<template>
    <NModal class="max-w-600" preset="card" v-model:show="show" title="编辑用户信息">
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" :disabled="loading">
            <NFormItem label="邮箱" path="email">
                <NInput v-model:value="form.email" />
            </NFormItem>
            <NFormItem label="手机号" path="phone">
                <NInput v-model:value="form.phone" />
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
import type { FormRules, NForm } from 'naive-ui'

interface Emits {
    (e: 'success'): void;
}

const emit = defineEmits<Emits>();

const show = ref(false);
const formRef = ref<InstanceType<typeof NForm>>();

const formModel: () => userApi.UserInfoUpdateForm = () => ({
    email: '',
    phone: ''
});
const form = ref(formModel());

const rules: FormRules = {
    email: {
        required: true,
        message: '邮箱不能为空！',
        trigger: 'blur'
    },
    phone: {
        required: true,
        message: '手机号不能为空！',
        trigger: 'blur'
    }
};

const userStore = useUserStore();
const message = useMessage();
const { loading, run: submit } = useRequest(
    async () => {
        await formRef.value?.validate();
        await userApi.updateInfo(form.value);
    },
    {
        manual: true,
        onSuccess() {
            show.value = false;
            emit('success');
            message.success('修改成功！');
            userStore.getInfo();
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