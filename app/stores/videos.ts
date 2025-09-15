export const useVideosStore = defineStore('videosstore', () => {
  const selectedMedia = ref<any>(null)
  const config = useRuntimeConfig()
  const apiKey = config.public.TMDB_API_KEY

  async function fetchMediaById(id: number, type: MediaType) {
    const { data } = await useFetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`,
    )

    if (!data.value)
      throw new Error(`Media ${id} not found`)
    selectedMedia.value = data.value
  }

  return {
    selectedMedia,
    fetchMediaById,
  }
})
