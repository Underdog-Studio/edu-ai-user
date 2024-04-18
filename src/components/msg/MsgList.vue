<template>
    <NCard>
        <NDataTable :data="list" :loading="loading" :columns="columns"></NDataTable>

        <NPagination class="justify-center pt-10px" size="large" v-model:page="params.pageNum"
            v-model:page-size="params.pageSize" :item-count="total" />
    </NCard>
</template>

<script setup lang="tsx">
import * as msgApi from '@/apis/msg'
import { NButton, type DataTableColumns } from 'naive-ui'
import { RouterLink } from 'vue-router'

const params = ref({
    pageNum: 1,
    pageSize: 10
});
const total = ref(0);
const list = ref<msgApi.MsgItem[]>([]);

const columns: DataTableColumns<msgApi.MsgItem> = [
    {
        title: '内容',
        key: 'content'
    },
    {
        title: '创建时间',
        key: 'createTime'
    },
    {
        title: '操作',
        key: 'actions',
        render: (rowData) => <RouterLink to={`/robotChat?robotId=${rowData.id}`} ><NButton text type="primary">去提问</NButton></RouterLink>
    }
];

const { loading } = useRequest(
    () => msgApi.getList(params.value),
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