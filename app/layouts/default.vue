<template>
  <div class="fixed left-0 top-0 w-screen h-screen flex flex-col">
    <header class="flex justify-between items-center p-3 bg-darkpurple">
      <div class="flex items-center gap-6">
        <ULink
          to="/"
          class="text-2xl font-bold text-lightpink dark:text-lightpink"
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

    <main class="min-h-screen flex flex-col items-center">
      <slot />
    </main>

    <footer class="flex justify-between items-center p-3 bg-darkpurple">
      <ULink
        to="/series"
        class="text-lg hover:text-primary"
      >
        Series
      </ULink>
    </footer>
  </div>
</template>
