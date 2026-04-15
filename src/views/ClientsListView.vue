<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import clients from '@/data/clients.json'

type Client = (typeof clients)[number]

const UButton = resolveComponent('UButton')

const columns: TableColumn<Client>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    accessorKey: 'sessions',
    header: 'Sessions',
    cell: ({ row }) => String(row.original.sessions.length),
  },
  {
    accessorKey: 'preferredPressure',
    header: 'Pressure',
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h(UButton, {
        label: 'Open',
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
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold">Clients</h2>
        <p class="text-muted text-sm">{{ clients.length }} clients registered</p>
      </div>
      <UButton icon="i-lucide-plus" label="New client" color="primary" />
    </div>

    <UCard>
      <UTable :data="clients" :columns="columns" />
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-code" class="text-muted" />
          <span class="font-medium text-sm">Raw JSON</span>
        </div>
      </template>
      <pre class="text-xs overflow-auto">{{ JSON.stringify(clients, null, 2) }}</pre>
    </UCard>
  </div>
</template>
