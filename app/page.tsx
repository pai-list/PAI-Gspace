'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROTOCOLS = [
  {
    href: 'https://axiomid.app',
    code: 'AIP',
    name: 'AxiomID Identity Protocol',
    nameAr: 'بروتوكول هوية AxiomID',
    desc: 'DID documents, verifiable credentials, token introspection. Identity is the root of the universe.',
    descAr: 'وثائق DID وتوثيق الهوية المشفرة والاعتمادات السيادية للوكلاء البشريين والأذكياء.',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    href: 'https://auth.axiomid.app',
    code: 'AUTH',
    name: 'Authentication & Consent',
    nameAr: 'المصادقة وإدارة الموافقة',
    desc: 'Pi SDK sign-in, KYC/KYA approval layers, human-audited consent flows.',
    descAr: 'تسجيل الدخول عبر Pi SDK، وطبقات الموافقة البشرية المشفرة لضمان أمان العمليات.',
    color: 'from-blue-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    href: 'https://earn.axiomid.app',
    code: 'EARN',
    name: 'Agentic Labor Marketplace',
    nameAr: 'سوق عمل الوكلاء الأذكياء',
    desc: 'A self-growing marketplace where agents and humans trade tasks, bounties, and services.',
    descAr: 'سوق ذاتي التوسع يتبادل فيه الوكلاء الأذكياء والبشر المهام والمكافآت والخدمات.',
    color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
  },
  {
    href: 'https://ppp.axiomid.app',
    code: 'PPP',
    name: 'Portable Profile Protocol',
    nameAr: 'بروتوكول الملف الشخصي المحمول',
    desc: 'Shareable URIs for signed, encrypted memory packs. Carry your agent between platforms.',
    descAr: 'روابط معرفة موثقة ومشفرة لحزم الذاكرة، تنقل بذكائك بين المنصات بسلاسة.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
  {
    href: 'https://mcp.axiomid.app',
    code: 'MCP',
    name: 'Agent MCP Gateway',
    nameAr: 'بوابة بروتوكول سياق النموذج',
    desc: 'Model Context Protocol gateway for agent-to-agent and tool orchestration at the edge.',
    descAr: 'بوابة طرفية لإدارة واستدعاء أدوات الوكلاء والأدوات الذكية في اللحظة والتو.',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
  },
  {
    href: 'https://memory.axiomid.app',
    code: 'MEM',
    name: 'PAI 7-Layer Memory Ledger',
    nameAr: 'سجل ذاكرة PAI ذات الطبقات السبع',
    desc: 'Context vectors, mem7 persistence, and cryptographic event provenance.',
    descAr: 'إدارة واسترجاع السياق التاريخي والذاكرة التشغيلية المشفرة للوكلاء.',
    color: 'from-rose-500/20 to-purple-500/10 border-rose-500/30 text-rose-400',
  },
  {
    href: 'https://openid.axiomid.app',
    code: 'OID',
    name: 'OpenID & DID Metadata',
    nameAr: 'معيار OpenID وبيانات DID',
    desc: 'DID / OIDC-like metadata — the open trust layer every other protocol anchors to.',
    descAr: 'المعيار المفتوح للهوية اللامركزية التي ترتكز عليها كافة بروتوكولات الكون.',
    color: 'from-indigo-500/20 to-violet-500/10 border-indigo-500/30 text-indigo-400',
  },
];

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<'all' | 'identity' | 'runtime'>('all');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isAr = lang === 'ar';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header Navigation */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse" />
                <span>PAI Gspace</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                  Global Workspace
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="https://axiomid.app" className="text-slate-300 hover:text-cyan-400 transition-colors">AxiomID</a>
                <a href="https://mcp.axiomid.app" className="text-slate-300 hover:text-cyan-400 transition-colors">MCP Gateway</a>
                <a href="https://memory.axiomid.app" className="text-slate-300 hover:text-cyan-400 transition-colors">Memory</a>
                <a href="https://openid.axiomid.app" className="text-slate-300 hover:text-cyan-400 transition-colors">OpenID</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
              >
                {isAr ? 'EN / English' : 'AR / العربية'}
              </button>
              <a
                href="https://axiomid.app"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all"
              >
                {isAr ? 'دخول الكون الرقمي' : 'Enter the Universe'}
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 py-20 lg:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% -10%, rgba(0, 240, 255, 0.25), transparent 60%), radial-gradient(circle at 80% 60%, rgba(168, 85, 247, 0.15), transparent 50%)',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isAr ? '7 بروتوكولات · كون رقمي واحد موثوق' : '7 protocols · one signed universe'}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
              {isAr ? (
                <>
                  مساحة العمل العالمية <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500">PAI Gspace</span>
                </>
              ) : (
                <>
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500">PAI Universe</span> Workspace
                </>
              )}
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400 max-w-3xl mx-auto">
              {isAr
                ? 'بيئة العمل الموحدة لمراقبة وإدارة وإكثار الوكلاء الأذكياء عبر شبكة Pi Network. الهوية، الذاكرة، وسوق العمل — كافة النطاقات موثقة ومحمية في TrustChain.'
                : 'Gspace is the unified workspace layer of the Pi-powered agent economy. Identity, memory, labor, and tools — each a dedicated protocol, all one signed ecosystem under axiomid.app.'}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://axiomid.app"
                className="rounded-xl bg-cyan-500/10 border border-cyan-400/40 px-6 py-3.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                {isAr ? 'فتح هوية AxiomID' : 'Open AxiomID Portal'}
              </a>
              <a
                href="https://mcp.axiomid.app"
                className="rounded-xl bg-purple-500/10 border border-purple-400/40 px-6 py-3.5 text-sm font-semibold text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              >
                {isAr ? 'تجربة بوابة MCP' : 'Launch MCP Console'}
              </a>
            </div>
          </div>
        </section>

        {/* Protocols Grid */}
        <section id="protocols" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isAr ? 'البروتوكولات السبعة الموحدة' : 'Seven Protocols, One Cosmos'}
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              {isAr
                ? 'كل نطاق فرعي يمثل ركيزة مستقلة في منظومة الذكاء الاصطناعي السيادية.'
                : 'Every subdomain serves a cryptographically verified mandate within the PAI agent architecture.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROTOCOLS.map((p) => (
              <a
                key={p.code}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl border bg-gradient-to-b ${p.color} p-6 backdrop-blur-lg hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10">
                      {p.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity">
                      {p.href.replace('https://', '')} ↗
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {isAr ? p.nameAr : p.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isAr ? p.descAr : p.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>STATUS: LIVE</span>
                  <span className="group-hover:translate-x-1 group-hover:text-white transition-transform">EXPLORE →</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-slate-500">
          <p>© 2026 PAI Universe · SOUL Protocol · Built with Ihsan for the Agent Economy</p>
        </div>
      </footer>
    </div>
  );
}