<template>
    <NCard title="总体概括">
        <StatisOverallUsage class="mb-10" :usage="data?.usageCount" :total="data?.availableCount" />
        <StatisOverallCard :ask-num="data?.totalQuestionCount" :like-num="data?.likeCount"
                :dislike-num="data?.dislikeCount" />
    </NCard>
</template>

<script setup lang="ts">
import * as statisApi from '@/apis/statis'

const route = useRoute('/statis');
const robotId = route.query.robotId as string

const data = ref<statisApi.OverallData>();
useRequest(
    () => statisApi.getOverallData(robotId),
    {
        onSuccess(d) {
            data.value = d.data;
        }
    }
);
</script>

<style scoped></style>