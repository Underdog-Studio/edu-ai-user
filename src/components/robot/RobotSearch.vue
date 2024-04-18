<template>
    <NInput class="mb-10" v-model:value="params.robotName" round placeholder="搜索智能助教名称">
    </NInput>

    <NTabs class="mb-15" type="line" v-model:value="curTab">
        <NTab :name="RobotTab.All">全部</NTab>
        <NTab :name="RobotTab.Recent">最近使用</NTab>
        <NTab :name="RobotTab.Statis">数据统计</NTab>
    </NTabs>

    <slot></slot>

    <NPagination class="justify-center pt-10px" size="large" v-model:page="params.pageNum"
        v-model:page-size="params.pageSize" :item-count="props.total" />
</template>

<script setup lang="ts">
import * as robotApi from '@/apis/robot'
import { RobotTab } from '@/enums/robot'

interface Props {
    params: robotApi.RobotListParams;
    total: number;
    curTab: RobotTab;
}

interface Emist {
    (e: 'update:params', params: robotApi.RobotListParams): void;
    (e: 'update:curTab', curTab: RobotTab): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emist>();

const params = computed({
    get() { return props.params },
    set(newParams) {
        emit('update:params', newParams);
    }
});

const curTab = computed({
    get() { return props.curTab },
    set(newTab) {
        emit('update:curTab', newTab);
    }
});
watchEffect(() => {
    const strategy = {
        [RobotTab.All]: '0',
        [RobotTab.Recent]: '1',
        [RobotTab.Statis]: '1'
    };

    params.value.searchType = strategy[curTab.value];
})

</script>

<style scoped></style>