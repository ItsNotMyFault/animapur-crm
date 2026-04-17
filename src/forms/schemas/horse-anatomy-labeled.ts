import type { FormSchema } from '../types'

const parts = [
  { key: 'nuque', label: 'Nuque' },
  { key: 'front', label: 'Front' },
  { key: 'ganaches', label: 'Ganaches' },
  { key: 'encolure', label: 'Encolure' },
  { key: 'garrot', label: 'Garrot' },
  { key: 'dos', label: 'Dos' },
  { key: 'reins', label: 'Reins' },
  { key: 'hanche', label: 'Hanche' },
  { key: 'croupe', label: 'Croupe' },
  { key: 'flanc', label: 'Flanc' },
  { key: 'grassetRotule', label: 'Grasset et rotule' },
  { key: 'pliDeLaFesse', label: 'Pli de la fesse' },
  { key: 'jambe', label: 'Jambe' },
  { key: 'jarret', label: 'Jarret' },
  { key: 'canonPosterieur', label: 'Canon (postérieur)' },
  { key: 'bouletPosterieur', label: 'Boulet (postérieur)' },
  { key: 'paturon', label: 'Paturon' },
  { key: 'couronne', label: 'Couronne' },
  { key: 'sabot', label: 'Sabot' },
  { key: 'poitrail', label: 'Poitrail' },
  { key: 'epaule', label: 'Épaule' },
  { key: 'bras', label: 'Bras' },
  { key: 'coude', label: 'Coude' },
  { key: 'avantBras', label: 'Avant-bras' },
  { key: 'genou', label: 'Genou' },
  { key: 'bouletAnterieur', label: 'Boulet (antérieur)' },
] as const

export const horseAnatomyLabeledForm: FormSchema = {
  context: 'equine',
  name: 'horse-anatomy-labeled',
  label: 'Fiche anatomie du cheval (nommée)',
  description:
    'Formulaire de notes par partie anatomique nommée du cheval.',
  audience: 'employee',

  dataSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: Object.fromEntries(
      parts.map(({ key }) => [key, { type: 'string' as const, title: key }]),
    ),
  },

  ui: {
    builderType: 'form',
    component: 'form.layout.root',
    children: [
      {
        id: 'sec-image',
        component: 'layout.section',
        props: { label: 'Schéma — Anatomie du cheval' },
        children: [
          {
            id: 'horse-labeled-img',
            component: 'content.image',
            props: {
              src: '/pictures/horse-anatomy-labeled.webp',
              alt: 'Schéma anatomique du cheval avec parties nommées',
              maxWidth: '650px',
              fit: 'contain',
              caption: 'Anatomie du cheval — parties nommées',
            },
          },
        ],
      },
      {
        id: 'sec-notes',
        component: 'layout.section',
        props: { label: 'Notes par partie' },
        children: [
          {
            id: 'grid-notes',
            component: 'layout.grid',
            props: { cols: 2 },
            children: parts.map(({ key, label }) => ({
              id: `f-${key}`,
              component: 'form.input.textarea' as const,
              field: { path: key },
              props: { label, rows: 2, placeholder: `Notes pour ${label}…` },
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
