<script setup lang="ts">
import { h, onMounted, ref, computed, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Client } from '@/types'
import { clientRepo } from '@/repositories'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const clients = ref<Client[]>([])
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  const result = await clientRepo.list()
  clients.value = result.data
  loading.value = false
})

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return clients.value
  return clients.value.filter(
    (c) =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q),
  )
})

function initials(c: Client) {
  return `${c.firstName[0]}${c.lastName[0]}`.toUpperCase()
}

const columns: TableColumn<Client>[] = [
  {
    accessorKey: 'lastName',
    header: 'Client',
    cell: ({ row }) => {
      const c = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          {
            class:
              'size-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0',
          },
          initials(c),
        ),
        h('div', {}, [
          h('div', { class: 'font-medium' }, `${c.firstName} ${c.lastName}`),
          h('div', { class: 'text-muted text-xs' }, c.email),
        ]),
      ])
    },
  },
  { accessorKey: 'phone', header: 'Téléphone' },
  {
    accessorKey: 'intakeDate',
    header: 'Accueil',
  },
  {
    accessorKey: 'sessions',
    header: 'Séances',
    cell: ({ row }) =>
      h(
        UBadge,
        { label: String(row.original.sessions.length), color: 'neutral', variant: 'subtle' },
      ),
  },
  {
    accessorKey: 'preferredPressure',
    header: 'Pression',
    cell: ({ row }) =>
      h(UBadge, {
        label: row.original.preferredPressure,
        color: 'primary',
        variant: 'subtle',
        class: 'capitalize',
      }),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h(UButton, {
        label: 'Ouvrir',
        size: 'xs',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-arrow-right',
        to: `/app/clients/${row.original.id}`,
      }),
  },
]
</script>

<template>
  <div class="p-5">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 flex-1">
            <UInput
              v-model="search"
              icon="i-lucide-search"
              placeholder="Rechercher par nom, email ou téléphone…"
              class="max-w-sm"
              :ui="{ root: 'flex-1 max-w-sm' }"
            />
            <span class="text-sm text-muted">{{ filtered.length }} client(s)</span>
          </div>
          <UButton icon="i-lucide-plus" label="Nouveau client" color="primary" />
        </div>
      </template>

      <UTable :data="filtered" :columns="columns" :loading="loading">
        <template #empty>
          <div class="text-center py-8 text-muted">
            <UIcon name="i-lucide-users" class="size-8 mx-auto mb-2 opacity-40" />
            <p v-if="search" class="text-sm">Aucun client ne correspond à « {{ search }} ».</p>
            <p v-else class="text-sm">Aucun client enregistré.</p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
