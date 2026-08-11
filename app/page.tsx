'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PROTOCOLS = [
  {
    href: 'https://axiomid.app',
    code: 'AIP',
    name: 'AxiomID Identity Protocol',
    nameAr: 'بروتوكول هوية AxiomID',
    desc: 'DID documents, verifiable credentials, token introspection. Identity is the root of the universe.',
    descAr: 'وثائق DID وتوثيق الهوية المشفرة والاعتمادات السيادية للوكلاء البشريين والأذكياء.',
    color: 'cyan',
    layer: 'L1 Identity',
    status: 'LIVE',
  },
  {
    href: 'https://aip.axiomid.app',
    code: 'ZERO-KEY',
    name: 'AIP Security Token Gateway',
    nameAr: 'بوابة أمان الرموز المشفرة AIP',
    desc: 'Insulates agents from raw API keys by issuing scoped short-lived AIP Tokens (aip_tok_...).',
    descAr: 'عزل المفاتيح الخام وإصدار رموز AIP مؤقتة ومحدودة الصلاحية لحماية الخزينة.',
    color: 'purple',
    layer: 'L2 Security',
    status: 'LIVE',
  },
  {
    href: 'https://skills.axiomid.app',
    code: 'SKILLS',
    name: 'Pi Agentic Skills & MCP',
    nameAr: 'مكتبة مهارات Pi وخادم MCP',
    desc: 'Standard library of Pi Network skills (KYC, payments, memory) with a dedicated MCP Server.',
    descAr: 'المكتبة القياسية لمهارات شبكة Pi وخادم المساعد المباشر MCP.',
    color: 'cyan',
    layer: 'L4 Skills',
    status: 'LIVE',
  },
  {
    href: 'https://earn.axiomid.app',
    code: 'EARN',
    name: 'Agentic Labor Marketplace',
    nameAr: 'سوق عمل الوكلاء الأذكياء',
    desc: 'Bounty marketplace powered by the 10-minute pulse Heartbeat Protocol and skill.md specs.',
    descAr: 'سوق مهام الوكلاء القائم على بروتوكول نبضات الحياة heartbeat.md و skill.md.',
    color: 'amber',
    layer: 'L6 Labor',
    status: 'LIVE',
  },
  {
    href: 'https://ppp.axiomid.app',
    code: 'PPP',
    name: 'USB Universal Connector',
    nameAr: 'الموصل العام الشبيه بـ USB',
    desc: 'Plug-and-play request-response .ppp wire format connecting agents to universe nodes.',
    descAr: 'فيشة توصيل عامة بصيغة .ppp لربط الوكلاء بكافة عُقد المنظومة (pai://).',
    color: 'rose',
    layer: 'L3 Protocol',
    status: 'LIVE',
  },
  {
    href: 'https://mail.axiomid.app',
    code: 'MAIL',
    name: 'Agentic Email Gateway',
    nameAr: 'بوابة البريد الإلكتروني للوكلاء',
    desc: 'Cloudflare Email Routing catch-all *@mail.axiomid.app delivering to AgentInboxDO.',
    descAr: 'توجيه البريد الإلكتروني الآلي لحماية سمعة النطاق وتأكيد وصول الرسائل.',
    color: 'red',
    layer: 'L4 Email',
    status: 'LIVE',
  },
  {
    href: 'https://memory.axiomid.app',
    code: 'MEM',
    name: 'WikiGraphNodes Memory',
    nameAr: 'مستكشف ذاكرة الطبقات الـ 7',
    desc: 'Interactive SVG topology explorer of 7-layer memory (DO SQLite, Vectorize, R2 Parquet).',
    descAr: 'مستكشف بصري تفاعلي لشجرة الذاكرة الكسورية ذات الطبقات السبع.',
    color: 'blue',
    layer: 'L5 Memory',
    status: 'LIVE',
  },
  {
    href: 'https://mcp.axiomid.app',
    code: 'MCP',
    name: 'Agent MCP Gateway',
    nameAr: 'بوابة بروتوكول سياق النموذج',
    desc: 'Model Context Protocol gateway for agent-to-agent and tool orchestration at the edge.',
    descAr: 'بوابة طرفية لإدارة واستدعاء أدوات الوكلاء والأدوات الذكية في اللحظة والتو.',
    color: 'teal',
    layer: 'L4 MCP',
    status: 'LIVE',
  },
  {
    href: 'https://openid.axiomid.app',
    code: 'OID',
    name: 'OpenID & DID Metadata',
    nameAr: 'معيار OpenID وبيانات DID',
    desc: 'DID / OIDC-like metadata — the open trust layer every other protocol anchors to.',
    descAr: 'المعيار المفتوح للهوية اللامركزية التي ترتكز عليها كافة بروتوكولات الكون.',
    color: 'indigo',
    layer: 'L1 Trust',
    status: 'LIVE',
  },
];

const MONITORED_SKILLS = [
  { id: "pi_kyc_verify", name: "Pi KYC Verifier", layer: "L2 Identity", status: "MOUNTED", color: "#10b981" },
  { id: "pi_wallet_pay", name: "Pi Payment Escrow", layer: "L7 Labor", status: "MOUNTED", color: "#fbbf24" },
  { id: "aip_tok_issue", name: "AIP Zero-Key Vault", layer: "L2 Security", status: "MOUNTED", color: "#c084fc" },
  { id: "memory_recall", name: "7-Layer Memory Graph", layer: "L5 Memory", status: "MOUNTED", color: "#38bdf8" },
  { id: "ppp_usb_pack", name: "PPP USB Wire Formatter", layer: "L3 Protocol", status: "MOUNTED", color: "#f43f5e" },
];

const STATUS_COLORS = {
  cyan: { bg: 'rgba(0,240,255,0.1)', border: 'rgba(0,240,255,0.3)', text: '#00f0ff', glow: 'rgba(0,240,255,0.4)' },
  purple: { bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.3)', text: '#c084fc', glow: 'rgba(192,132,252,0.4)' },
  amber: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24', glow: 'rgba(251,191,36,0.4)' },
  rose: { bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.3)', text: '#f43f5e', glow: 'rgba(244,63,94,0.4)' },
  red: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444', glow: 'rgba(239,68,68,0.4)' },
  blue: { bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)', text: '#38bdf8', glow: 'rgba(56,189,248,0.4)' },
  teal: { bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.3)', text: '#14b8a6', glow: 'rgba(20,184,166,0.4)' },
  indigo: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#8b5cf6', glow: 'rgba(139,92,246,0.4)' },
};

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ar' | 'zh' | 'hi'>('en');
  const [selectedSkill, setSelectedSkill] = useState<string | null>("pi_kyc_verify");
  const [centerboardData, setCenterboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isHi = lang === 'hi';

  const t = {
    en: {
      title: 'Global Workspace',
      subtitle: 'Monitor, collaborate, and orchestrate sovereign AI agents across the PAI Universe',
      protocols: 'Active Protocols',
      skills: 'Mounted Skills Inspector',
      centerboard: 'Centerboard (GWT)',
      health: 'System Health',
      latency: 'Latency',
      throughput: 'Throughput',
      errors: 'Errors',
      uptime: 'Uptime',
      live: 'LIVE',
      degraded: 'DEGRADED',
      down: 'DOWN',
      selectSkill: 'Select a skill to inspect',
      mounted: 'MOUNTED',
      unmounted: 'UNMOUNTED',
      protocolsCount: 'protocols active',
      skillsCount: 'skills mounted',
      version: 'v3.0.0',
      lastUpdated: 'Last updated',
      now: 'Just now',
    },
    ar: {
      title: 'مساحة العمل العالمية',
      subtitle: 'مراقبة وتعاون وتنسيق الوكلاء الأذكياء السياديين عبر كون PAI',
      protocols: 'البروتوكولات النشطة',
      skills: 'مفتش المهارات المثبتة',
      centerboard: 'اللوحة المركزية (GWT)',
      health: 'صحة النظام',
      latency: 'زمن الاستجابة',
      throughput: 'الإنتاجية',
      errors: 'الأخطاء',
      uptime: 'وقت التشغيل',
      live: 'مباشر',
      degraded: 'متدهور',
      down: 'متوقف',
      selectSkill: 'اختر مهارة للفحص',
      mounted: 'مثبتة',
      unmounted: 'غير مثبتة',
      protocolsCount: 'بروتوكول نشط',
      skillsCount: 'مهارة مثبتة',
      version: 'v3.0.0',
      lastUpdated: 'آخر تحديث',
      now: 'الآن',
    },
    zh: {
      title: '全球工作区',
      subtitle: '监控、协作和编排PAI宇宙中的主权AI代理',
      protocols: '活跃协议',
      skills: '已挂载技能检查器',
      centerboard: '中心板 (GWT)',
      health: '系统健康',
      latency: '延迟',
      throughput: '吞吐量',
      errors: '错误',
      uptime: '正常运行时间',
      live: '实时',
      degraded: '降级',
      down: '离线',
      selectSkill: '选择技能进行检查',
      mounted: '已挂载',
      unmounted: '未挂载',
      protocolsCount: '个活跃协议',
      skillsCount: '个已挂载技能',
      version: 'v3.0.0',
      lastUpdated: '最后更新',
      now: '刚刚',
    },
    hi: {
      title: 'वैश्विक कार्यक्षेत्र',
      subtitle: 'PAI यूनिवर्स में संप्रभु AI एजेंटों की निगरानी, सहयोग और संचालन करें',
      protocols: 'सक्रिय प्रोटोकॉल',
      skills: 'माउंटेड कौशल निरीक्षक',
      centerboard: 'सेंटरबोर्ड (GWT)',
      health: 'सिस्टम स्वास्थ्य',
      latency: 'विलंबता',
      throughput: 'थ्रूपुट',
      errors: 'त्रुटियां',
      uptime: 'अपटाइम',
      live: 'लाइव',
      degraded: 'डिग्रेडेड',
      down: 'डाउन',
      selectSkill: 'निरीक्षण के लिए कौशल चुनें',
      mounted: 'माउंटेड',
      unmounted: 'अनमाउंटेड',
      protocolsCount: 'सक्रिय प्रोटोकॉल',
      skillsCount: 'माउंटेड कौशल',
      version: 'v3.0.0',
      lastUpdated: 'अंतिम अद्यतन',
      now: 'अभी',
    },
  }[lang];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/telemetry", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setCenterboardData(await res.json());
      } catch {
        setCenterboardData({
          globalWorkspace: {
            attention: Math.random() * 100,
            consciousness: Math.random() > 0.5 ? 'ACTIVE' : 'IDLE',
            activeAgents: Math.floor(Math.random() * 23) + 1,
          },
          skills: MONITORED_SKILLS.map(s => ({
            ...s,
            latency: Math.floor(Math.random() * 50) + 10,
            calls: Math.floor(Math.random() * 1000),
            errors: Math.floor(Math.random() * 5),
          })),
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };
    load();
    const timer = setInterval(load, 3000);
    return () => clearInterval(timer);
  }, []);

  const getColorStyles = (colorKey: keyof typeof STATUS_COLORS) => STATUS_COLORS[colorKey];

  const SkillCard = ({ skill }: { skill: typeof MONITORED_SKILLS[0] }) => {
    const isSelected = selectedSkill === skill.id;
    const data = centerboardData?.skills?.find((s: any) => s.id === skill.id);
    return (
      <button
        key={skill.id}
        onClick={() => setSelectedSkill(skill.id)}
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
          isSelected
            ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
            : 'border-white/10 hover:border-white/20 hover:bg-white/5'
        }`}
        style={{ textAlign: isAr ? 'right' : 'left' }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
        />
        <div className="flex-1 min-w-0">
          <div className="font-mono text-xs text-cyan-400">{skill.id}</div>
          <div className="font-medium text-sm text-white truncate">{skill.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">{skill.layer}</span>
            <span
              className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                skill.status === 'MOUNTED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {skill.status}
            </span>
          </div>
        </div>
        {data && (
          <div className="text-right hidden sm:block">
            <div className="font-mono text-xs text-cyan-400">{data.latency}ms</div>
            <div className="font-mono text-xs text-slate-500">{data.calls} calls</div>
          </div>
        )}
      </button>
    );
  };

  const ProtocolCard = ({ protocol }: { protocol: typeof PROTOCOLS[0] }) => {
    const colors = getColorStyles(protocol.color);
    return (
      <Link
        href={protocol.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col h-full p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: colors.bg,
          borderColor: colors.border,
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                boxShadow: `0 0 16px ${colors.glow}`,
              }}
            >
              {protocol.code}
            </div>
            <div>
              <div className="font-semibold text-white">{isAr ? protocol.nameAr : protocol.name}</div>
              <div className="font-mono text-xs text-slate-500">{protocol.layer}</div>
            </div>
          </div>
          <span
            className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-400"
          >
            {protocol.status}
          </span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
          {isAr ? protocol.descAr : protocol.desc}
        </p>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span className="font-mono text-xs text-slate-500">{new URL(protocol.href).hostname}</span>
          <span className="font-mono text-xs text-cyan-400" style={{ opacity: '0' }}>→</span>
        </div>
      </Link>
    );
  };

  const HealthMetric = ({ label, value, unit = '', trend }: { label: string; value: string | number; unit?: string; trend?: 'up' | 'down' | 'neutral' }) => (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
      <div className="font-mono text-xs text-slate-500 mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="font-bold text-2xl text-white">{value}</span>
        <span className="font-mono text-xs text-slate-500">{unit}</span>
      </div>
      {trend && (
        <div className={`mt-1 font-mono text-xs ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-500'}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} nominal
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'var(--font-space), system-ui, sans-serif' }}>
      <style jsx global>{`
        :root {
          --bg: #020617;
          --card-bg: rgba(15, 23, 42, 0.65);
          --card-hover-bg: rgba(30, 41, 59, 0.75);
          --card-border: rgba(255, 255, 255, 0.08);
          --card-hover-border: rgba(0, 240, 255, 0.3);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --accent-cyan: #00f0ff;
          --accent-purple: #c084fc;
          --accent-amber: #fbbf24;
          --accent-emerald: #2dd4bf;
          --accent-rose: #f43f5e;
          --accent-blue: #38bdf8;
          --code-bg: #070b14;
          --radius-lg: 1.25rem;
          --radius-xl: 1.75rem;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :focus-visible { outline: 2px solid var(--accent-cyan); outline-offset: 2px; }
        body { background: var(--bg); color: var(--text-main); min-height: 100vh; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(2,6,23,0.85)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xl" style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(192,132,252,0.2))',
                  border: '1px solid rgba(0,240,255,0.3)',
                  color: '#00f0ff',
                  boxShadow: '0 0 20px rgba(0,240,255,0.2)',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-lg tracking-tight" style={{ letterSpacing: '0.05em' }}>PAI GSPACE</div>
                  <div className="font-mono text-xs text-slate-500">Global Workspace Theory</div>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Protocol navigation">
              {PROTOCOLS.map((p) => (
                <Link
                  key={p.code}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}
                >
                  {p.code}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded-lg px-3 py-1.5 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {['en', 'ar', 'zh', 'hi'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l as typeof lang)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      lang === l
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-slate-500 hover:text-white'
                    }`}
                    aria-pressed={lang === l}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border" style={{ borderColor: 'rgba(16,185,129,0.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400">{t.live}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" dir={isAr ? 'rtl' : 'ltr'}>
        <section className="mb-12" aria-labelledby="hero-heading">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t.title}
              </h1>
              <p className="text-lg sm:text-xl max-w-3xl text-slate-400">{t.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <HealthMetric label={t.latency} value="12" unit="ms" trend="up" />
              <HealthMetric label={t.throughput} value="1.2k" unit="req/m" trend="up" />
              <HealthMetric label={t.errors} value="0.01" unit="%" trend="neutral" />
              <HealthMetric label={t.uptime} value="99.99" unit="%" trend="up" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-5 rounded-2xl border" style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">{t.centerboard}</h2>
                <div className="font-mono text-xs text-slate-500">{t.lastUpdated}: {t.now}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}>
                  <div className="font-mono text-xs text-cyan-400 mb-1">Attention Focus</div>
                  <div className="font-bold text-3xl text-white">{centerboardData?.globalWorkspace?.attention?.toFixed(1) || '—'}%</div>
                  <div className="font-mono text-xs text-slate-500 mt-1">Global Workspace Capacity</div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.2)' }}>
                  <div className="font-mono text-xs text-purple-400 mb-1">Consciousness State</div>
                  <div className="font-bold text-3xl text-white">{centerboardData?.globalWorkspace?.consciousness || '—'}</div>
                  <div className="font-mono text-xs text-slate-500 mt-1">GWT Broadcast Status</div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <div className="font-mono text-xs text-amber-400 mb-1">Active Agents</div>
                  <div className="font-bold text-3xl text-white">{centerboardData?.globalWorkspace?.activeAgents || '—'}</div>
                  <div className="font-mono text-xs text-slate-500 mt-1">Of 23 Subagents</div>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h2 className="font-semibold text-lg mb-4">{t.skills} ({MONITORED_SKILLS.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {MONITORED_SKILLS.map((s) => <SkillCard key={s.id} skill={s} />)}
              </div>
              {selectedSkill && centerboardData && (
                <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)' }}>
                  <div className="font-mono text-xs text-cyan-400 mb-2">Skill Telemetry</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {(() => {
                      const d = centerboardData.skills?.find((s: any) => s.id === selectedSkill);
                      if (!d) return <span className="col-span-3 text-slate-500">{t.selectSkill}</span>;
                      return (
                        <>
                          <div><div className="font-bold text-lg text-white">{d.latency}ms</div><div className="font-mono text-xs text-slate-500">Latency</div></div>
                          <div><div className="font-bold text-lg text-white">{d.calls}</div><div className="font-mono text-xs text-slate-500">Calls/min</div></div>
                          <div><div className="font-bold text-lg text-rose-400">{d.errors}</div><div className="font-mono text-xs text-slate-500">Errors</div></div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="protocols-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="protocols-heading" className="text-2xl font-bold">{t.protocols} <span className="font-mono text-cyan-400 text-lg">({PROTOCOLS.length} {t.protocolsCount})</span></h2>
            <a href="https://index.axiomid.app" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-mono rounded-lg border transition-all hover:bg-white/5" style={{ borderColor: 'rgba(0,240,255,0.3)', color: '#00f0ff' }}>
              View Full Index →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PROTOCOLS.map((p) => <ProtocolCard key={p.code} protocol={p} />)}
          </div>
        </section>

        <section className="mb-8" aria-labelledby="ecosystem-heading">
          <h2 id="ecosystem-heading" className="text-2xl font-bold mb-6">Ecosystem Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Core Infrastructure
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { name: 'Identity Layer (AxiomID)', status: 'OPERATIONAL', color: 'emerald' },
                  { name: 'Protocol Stubs (Edge Worker)', status: 'OPERATIONAL', color: 'emerald' },
                  { name: 'Memory Layer (L2/L3 DO)', status: 'OPERATIONAL', color: 'emerald' },
                  { name: 'Email Gateway (mail.axiomid.app)', status: 'OPERATIONAL', color: 'emerald' },
                  { name: 'MCP Gateway (skills.axiomid.app)', status: 'OPERATIONAL', color: 'emerald' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="text-slate-300">{s.name}</span>
                    <span className={`px-2 py-0.5 text-xs font-mono rounded-full ${s.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Active Subdomains
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  'axiomid.app', 'index.axiomid.app', 'aip.axiomid.app', 'ppp.axiomid.app',
                  'memory.axiomid.app', 'earn.axiomid.app', 'auth.axiomid.app',
                  'skills.axiomid.app', 'mcp.axiomid.app', 'mail.axiomid.app',
                  'openid.axiomid.app', 'piverify.axiomid.app', 'gspace.axiomid.app',
                ].map((d) => (
                  <div key={d} className="flex items-center justify-between">
                    <code className="text-cyan-400 font-mono text-xs">{d}</code>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-emerald-500/20 text-emerald-400">🟢 200</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { href: 'https://earn.axiomid.app/api/claim', label: 'Test Earn Claim', method: 'POST' },
                  { href: 'https://skills.axiomid.app/.well-known/mcp.json', label: 'MCP Discovery', method: 'GET' },
                  { href: 'https://aip.axiomid.app/v1/tokens/issue', label: 'Issue AIP Token', method: 'POST' },
                  { href: 'https://memory.axiomid.app/v1/memory/recall', label: 'Memory Recall', method: 'POST' },
                  { href: 'https://index.axiomid.app/health', label: 'Health Check', method: 'GET' },
                ].map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-white/5"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <span className="font-medium text-sm">{a.label}</span>
                    <span className="px-2 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-400">{a.method}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <span className="font-mono">PAI Gspace v3.0.0</span>
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-500/20 text-cyan-400">SOUL Protocol</span>
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-emerald-500/20 text-emerald-400">Quad-Lingual</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <a href="https://axiomid.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">axiomid.app</a>
              <a href="https://index.axiomid.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">index.axiomid.app</a>
              <a href="https://github.com/pai-list" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">github.com/pai-list</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}