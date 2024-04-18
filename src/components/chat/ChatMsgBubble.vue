<template>
    <div class="mb-20 mr-10 flex justify-end ml-20 text-justify" v-if="from == 'user'">
        <div class="inline-block bg-#2a77fe px-14 py-10 rd-10 rd-tr-0 text-white">
            <slot :content="content" :from="from">
                {{ content }}
            </slot>
        </div>
    </div>
    <div class="mb-20 ml-10 mr-20 text-justify" v-else>
        <div class="inline-block bg-white px-14 py-10 rd-10 rd-tl-0  shadow shadow-#2a78ff shadow-op-15  shadow-lg">
            <slot :content="content" :from="from">
                <span v-html="content"></span>
            </slot>
        </div>
    </div>
    <div v-if="showTools" class="flex items-center gap-10 text-20">
        <div v-if="state === '1'" class="i-carbon:thumbs-up-filled cursor-pointer" @click="emits('update-state', '0')">
        </div>
        <div v-else class="i-carbon:thumbs-up cursor-pointer" @click="emits('update-state', '1')"></div>
        <div v-if="state === '-1'" class="i-carbon:thumbs-down-filled cursor-pointer"
            @click="emits('update-state', '0')">
        </div>
        <div v-else class="i-carbon:thumbs-down cursor-pointer" @click="emits('update-state', '-1')"></div>
        <div class="i-carbon:copy cursor-pointer" @click="async () => {
        await copy(content)
        message.success('复制成功')
    }"></div>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useMessage } from 'naive-ui';

withDefaults(
    defineProps<{
        from?: "user" | "robot"
        content?: string
        showTools?: boolean
        state?: '0' | '1' | '-1'
    }>(),
    {
        from: 'user',
        content: ''
    }
)

const message = useMessage()

const {
    copy
} = useClipboard({
    legacy: true
})

const emits = defineEmits<{
    (e: 'update-state', state: '-1' | '1' | '0'): void
}>()
</script>

<style scoped></style>