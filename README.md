# PAI-Gspace (`pai-gspace`)

Global Workspace Theory (GWT) interpretability console and live edge telemetry portal for the **PAI Universe**, deployed at [gspace.axiomid.app](https://gspace.axiomid.app) and integrated as a native window inside [AxiomID AuraOS](https://www.axiomid.app).

## Status

| Component | Status | Verification / Source |
|---|---|---|
| **GWT Landing & Ecosystem Grid** | Live | [`app/page.tsx`](./app/page.tsx) — protocol catalog (`EN` / `AR`), interactive telemetry cards |
| **Edge Telemetry Endpoint (`/api/telemetry`)** | Live | [`app/api/telemetry/route.ts`](./app/api/telemetry/route.ts) — Next.js Edge runtime probing `skills`, `earn`, `aip`, `memory`, `ppp`, and `axiomid.app` |
| **Root Layout & Styling** | Live | [`app/layout.tsx`](./app/layout.tsx), [`app/globals.css`](./app/globals.css) (Next.js 16, React 19, Tailwind CSS 4, Three.js) |
| **Unit Tests** | Implemented | [`app/__tests__/page.test.tsx`](./app/__tests__/page.test.tsx) (Vitest) |
| **Multi-Team Write Operations & Pi Auth** | Planned | Read-only monitoring & cross-protocol links in the current release |

## Architecture & Ecosystem Links

```text
AxiomID AuraOS (www.axiomid.app)
  └── PAI Gspace Window / Portal (gspace.axiomid.app) ← THIS REPO
        ├── /api/telemetry -> probes live *.axiomid.app protocol surfaces
        ├── AIP Security Token Gateway   (aip.axiomid.app)
        ├── Pi Agentic Skills & MCP      (skills.axiomid.app / mcp.axiomid.app)
        ├── Agentic Labor Exchange       (earn.axiomid.app)
        ├── 7-Layer Memory Engine        (memory.axiomid.app)
        └── USB Wire Protocol            (ppp.axiomid.app)
```

## Scripts (`package.json`)

```bash
npm install
npm run dev         # Start Next.js development server
npm run build       # next build --webpack
npm run typecheck   # tsc --noEmit (also used by `npm run lint`)
npm test            # vitest run (app/__tests__/page.test.tsx)
```

Additional tooling scripts: `validate`, `validate:schemas`, `centerboard:fetch`, `centerboard:watch`, `feedback`, and `feedback:view`.

## License

MIT — see [`LICENSE`](./LICENSE). Part of [PAI Universe (`pai-list`)](https://github.com/pai-list).
