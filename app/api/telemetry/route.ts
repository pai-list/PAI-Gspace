import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const PROBES = [
  { id: "pi_kyc_verify", name: "Pi KYC Verifier", layer: "L2 Identity", color: "#10b981", url: "https://skills.axiomid.app/llms.txt" },
  { id: "pi_wallet_pay", name: "Pi Payment Escrow", layer: "L7 Labor", color: "#fbbf24", url: "https://earn.axiomid.app" },
  { id: "aip_tok_issue", name: "AIP Zero-Key Vault", layer: "L2 Security", color: "#c084fc", url: "https://aip.axiomid.app" },
  { id: "memory_recall", name: "7-Layer Memory Graph", layer: "L5 Memory", color: "#38bdf8", url: "https://memory.axiomid.app" },
  { id: "ppp_usb_pack", name: "PPP USB Wire Formatter", layer: "L3 Protocol", color: "#f43f5e", url: "https://ppp.axiomid.app" },
  { id: "gateway_health", name: "Full Gateway", layer: "L1 Edge", color: "#8b5cf6", url: "https://axiomid.app" },
];

async function probe(url: string, timeoutMs = 3000) {
  const start = Date.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), method: "GET" });
    return { ok: res.ok, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

export async function GET() {
  const results = await Promise.all(PROBES.map((p) => probe(p.url)));

  const skills = PROBES.slice(0, 5).map((p, i) => ({
    id: p.id,
    name: p.name,
    layer: p.layer,
    status: results[i].ok ? "ALIVE" : "DOWN",
    color: p.color,
    latency: results[i].latencyMs,
    calls: 0,
    errors: results[i].ok ? 0 : 1,
    up: results[i].ok,
  }));

  const gateway = results[5];
  const healthy = results.filter((r) => r.ok).length;
  const avgLatency = Math.round(
    results.reduce((sum, r) => sum + r.latencyMs, 0) / results.length,
  );

  return NextResponse.json(
    {
      globalWorkspace: {
        attention: Math.max(0, Math.min(100, Math.round(100 - avgLatency / 3))),
        consciousness: gateway.ok ? "ACTIVE" : "DEGRADED",
        activeAgents: healthy,
        degraded: !gateway.ok,
      },
      skills,
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}