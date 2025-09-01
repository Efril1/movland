<template>
    <header class="flex justify-between items-center p-3">
      <div class="flex items-center gap-6">
        <ULink
          to="/"
          class="text-xl font-bold text-gray-800 dark:text-gray-200"
        >
          MOVLAND
        </ULink>
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
  
      <UButton
        icon="i-lucide-github"
        color="neutral"
        to="https://github.com/Efril1"
        variant="ghost"
      />
    </header>
  
    <main class="min-h-screen flex flex-col items-center p-4">
      <slot />
    </main>
  </template>
  