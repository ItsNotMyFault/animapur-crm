import type { FormSchema } from '../types'

const regions = [
  { key: 'regionA', label: 'A — Encolure / Crinière' },
  { key: 'regionB', label: 'B — Garrot' },
  { key: 'regionC', label: 'C — Dos / Croupe' },
  { key: 'regionD', label: 'D — Queue' },
  { key: 'regionE', label: 'E — Flanc / Ventre' },
  { key: 'regionF', label: 'F — Épaule / Poitrail' },
] as const

export const horseRegionsForm: FormSchema = {
  context: 'equine',
  name: 'horse-regions',
  label: 'Fiche zones du cheval (régions)',
  description:
    'Formulaire de notes par région anatomique du cheval (zones A à F).',
  audience: 'employee',

  dataSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: Object.fromEntries(
      regions.map(({ key }) => [key, { type: 'string' as const, title: key }]),
    ),
  },

  ui: {
    builderType: 'form',
    component: 'form.layout.root',
    children: [
      {
        id: 'sec-image',
        component: 'layout.section',
        props: { label: 'Schéma — Régions du cheval' },
        children: [
          {
            id: 'horse-regions-img',
            component: 'content.image',
            props: {
              src: '/pictures/horse-regions.webp',
              alt: 'Schéma du cheval — régions A à F',
              maxWidth: '600px',
              fit: 'contain',
              caption: 'Régions anatomiques du cheval (A–F)',
            },
          },
        ],
      },
      {
        id: 'sec-notes',
        component: 'layout.section',
        props: { label: 'Notes par région' },
        children: [
          {
            id: 'grid-notes',
            component: 'layout.grid',
            props: { cols: 2 },
            children: regions.map(({ key, label }) => ({
              id: `f-${key}`,
              component: 'form.input.textarea' as const,
              field: { path: key },
              props: { label, rows: 3, placeholder: `Notes pour la zone ${label.charAt(0)}…` },
            })),
          },
        ],
      },
      {
        id: 'submit',
        component: 'form.button.submit',
        props: { label: 'Enregistrer' },
      },
    ],
  },
}
