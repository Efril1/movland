<template>
  <UHeader class="flex top-0 left-0 w-full justify-between items-center p-3 bg-darkpurple/70 backdrop-blur-md">
    <template #title>
      <ULink
        to="/"
        class="text-2xl font-bold text-lightpink dark:text-lightpink"
      >
        MOVLAND
      </ULink>
    </template>
    <div class="flex items-center gap-6">
      <ULink
        to="/movies"
        class="text-lg hover:text-primary"
      >
        Movies
      </ULink>
      <ULink
        to="/series"
        class="text-lg hover:text-primary"
      >
        Series
      </ULink>
    </div>
    <template #right>
      <UButton
        icon="i-lucide-github"
        color="neutral"
        to="https://github.com/Efril1"
        variant="ghost"
      />
    </template>
  </UHeader>
</template>
