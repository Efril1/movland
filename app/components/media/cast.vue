<script setup lang="ts">
const props = defineProps<{
  media: Media
}>()
</script>

<template>
  <div class="px-4 py-8 max-w-7xl mx-auto">
    <div class="flex overflow-x-auto gap-4 pb-4">
      <div
        v-for="person in media.cast"
        :key="person.id"
        class="flex-shrink-0 w-40 p-2"
      >
        <div class="flex flex-col items-center text-center">
          <UAvatar
            :src="person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : '/default-avatar.png'"
            :alt="person.name"
            class="mb-2"
          />

          <span class="text-sm font-semibold mb-1 truncate w-full">
            {{ person.name }}
          </span>
          <span class="text-xs text-gray-500 truncate w-full">
            {{ person.character }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
