import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                PAI Gspace
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/agents" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Agents
                </Link>
                <Link href="/workspaces" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Workspaces
                </Link>
                <Link href="/discovery" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Discovery
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Global Workspace for <span className="text-primary-600">AI Teams</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Monitor, collaborate, and coordinate AI agents across the entire PAI ecosystem.
              Built on AxiomID identity, ADP discovery, and 7-layer memory architecture.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="/register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="/demo"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Watch Demo
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeatureCard
              title="Agent Monitoring"
              description="Real-time visibility into agent health, memory layers, and task execution across all 7 memory layers."
              icon={<MonitorIcon />}
            />
            <FeatureCard
              title="Collaboration Hub"
              description="Shared workspaces with memory URL sharing, tool sharing, and agent-to-agent handoff via ADP protocol."
              icon={<CollabIcon />}
            />
            <FeatureCard
              title="Discovery Portal"
              description="ADP-powered agent discovery, capability browsing, and secure connection management with Pi Network identity."
              icon={<DiscoveryIcon />}
            />
          </div>
        </div>

        <footer className="border-t bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li><a href="/dashboard" className="hover:text-primary-600">Dashboard</a></li>
                  <li><a href="/agents" className="hover:text-primary-600">Agents</a></li>
                  <li><a href="/workspaces" className="hover:text-primary-600">Workspaces</a></li>
                  <li><a href="/discovery" className="hover:text-primary-600">Discovery</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Platform</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li><a href="/axiomid" className="hover:text-primary-600">AxiomID</a></li>
                  <li><a href="/adp" className="hover:text-primary-600">ADP Protocol</a></li>
                  <li><a href="/memory" className="hover:text-primary-600">PAI Memory</a></li>
                  <li><a href="/mcp" className="hover:text-primary-600">MCP Gateway</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Developers</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li><a href="/docs" className="hover:text-primary-600">Documentation</a></li>
                  <li><a href="/api" className="hover:text-primary-600">API Reference</a></li>
                  <li><a href="/sdk" className="hover:text-primary-600">SDK</a></li>
                  <li><a href="/cli" className="hover:text-primary-600">CLI</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li><a href="/about" className="hover:text-primary-600">About</a></li>
                  <li><a href="/blog" className="hover:text-primary-600">Blog</a></li>
                  <li><a href="/careers" className="hover:text-primary-600">Careers</a></li>
                  <li><a href="/contact" className="hover:text-primary-600">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
              <p>&copy; 2025 PAI Universe. Built for the Agent Economy.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function MonitorIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CollabIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function DiscoveryIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}