export const useCreditsStore = defineStore('credits', () => {
  const selectedMedia = ref<Media>()
  const config = useRuntimeConfig()
  const apiKey = config.public.TMDB_API_KEY

  async function fetchMediaById(id: number, type: MediaType) {
    const { data } = await useFetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`,
    )

    if (!data.value)
      throw new Error(`Media ${id} not found`)
    selectedMedia.value = data.value as Media | undefined ?? undefined
  }

  return {
    selectedMedia,
    fetchMediaById,
  }
})
