import type { FormSchema } from '../types'

const anatomyPoints = [
  { key: 'point1', label: '1 — Nuque' },
  { key: 'point2', label: '2 — Toupet' },
  { key: 'point3', label: '3 — Encolure' },
  { key: 'point4', label: '4 — Ligne du dessus' },
  { key: 'point5', label: '5 — Garrot' },
  { key: 'point6', label: '6 — Rein' },
  { key: 'point7', label: '7 — Croupe' },
  { key: 'point8', label: '8 — Hanche' },
  { key: 'point9', label: '9 — Fesse' },
  { key: 'point10', label: '10 — Cuisse' },
  { key: 'point11', label: '11 — Pointe de la fesse' },
  { key: 'point12', label: '12 — Jambe' },
  { key: 'point13', label: '13 — Jarret' },
  { key: 'point14', label: '14 — Pointe du jarret' },
  { key: 'point15', label: '15 — Canon postérieur' },
  { key: 'point16', label: '16 — Boulet postérieur' },
  { key: 'point17', label: '17 — Paturon postérieur' },
  { key: 'point18', label: '18 — Sabot postérieur' },
  { key: 'point19', label: '19 — Passage de sangle' },
  { key: 'point19b', label: '19b — Coude' },
  { key: 'point20', label: '20 — Ventre' },
  { key: 'point21', label: '21 — Flanc' },
  { key: 'point22', label: '22 — Côtes' },
  { key: 'point23', label: '23 — Avant-bras' },
  { key: 'point24b', label: '24b — Genou' },
  { key: 'point25', label: '25 — Canon antérieur' },
  { key: 'point26', label: '26 — Boulet antérieur' },
  { key: 'point27', label: '27 — Paturon antérieur' },
  { key: 'point28', label: '28 — Poitrail' },
  { key: 'point29', label: '29 — Épaule' },
  { key: 'point30', label: '30 — Cou' },
  { key: 'point31', label: '31 — Gorge / Auge' },
  { key: 'point32', label: '32 — Ganache' },
  { key: 'point33', label: '33 — Joue' },
  { key: 'point34', label: '34 — Chanfrein' },
  { key: 'point35', label: '35 — Œil' },
  { key: 'point36', label: '36 — Naseau' },
  { key: 'point37', label: '37 — Bout du nez' },
  { key: 'point38', label: '38 — Lèvres / Bouche' },
  { key: 'point39', label: '39 — Oreille' },
  { key: 'point40', label: '40 — Front' },
  { key: 'point41', label: '41 — Crête' },
  { key: 'point42', label: '42 — Crinière' },
] as const

export const horseAnatomyForm: FormSchema = {
  context: 'equine',
  name: 'horse-anatomy',
  label: 'Fiche anatomie détaillée du cheval',
  description:
    'Formulaire de notes détaillées par point anatomique du cheval (points 1 à 42).',
  audience: 'employee',

  dataSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: Object.fromEntries(
      anatomyPoints.map(({ key }) => [
        key,
        { type: 'string' as const, title: key },
      ]),
    ),
  },

  ui: {
    builderType: 'form',
    component: 'form.layout.root',
    children: [
      {
        id: 'sec-image',
        component: 'layout.section',
        props: { label: 'Schéma — Anatomie détaillée du cheval' },
        children: [
          {
            id: 'horse-anatomy-img',
            component: 'content.image',
            props: {
              src: '/pictures/horse-anatomy-numbered.webp',
              alt: 'Schéma anatomique détaillé du cheval — points 1 à 42',
              maxWidth: '700px',
              fit: 'contain',
              caption: 'Lexique du cheval — anatomie détaillée (1–42)',
            },
          },
        ],
      },
      {
        id: 'sec-notes',
        component: 'layout.section',
        props: { label: 'Notes par point anatomique' },
        children: [
          {
            id: 'grid-notes',
            component: 'layout.grid',
            props: { cols: 2 },
            children: anatomyPoints.map(({ key, label }) => ({
              id: `f-${key}`,
              component: 'form.input.textarea' as const,
              field: { path: key },
              props: {
                label,
                rows: 2,
                placeholder: `Notes pour ${label}…`,
              },
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
