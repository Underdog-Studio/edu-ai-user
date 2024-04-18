<template>
    <NCard>
        <RobotSearch v-model:params="params" v-model:curTab="curTab" :total="total">
            <NDataTable :data="list" :loading="loading" :columns="columns" :row-props="rowProps"></NDataTable>
        </RobotSearch>
    </NCard>
</template>

<script setup lang="tsx">
import * as robotApi from '@/apis/robot'
import type { DataTableColumns } from 'naive-ui'
import { RobotTab } from '@/enums/robot'

const params = ref<robotApi.RobotListParams>({
    robotName: '',
    searchType: '0',
    pageNum: 1,
    pageSize: 10
});

const columns: DataTableColumns<robotApi.RobotItem> = [
    {
        title: '头像',
        key: 'robotAvatar',
        render: (rowData) => rowData.robotAvatar ? <img class='w-50 h-50 rd-[50%]' src={rowData.robotAvatar} /> : '-'
    },
    {
        title: '名称',
        key: 'robotName'
    },
    {
        title: '创建人',
        key: 'robotManagers',
        render: (rowData) => rowData.robotManagers.join(',')
    }
];

const curTab = ref(RobotTab.All);
const router = useRouter();
const rowProps = (rowData: robotApi.RobotItem) => ({
    class: 'cursor-pointer',
    onClick() {
        if (curTab.value === RobotTab.All || curTab.value === RobotTab.Recent) {
            router.push({ path: '/robotChat', query: { robotId: rowData.id } });
        } else {
            router.push({ path: '/statis', query: { robotId: rowData.id } });
        }
    }
});

const total = ref(0);
const list = ref<robotApi.RobotItem[]>([]);
const { loading } = useRequest(
    () => robotApi.getList(params.value),
    {
        refreshDeps: true,
        onSuccess({ data }) {
            total.value = data.total;
            list.value = data.rows;
        }
    }
);
</script>

<style scoped></style>