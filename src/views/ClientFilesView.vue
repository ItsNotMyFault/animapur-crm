<script setup lang="ts">
import { computed, h, ref, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import clients from '@/data/clients.json'
import files from '@/data/files.json'
import { getFormByName } from '@/forms/registry'
import FormPreviewModal from '@/forms/FormPreviewModal.vue'

type ClientFile = (typeof files)[number]

const props = defineProps<{ id: string }>()

const client = computed(() => clients.find((c) => c.id === props.id))
const clientFiles = computed(() => files.filter((f) => f.clientId === props.id))

const UButton = resolveComponent('UButton')

const previewOpen = ref(false)
const activeFile = ref<ClientFile | null>(null)

function preview(file: ClientFile) {
  activeFile.value = file
  previewOpen.value = true
}

const activeSchema = computed(() =>
  activeFile.value ? getFormByName(activeFile.value.formName) : undefined,
)

const activePayload = computed(() =>
  activeFile.value ? (activeFile.value.payload as Record<string, unknown>) : undefined,
)

const activeLabel = computed(() => activeFile.value?.label ?? '')

const activeFilename = computed(() =>
  activeFile.value ? `${activeFile.value.formName}-${activeFile.value.id}` : undefined,
)

const columns: TableColumn<ClientFile>[] = [
  { accessorKey: 'label', header: 'Document' },
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
  <div class="p-6 space-y-6">
    <div>
      <UButton
        :to="`/app/clients/${props.id}`"
        variant="link"
        color="neutral"
        icon="i-lucide-arrow-left"
        label="Retour à la fiche client"
        :padded="false"
      />
      <h2 class="text-2xl font-semibold mt-2">
        Dossiers
        <span v-if="client" class="text-muted font-normal">— {{ client.name }}</span>
      </h2>
      <p class="text-muted text-sm">{{ clientFiles.length }} document(s)</p>
    </div>

    <UCard>
      <UTable :data="clientFiles" :columns="columns" />
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-code" class="text-muted" />
          <span class="font-medium text-sm">Raw JSON</span>
        </div>
      </template>
      <pre class="text-xs overflow-auto">{{ JSON.stringify(clientFiles, null, 2) }}</pre>
    </UCard>

    <FormPreviewModal
      v-model:open="previewOpen"
      :schema="activeSchema"
      :payload="activePayload"
      :label="activeLabel"
      :filename="activeFilename"
      :recipient-email="client?.email"
      :recipient-name="client?.name"
    />
  </div>
</template>
