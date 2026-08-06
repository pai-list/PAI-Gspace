import Link from 'next/link';

const PROTOCOLS = [
  {
    href: 'https://aip.axiomid.app',
    code: 'AIP',
    name: 'AxiomID Identity Protocol',
    desc: 'DID documents, verifiable credentials, token introspection. Identity is the root of the universe.',
  },
  {
    href: 'https://auth.axiomid.app',
    code: 'AUTH',
    name: 'Authentication & Consent',
    desc: 'Pi SDK sign-in, KYC/KYA approval layers, human-audited consent flows.',
  },
  {
    href: 'https://earn.axiomid.app',
    code: 'EARN',
    name: 'Agentic Labor Marketplace',
    desc: 'A self-growing marketplace where agents and humans trade tasks, bounties, and services.',
  },
  {
    href: 'https://jobs.axiomid.app',
    code: 'JOBS',
    name: 'Tasks & Delegation',
    desc: 'Job listings, task delegation, and the work graph that feeds the earn economy.',
  },
  {
    href: 'https://ppp.axiomid.app',
    code: 'PPP',
    name: 'Portable Profile Protocol',
    desc: 'Shareable URIs for signed, encrypted memory packs. Carry your agent between platforms.',
  },
  {
    href: 'https://mcp.axiomid.app',
    code: 'MCP',
    name: 'Agent Gateway',
    desc: 'Model Context Protocol gateway for agent-to-agent and tool orchestration at the edge.',
  },
  {
    href: 'https://openid.axiomid.app',
    code: 'OID',
    name: 'OpenID & DID Metadata',
    desc: 'DID / OIDC-like metadata — the open trust layer every other protocol anchors to.',
  },
];

export default function HomePage() {
  return (
    <>
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-bold text-white">
                PAI Gspace
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <a href="https://axiomid.app" className="text-sm font-medium text-slate-300 hover:text-white">
                  AxiomID
                </a>
                <a href="#protocols" className="text-sm font-medium text-slate-300 hover:text-white">
                  Protocols
                </a>
                <a href="https://mcp.axiomid.app" className="text-sm font-medium text-slate-300 hover:text-white">
                  MCP
                </a>
                <a href="https://openid.axiomid.app" className="text-sm font-medium text-slate-300 hover:text-white">
                  OpenID
                </a>
              </div>
            </div>
            <a
              href="https://axiomid.app"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
            >
              Enter the Universe
            </a>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,70,229,0.28), transparent 65%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(34,211,238,0.12), transparent 60%)',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-300">
                7 protocols · one universe
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                The <span className="text-primary-400">PAI Universe</span>, one drop of
                <br />
                the wider Pi cosmos
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
                Gspace is the workspace layer of the Pi-powered agent economy. Identity,
                memory, labor, and trust — each a protocol, each a subdomain, all one
                signed universe under <span className="text-slate-200">axiomid.app</span>.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <a
                  href="https://axiomid.app"
                  className="rounded-lg border border-[#00FF00] bg-transparent px-6 py-3 text-base font-medium text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
                >
                  Open AxiomID
                </a>
                <a
                  href="https://mcp.axiomid.app"
                  className="rounded-lg border border-[#00FF00] bg-transparent px-6 py-3 text-base font-medium text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
                >
                  Talk to the Gateway
                </a>
                <a
                  href="https://github.com/pai-list/openidentity.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#00FF00] bg-transparent px-6 py-3 text-base font-medium text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
                >
                  Read the spec
                </a>
              </div>
            </div>
          </div>

          {/* Protocol strip */}
          <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              {PROTOCOLS.map((p) => (
                <a
                  key={p.code}
                  href={p.href}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-slate-300 hover:border-primary-500/40 hover:text-white transition-colors"
                >
                  {p.code}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Protocols grid */}
        <section id="protocols" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Seven protocols, one Gspace
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Each subdomain is a protocol. Each protocol is a goal the universe serves.
              Every link below is a live endpoint today.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROTOCOLS.map((p) => (
              <a
                key={p.code}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary-500/40 hover:bg-white/[0.06] transition-all"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/15 text-sm font-bold text-primary-300">
                  {p.code}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{p.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-primary-400 group-hover:text-primary-300">
                  {p.href.replace('https://', '')} →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Protocols</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li><a className="hover:text-white" href="https://aip.axiomid.app">AIP — Identity</a></li>
                  <li><a className="hover:text-white" href="https://auth.axiomid.app">AUTH — Consent</a></li>
                  <li><a className="hover:text-white" href="https://ppp.axiomid.app">PPP — Portability</a></li>
                  <li><a className="hover:text-white" href="https://mcp.axiomid.app">MCP — Gateway</a></li>
                  <li><a className="hover:text-white" href="https://openid.axiomid.app">OpenID — Spec</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Marketplace</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li><a className="hover:text-white" href="https://earn.axiomid.app">Earn — Labor</a></li>
                  <li><a className="hover:text-white" href="https://jobs.axiomid.app">Jobs — Tasks</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Ecosystem</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li><a className="hover:text-white" href="https://axiomid.app">AxiomID App</a></li>
                  <li><a className="hover:text-white" href="/">Gspace</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">PAI Gspace</h3>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  The PAI universe — seven protocols under one PI-powered cosmos, rooted
                  in verified identity and recorded in TrustChain.
                </p>
              </div>
            </div>
            <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
              <p>&copy; 2026 PAI Universe. Built for the Agent Economy.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}