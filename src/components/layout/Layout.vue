<template>
    <div class="min-h-screen flex-(~ col)">
        <div class="bg-#f4f4f4 py-10 flex-(~ justify-between items-center)">
            <div class="flex-1 ml-10">
                <slot name="left"></slot>
            </div>
            <span class="flex-1 text-18 font-bold text-center">{{ route.meta?.title }}</span>
            <div class="flex-1 mr-10 text-right">
                <slot name="right"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>