<script setup lang="ts">
const route = useRoute()
definePageMeta({ name: 'itemid' })
const mediaStore = useMediaStore()
const id = Number(route.params.id)
if (id) {
  await mediaStore.fetchMediaById(id)
}
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

    <div v-else class="flex gap-11 mt-20">
      <br>
      <img :src="`https://image.tmdb.org/t/p/original${mediaStore.selectedMedia.poster_path}`" class="flex rounded-lg w-1/5 h-1/5 object-cover">
      <div class="flex-col max-w-2xl space-y-6">
        <h1 class=" text-5xl font-bold mb-2 capitalize">
          {{ mediaStore.selectedMedia.title || mediaStore.selectedMedia.name || mediaStore.selectedMedia.original_name }}
        </h1>
        <p class="font-bold">
          Overview:
        </p>
        <p class="">
          {{ mediaStore.selectedMedia.overview }}
        </p>
      </div>
      <div class="flex w-full h-full ml-100 bg-purple-900">
        <div class=" pl-8 flex-col max-w-2xl space-y-6 ">
          <br>
          <div class="flex">
            <p class="font-bold">
              Aired:
            </p>
            <span class="pl-2"> {{ mediaStore.selectedMedia.release_date || mediaStore.selectedMedia.first_air_date }}</span>
          </div>
          <div class="flex">
            <p class="font-bold">
              Rating:
            </p>
            <span class="pl-2"> {{ mediaStore.selectedMedia.vote_average }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
