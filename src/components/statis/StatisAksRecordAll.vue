<template>
    <div class="flex-(~ justify-between) px-10" v-for="(item, index) of list" :key="index">
        <div>{{ item.question }}</div>
        <NButton text type="primary" @click="() => checkAnswer(item.answer)">查看答案</NButton>
    </div>
</template>

<script setup lang="ts">
import * as statisApi from '@/apis/statis'

const route = useRoute();
const robotId = route.query.robotId as string;

const list = ref<statisApi.RecordItem[]>();
useRequest(
    () => statisApi.getRecordList({
        pageNum: 1,
        pageSize: 99999,
        robotId,
        searchType: '2'
    }),
    {
        onSuccess({ data }) {
            list.value = data.rows;
        }
    }
);

const dialog = useDialog();
function checkAnswer(answer: string) {
    dialog.create({
        title: '答案',
        content: answer,
        showIcon: false
    })
};
</script>

<style scoped></style>