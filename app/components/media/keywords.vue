<script setup lang="ts">
const props = defineProps<{
  keywords: Keywords | null
}>()
</script>

<template>
  <UBadge
    v-for="keyword in props.keywords?.keywords"
    :key="keyword.id"
    color="neutral"
    variant="outline"
    class="inline-flex w-fit"
  >
    {{ keyword.name }}
  </UBadge>
</template>
