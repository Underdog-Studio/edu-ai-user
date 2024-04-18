<template>
    <div>
        <NSteps class="mb-15" :current="curStep">
            <NStep title="忘记密码"></NStep>
            <NStep title="重置密码"></NStep>
        </NSteps>
        <AuthCodeVerify v-if="curStep === 1" @success="curStep = 2" />
        <AuthPwdSet v-if="curStep === 2" />
    </div>
</template>

<script setup lang="ts">
const curStep = ref(1);
</script>

<style scoped></style>