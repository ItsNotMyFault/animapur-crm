<script setup lang="ts">
import { computed, h, onMounted, ref, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Client, ClientFile } from '@/types'
import { clientRepo, fileRepo } from '@/repositories'
import { getFormByName } from '@/forms/registry'
import FormPreviewModal from '@/forms/FormPreviewModal.vue'

const props = defineProps<{ id: string }>()

const UButton = resolveComponent('UButton')

const client = ref<Client | null>(null)
const clientFiles = ref<ClientFile[]>([])
const loading = ref(true)

onMounted(async () => {
  const [c, f] = await Promise.all([
    clientRepo.get(props.id).catch(() => null),
    fileRepo.getByClientId(props.id),
  ])
  client.value = c
  clientFiles.value = f
  loading.value = false
})

const clientName = computed(() =>
  client.value ? `${client.value.firstName} ${client.value.lastName}` : '',
)

const previewOpen = ref(false)
const activeFile = ref<ClientFile | null>(null)

function preview(file: ClientFile) {
  activeFile.value = file
  previewOpen.value = true
}

const activeSchema = computed(() =>
  activeFile.value ? getFormByName(activeFile.value.formName) : undefined,
)
const activePayload = computed(() => activeFile.value?.payload)
const activeLabel = computed(() => activeFile.value?.label ?? '')
const activeFilename = computed(() =>
  activeFile.value ? `${activeFile.value.formName}-${activeFile.value.id}` : undefined,
)

const columns: TableColumn<ClientFile>[] = [
  {
    accessorKey: 'label',
    header: 'Document',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'i-lucide-file-text size-4 text-primary shrink-0' }),
        h('span', { class: 'font-medium' }, row.original.label),
      ]),
  },
  {
    accessorKey: 'formName',
    header: 'Formulaire',
    cell: ({ row }) => getFormByName(row.original.formName)?.label ?? row.original.formName,
  },
  { accessorKey: 'createdAt', header: 'Créé le' },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h(UButton, {
        label: 'Aperçu PDF',
        size: 'xs',
        color: 'primary',
        variant: 'outline',
        icon: 'i-lucide-eye',
        onClick: () => preview(row.original),
      }),
  },
]
</script>

<template>
  <div class="p-5">
    <UCard>
      <template #header>
        <span v-if="client" class="text-sm text-muted">{{ clientFiles.length }} document(s) pour {{ clientName }}</span>
      </template>

      <UTable :data="clientFiles" :columns="columns" :loading="loading">
        <template #empty>
          <div class="text-center py-8 text-muted">
            <UIcon name="i-lucide-folder-open" class="size-8 mx-auto mb-2 opacity-40" />
            <p class="text-sm">Aucun document pour ce client.</p>
          </div>
        </template>
      </UTable>
    </UCard>

    <FormPreviewModal
      v-model:open="previewOpen"
      :schema="activeSchema"
      :payload="activePayload"
      :label="activeLabel"
      :filename="activeFilename"
      :recipient-email="client?.email"
      :recipient-name="clientName"
    />
  </div>
</template>
