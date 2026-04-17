<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

const route = useRoute()

const sidebarItems = computed<NavigationMenuItem[][]>(() => [
  [
    { label: 'Clients', icon: 'i-lucide-users', to: '/app/clients' },
    { label: 'Formulaires', icon: 'i-lucide-file-text', to: '/app/forms' },
  ],
])

const breadcrumbs = computed(() => {
  const crumbs: { label: string; to?: string }[] = [{ label: 'Accueil', to: '/app' }]
  const matched = route.matched.filter((r) => r.meta.title)
  for (const record of matched) {
    crumbs.push({
      label: record.meta.title as string,
      to: record.path.includes(':') ? undefined : record.path,
    })
  }
  return crumbs
})

const userMenuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Utilisateur',
      description: 'admin@animapur.fr',
      avatar: { text: 'U', class: 'size-8 text-[12px] bg-primary [&_*]:text-white' },
    },
  ],
  [
    { label: 'Paramètres', icon: 'i-lucide-user-cog' },
  ],
  [
    { label: 'Déconnexion', icon: 'i-lucide-log-out', to: '/' },
  ],
])
</script>

<template>
  <UDashboardGroup>
    <!-- Sidebar -->
    <UDashboardSidebar
      collapsible
      resizable
      :ui="{
        root: 'bg-slate-400 border-r-0',
        header: 'h-12 bg-slate-400 border-b-0',
        footer: 'bg-slate-400 border-t-0',
      }"
    >
      <template #header>
        <div class="flex items-center gap-2.5 font-semibold">
          <div class="size-7 rounded-lg bg-primary flex items-center justify-center">
            <UIcon name="i-lucide-hand-heart" class="size-4 text-white" />
          </div>
          <span class="text-sm tracking-tight text-white">Animapur CRM</span>
        </div>
      </template>

      <template #default>
        <UNavigationMenu
          orientation="vertical"
          :items="sidebarItems"
          :ui="{
            link: 'text-white/70 hover:text-white hover:bg-white/10 data-[active]:text-white data-[active]:bg-transparent data-[active]:font-semibold relative data-[active]:before:absolute data-[active]:before:left-0 data-[active]:before:top-1 data-[active]:before:bottom-1 data-[active]:before:w-[3px] data-[active]:before:bg-white data-[active]:before:rounded-full',
            linkLeadingIcon: 'text-white/50 group-data-[active]:text-white',
          }"
        />
      </template>

      <template #footer>
        <div class="px-4 pb-3 text-xs text-white/40">
          Animapur CRM v0.1.0
        </div>
      </template>
    </UDashboardSidebar>

    <!-- Main panel -->
    <UDashboardPanel :ui="{ root: 'bg-slate-400', body: 'p-0! gap-0! flex-1' }">
      <template #header>
        <UDashboardNavbar
          :ui="{
            root: 'h-12 bg-slate-400 border-b-0',
          }"
        >
          <template #leading>
            <div class="flex items-center gap-3">
              <UDashboardSidebarCollapse class="text-white/70!" />
              <nav class="flex items-center gap-1 text-sm">
                <template v-for="(crumb, i) in breadcrumbs" :key="i">
                  <UIcon
                    v-if="i > 0"
                    name="i-lucide-chevron-right"
                    class="size-3.5 text-white/40 shrink-0"
                  />
                  <UButton
                    v-if="crumb.to && i < breadcrumbs.length - 1"
                    :to="crumb.to"
                    variant="link"
                    color="neutral"
                    size="xs"
                    :label="crumb.label"
                    :padded="false"
                    class="text-white/60!"
                  />
                  <span v-else class="font-medium text-white">{{ crumb.label }}</span>
                </template>
              </nav>
            </div>
          </template>

          <template #right>
            <div class="flex items-center gap-1">
              <UButton
                icon="i-lucide-bell"
                color="neutral"
                variant="ghost"
                size="sm"
                class="text-white/70! hover:text-white! hover:bg-white/10!"
              />
              <UDropdownMenu
                :items="userMenuItems"
                :content="{ align: 'end', collisionPadding: 12 }"
                :ui="{ content: 'w-fit min-w-48' }"
              >
                <UButton
                  color="neutral"
                  variant="ghost"
                  class="hover:bg-white/10!"
                >
                  <div
                    class="size-8 rounded-full bg-white/20 text-white text-xs font-semibold flex items-center justify-center"
                  >
                    U
                  </div>
                </UButton>
              </UDropdownMenu>
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div class="flex-1 min-h-0 mt-3 ml-3 bg-slate-50 border border-slate-300/50 rounded-tl-[15px] rounded-tr-none rounded-bl-none rounded-br-none shadow-sm overflow-y-auto">
          <RouterView />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
