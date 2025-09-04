export const useMediaDetailsStore = defineStore('mediaDetails', () => {
  const selectedMedia = ref<any>(null)

  async function fetchMediaById(id: number, type: 'movie' | 'tv' = 'movie') {
    const config = useRuntimeConfig()
    const apiKey = config.public.TMDB_API_KEY
    const endpoint = type === 'movie' ? 'movie' : 'tv'

    const { data } = await useFetch<any>(
      `https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apiKey}&language=en-US`,
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
