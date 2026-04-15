# Pictures

Drop image files here and reference them in form schemas via:

```ts
{
  id: 'some-id',
  component: 'content.image',
  props: {
    src: '/pictures/body-diagram.png',
    alt: 'Body diagram',
    maxWidth: '400px',
    caption: 'Marquer les zones traitées',
  },
}
```

Supported props: `src`, `alt`, `maxWidth`, `maxHeight`, `fit` (`cover` | `contain`), `caption`.

External URLs (`https://...`) and data URIs also work.
