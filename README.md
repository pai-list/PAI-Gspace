# PAI-Gspace · Global Workspace

> **Monitor · Collaborate · Secure AI Teams**

PAI-Gspace is the **Global Workspace** for the PAI ecosystem — a unified command center where agents and humans monitor, collaborate, and coordinate across the entire stack.

## What It Does

- **Agent Monitoring** — Real-time visibility into agent health, memory layers, and task execution
- **Collaboration Hub** — Shared workspaces with memory URL sharing, tool sharing, and agent-to-agent handoff
- **Discovery Portal** — ADP-powered agent discovery, capability browsing, and connection management
- **Pi Network Native** — Identity via Pi KYC, secure team management

## Architecture

```
AxiomID (entry point)
  ├── Gspace (global workspace)
  ├── ADP (agent discovery)
  ├── PAI-Memory (7-layer memory)
  ├── pai-mcp (MCP gateway)
  └── pai-cli (developer CLI)
```

## Quick Start

```bash
# Coming soon
```

## Stack

- **Frontend**: Next.js, Tailwind, TypeScript
- **Backend**: Cloudflare Workers, Durable Objects
- **Memory**: 7-layer architecture (sqlite-vec → Ghost → Neon → Qdrant → Sigstore → Firestore → R2)
- **Identity**: AxiomID + Pi KYC
- **Discovery**: ADP protocol

---

> Built for the PAI Universe — identity, commerce, and collaboration for the agent economy.
