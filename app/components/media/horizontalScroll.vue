<script setup lang="ts">
const props = defineProps<{
  title: string
  media: Array<any>
  id: string
}>()

const scrollAmount = 176

function scrollLeft() {
  const el = document.getElementById(props.id)
  if (el)
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

function scrollRight() {
  const el = document.getElementById(props.id)
  if (el)
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}
</script>

<template>
  <USeparator class="mb-5 mt-5">
    <h1 class="text-2xl font-bold capitalize text-lightpink">
      {{ title }}
    </h1>
  </USeparator>

  <div class="relative">
    <div
      :id="id"
      class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar mr-12"
    >
      <MediaCard
        v-for="item in media"
        :key="item.id"
        :media="item"
        class="flex-shrink-0 w-40"
      />
    </div>

    <div class="absolute right-2 top-0 h-full flex flex-col z-10 justify-between">
      <UButton
        color="primary"
        variant="solid"
        class="flex-1 m-1 rounded-full"
        @click="scrollLeft"
      >
        ‹
      </UButton>
      <UButton
        color="primary"
        variant="solid"
        class="flex-1 m-1 rounded-full"
        @click="scrollRight"
      >
        ›
      </UButton>
    </div>
  </div>
</template>
