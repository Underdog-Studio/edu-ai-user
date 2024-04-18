<template>
    <NCard class="relative" title="最新点赞记录">
        <RouterLink :to="`/likeRecord?robotId=${robotId}`">
            <NButton class="absolute top-30 right-30" text type="primary">更多</NButton>
        </RouterLink>
        <template v-if="list?.length">
            <div class="flex-(~ justify-between)" v-for="(item, index) of list" :key="index">
                <div>{{ item.question }}</div>
                <NButton text type="primary" @click="() => checkAnswer(item.answer)">查看答案</NButton>
            </div>
        </template>
        <NEmpty v-else></NEmpty>
    </NCard>
</template>

<script setup lang="ts">
import * as statisApi from '@/apis/statis'

const route = useRoute();
const robotId = route.query.robotId as string;

const list = ref<statisApi.RecordItem[]>();
useRequest(
    () => statisApi.getRecordList({
        pageNum: 1,
        pageSize: 3,
        robotId,
        searchType: '1'
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