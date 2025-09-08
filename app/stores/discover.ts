export const useMediaStore = defineStore('mediaDiscover', () => {
  const movies = ref<Media[]>([])
  const tvs = ref<Media[]>([])

  async function fetchMedia(mediaType: MediaType) {
    const config = useRuntimeConfig()
    const apiKey = config.public.TMDB_API_KEY

    const { data } = await useFetch<{ results: any[] }>(
      `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=1`,
    )

    if (data.value?.results) {
      const normalized = data.value.results.map(item => ({
        ...item,
        media_type: mediaType,
      }))

      if (mediaType === 'movie') {
        movies.value = normalized
      }
      else {
        tvs.value = normalized
      }
    }
  }

  function getMovieById(id: string) {
    const movie = movies.value.find(m => m.id === id)
    if (!movie)
      throw new Error(`Movie ${id} not found`)
    return movie
  }

  function getTvById(id: string) {
    const tv = tvs.value.find(t => t.id === id)
    if (!tv)
      throw new Error(`TV ${id} not found`)
    return tv
  }

  return {
    movies,
    tvs,
    fetchMedia,
    getMovieById,
    getTvById,
  }
})
