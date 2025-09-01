<script setup lang="ts">
const route = useRoute()

definePageMeta({ name: 'itemid' })
const mediaStore = useMediaStore()
const isLoading = ref(true)
async function initialize() {
  try {
    const id = Number(route.params.id)
    await mediaStore.fetchMediaById(id)
  }
  catch (error) {
    console.error('Failed to fetch:', error)
  }
  finally {
    isLoading.value = false
  }
}
onMounted(async () => {
  await initialize()
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center font-bold">
      <div class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading" />
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-2 capitalize">
        {{ mediaStore.selectedMedia.title || mediaStore.selectedMedia.name || mediaStore.selectedMedia.original_name }}
      </h1>

      <p>Overview: {{ mediaStore.selectedMedia.overview }}</p>
      <p>Release Date: {{ mediaStore.selectedMedia.release_date || mediaStore.selectedMedia.first_air_date }}</p>
      <p>Rating: {{ mediaStore.selectedMedia.vote_average }}</p>
    </div>
  </div>
</template>
