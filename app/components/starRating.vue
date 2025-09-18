<script setup lang="ts">
const props = defineProps<{
  rating: number
}>()

const rating = toRef(props, 'rating')

const filledPercent = computed(() => {
  return (rating.value / 5) * 100
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative w-20">
      <UIcon v-for="i in 5" :key="i" class="text-primary" name="mingcute:star-line" />
      <div class="absolute inset-0 overflow-hidden" :style="{ width: `${filledPercent}%` }">
        <div class="flex flex-nowrap">
          <UIcon v-for="i in 5" :key="i" class="text-primary flex-none mt-0.5" name="mingcute:star-fill" />
        </div>
      </div>
    </div>
    <span class="mb-1 font-semibold text-gray-400 text-sm self-center">{{ rating.toFixed(1) }}</span>
  </div>
</template>
