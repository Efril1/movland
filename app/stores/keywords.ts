export const useKeywordsStore = defineStore('keywords', () => {
  const selectedMedia = ref<Keywords | null>(null)
  const config = useRuntimeConfig()
  const apiKey = config.public.TMDB_API_KEY

  async function fetchMediaById(id: number, type: MediaType) {
    const { data } = await useFetch<any>(
      `https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${apiKey}&language=en-US`,
    )

    if (!data.value)
      throw new Error(`Media ${id} not found`)

    selectedMedia.value = {
      id: data.value.id,
      keywords: data.value.keywords ?? data.value.results ?? [],
    }
  }

  return {
    selectedMedia,
    fetchMediaById,
  }
})
