<template>
    <NConfigProvider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
        <NDialogProvider>
            <NLoadingBarProvider>
                <NMessageProvider>
                    <App />
                </NMessageProvider>
            </NLoadingBarProvider>
        </NDialogProvider>
    </NConfigProvider>
</template>

<script setup lang="ts">
import App from './App.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

// 主题样式覆盖
const themeOverrides: GlobalThemeOverrides = {

}

</script>

<style lang="scss">
html,
body {
    padding: 0;
    margin: 0;
}
</style>