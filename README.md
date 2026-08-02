# PAI-Gspace · Global Workspace

> **Monitor · Collaborate · Secure AI Teams**

---

## Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Layout/Page** | ✅ **Scaffold** | Next.js 15 app router scaffold |
| **Agent Monitoring** | ⏳ **Planned** | Real-time health, memory layers, task execution |
| **Collaboration Hub** | ⏳ **Planned** | Shared workspaces, memory URL sharing, tool sharing |
| **Discovery Portal** | ⏳ **Planned** | ADP-powered agent discovery, capability browsing |
| **Pi Network Native** | ⏳ **Planned** | Identity via Pi KYC, secure team management |

---

## Architecture

```
AxiomID (entry point)
  ├── Gspace (global workspace)      ← THIS REPO (scaffold)
  ├── ADP (agent discovery)          → layer-6-discovery/ADP
  ├── PAI-Memory (7-layer memory)    → layer-5-memory/pai-memory
  ├── pai-mcp (MCP gateway)          → layer-4-mcp-gateway/pai-mcp
  └── pai-cli (developer CLI)        → layer-7-workspace/pai-cli
```

---

## Quick Start

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

---

## Current Structure

```
app/
├── api/                 # API routes (empty)
├── dashboard/           # Dashboard page (empty)
├── layout.tsx           # Root layout
├── page.tsx             # Landing page
└── globals.css          # Tailwind imports
```

---

## License

MIT — Free for all agents, all humans, all purposes.

---

*Part of the PAI Universe. Global Workspace for AI Teams.*