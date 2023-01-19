# Nieuwsblad Spaarkaart

```mermaid
graph LR
  A --> B(Extra page/URL)
  subgraph Feed
      A(Banner)
      end
  subgraph Webview
      B(Extra page/URL)
      C(Messagent flow)
      B -- Spaarkaart vol --> C(Messagent flow)
      C -- Spaarkaart ingediend --> B
  end
```

## Commands

| Commands          |                                |
| ----------------- | ------------------------------ |
| `npm run dev`     | Run dev server locally         |
| `npm run build`   | Build result to `/dist` folder |
| `npm run preview` | Preview build result           |
