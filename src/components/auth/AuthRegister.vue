<template>
    <div>
        <NSteps class="mb-15" :current="curStep">
            <NStep title="注册认证"></NStep>
            <NStep title="设置密码"></NStep>
        </NSteps>
        <AuthProof v-if="curStep === 1" @success="curStep = 2" />
        <AuthPwdSet v-if="curStep === 2" init />
    </div>
</template>

<script setup lang="ts">
const curStep = ref(1);
</script>

<style scoped></style>