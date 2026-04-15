<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const sidebarItems = computed<NavigationMenuItem[][]>(() => [
  [
    { label: 'Clients', icon: 'i-lucide-users', to: '/app/clients' },
    { label: 'Forms', icon: 'i-lucide-file-text', to: '/app/forms' },
  ],
])

const title = computed(() => (route.meta.title as string) ?? 'Dashboard')
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
      :ui="{
        root: 'bg-slate-100',
        header: 'h-14 bg-slate-100 border-slate-200',
        footer: 'bg-slate-100 border-slate-200',
      }"
    >
      <template #header>
        <div class="flex items-center gap-2 font-semibold">
          <UIcon name="i-lucide-hand-heart" class="size-5 text-primary" />
          <span>Animapur CRM</span>
        </div>
      </template>

      <template #default>
        <UNavigationMenu orientation="vertical" :items="sidebarItems" />
      </template>

      <template #footer>
        <UButton
          icon="i-lucide-log-out"
          color="neutral"
          variant="ghost"
          block
          to="/"
          label="Back to site"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel :ui="{ root: 'bg-white' }">
      <template #header>
        <UDashboardNavbar :title="title" :ui="{ root: 'bg-white border-slate-200' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <RouterView />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
