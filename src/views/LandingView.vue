<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-users',
    title: 'Client records',
    description:
      'Keep every client, their health notes, and their session history in one secure place.',
  },
  {
    icon: 'i-lucide-clipboard-list',
    title: 'Intake & consent forms',
    description:
      'Send intake, health, and consent forms ahead of the first session — all filled and filed automatically.',
  },
  {
    icon: 'i-lucide-folder-open',
    title: 'Files & session notes',
    description:
      'Attach consent forms, session notes and invoices directly to each client — no more scattered paperwork.',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="border-b border-default bg-white">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2 font-semibold">
          <UIcon name="i-lucide-hand-heart" class="size-6 text-primary" />
          <span>Animapur CRM</span>
        </div>
        <div class="flex items-center gap-2">
          <UButton to="/app/clients" color="neutral" variant="ghost" label="Log in" />
          <UButton to="/app/clients" color="primary" label="Go to app" />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <section class="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight mb-6 text-slate-900">
          A calm space for your<br />
          <span class="text-primary">client history.</span>
        </h1>
        <p class="text-lg text-muted max-w-2xl mx-auto mb-10">
          A simple customer management tool built for massage therapists — track clients, their
          health notes, and every session without the paperwork pile.
        </p>
        <div class="flex items-center justify-center gap-3">
          <UButton
            to="/app/clients"
            size="xl"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            label="Open the dashboard"
          />
          <UButton
            to="/app/forms"
            size="xl"
            color="neutral"
            variant="outline"
            label="See the forms"
          />
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-6 pb-12 grid md:grid-cols-3 gap-6">
        <UCard v-for="feature in features" :key="feature.title">
          <div class="flex flex-col gap-3">
            <UIcon :name="feature.icon" class="size-8 text-primary" />
            <h3 class="text-lg font-semibold">{{ feature.title }}</h3>
            <p class="text-muted">{{ feature.description }}</p>
          </div>
        </UCard>
      </section>
    </main>

    <footer class="border-t border-default py-6 text-center text-sm text-muted">
      Animapur CRM · built for therapists
    </footer>
  </div>
</template>
