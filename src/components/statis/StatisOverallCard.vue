<template>
    <NGrid :x-gap="20" :y-gap="20" cols="3" responsive="screen">
        <NGridItem v-for="item of dataCardList" :key="item.label">
            <NCard hoverable>
                <div class="text-(15 center) flex-(~ col) gap-20 justify-center">
                    <div>{{ item.value }}</div>
                    <div class="font-bold">{{ item.label }}</div>
                </div>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<script setup lang="ts">
interface Props {
    askNum?: number;
    likeNum?: number;
    dislikeNum?: number;
}

const props = defineProps<Props>();

const mapper: Record<keyof Props, string> = {
    askNum: '总提问数',
    likeNum: '点赞数',
    dislikeNum: '点踩数'
}

const dataCardList = computed(() => {
    return Object.entries(mapper).map(([key, label]) => {
        return {
            label,
            value: props[key as keyof Props],
        }
    })
});
</script>

<style scoped></style>