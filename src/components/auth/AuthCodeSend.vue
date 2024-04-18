<template>
    <NButton quaternary :disabled="disabled" :loading="loading" @click="sendCode">
        {{ disabled ? `${interval}s` : '发送验证码' }}
    </NButton>
</template>

<script setup lang="ts">
import * as authApi from '@/apis/auth'
import { BusinessError } from '@/utils/errors';

interface Props {
    email: string;
}

const props = defineProps<Props>();

function useDisabled() {
    const disabled = ref(false);
    const interval = ref(60);

    function start() {
        disabled.value = true;
        interval.value = 60;
        const timeId = setInterval(() => {
            if (interval.value === 0) {
                clearInterval(timeId);
                disabled.value = false;
            }
            interval.value -= 1;
        }, 1000);
    };

    return [
        disabled,
        interval,
        start
    ] as const;
};

function useCodeSend(cb?: () => any) {
    const message = useMessage();
    const { run, loading } = useRequest(
        async () => {
            if (props.email === '') throw new BusinessError('邮箱不能为空！');
            await authApi.sendEmailCode(props.email);
        },
        {
            manual: true,
            onSuccess() {
                message.success('发送成功，请查阅邮箱！');
                cb?.();
            },
            onError(error) {
                if (error instanceof BusinessError) {
                    message.error(error.message);
                }
            }
        }
    );

    return [
        loading,
        run
    ] as const;
};

const [
    disabled,
    interval,
    startDisabled
] = useDisabled();

const [
    loading,
    sendCode
] = useCodeSend(startDisabled)
</script>

<style scoped></style>