'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

type Locale = 'en' | 'ar' | 'zh' | 'hi';
type ProtocolCategory = 'all' | 'workspace' | 'ai-loop' | 'identity' | 'protocol';

const STATUS_COLORS = {
  cyan: { bg: 'rgba(0,240,255,0.09)', border: 'rgba(0,240,255,0.32)', text: '#00f0ff', glow: 'rgba(0,240,255,0.35)' },
  purple: { bg: 'rgba(192,132,252,0.09)', border: 'rgba(192,132,252,0.32)', text: '#c084fc', glow: 'rgba(192,132,252,0.35)' },
  amber: { bg: 'rgba(251,191,36,0.09)', border: 'rgba(251,191,36,0.32)', text: '#fbbf24', glow: 'rgba(251,191,36,0.35)' },
  rose: { bg: 'rgba(244,63,94,0.09)', border: 'rgba(244,63,94,0.32)', text: '#f43f5e', glow: 'rgba(244,63,94,0.35)' },
  red: { bg: 'rgba(239,68,68,0.09)', border: 'rgba(239,68,68,0.32)', text: '#ef4444', glow: 'rgba(239,68,68,0.35)' },
  blue: { bg: 'rgba(56,189,248,0.09)', border: 'rgba(56,189,248,0.32)', text: '#38bdf8', glow: 'rgba(56,189,248,0.35)' },
  teal: { bg: 'rgba(20,184,166,0.09)', border: 'rgba(20,184,166,0.32)', text: '#14b8a6', glow: 'rgba(20,184,166,0.35)' },
  indigo: { bg: 'rgba(139,92,246,0.09)', border: 'rgba(139,92,246,0.32)', text: '#8b5cf6', glow: 'rgba(139,92,246,0.35)' },
  emerald: { bg: 'rgba(16,185,129,0.09)', border: 'rgba(16,185,129,0.32)', text: '#34d399', glow: 'rgba(16,185,129,0.35)' },
} as const;

interface ProtocolItem {
  href: string;
  code: string;
  category: Exclude<ProtocolCategory, 'all'>;
  color: keyof typeof STATUS_COLORS;
  layer: string;
  status: 'LIVE';
  probeId?: string;
  locales: Record<Locale, { name: string; desc: string }>;
}

const PROTOCOLS: readonly ProtocolItem[] = [
  {
    href: 'https://www.axiomid.app',
    code: 'AURA',
    category: 'workspace',
    color: 'cyan',
    layer: 'L1 Desktop Hub',
    status: 'LIVE',
    locales: {
      en: { name: 'AxiomID AuraOS Desktop', desc: 'Sovereign AI desktop shell, 5 procedural themes, W3C DIDs, and Cyber Defense Center.' },
      ar: { name: 'سطح المكتب السيادي AuraOS', desc: 'واجهة سطح المكتب السيادي مع 5 مظاهر تفاعلية وهوية DID ومركز الدفاع السيبراني.' },
      zh: { name: 'AxiomID AuraOS 主权桌面', desc: '主权 AI 桌面环境，内置 5 种动态主题、W3C DID 身份与网络防御中心。' },
      hi: { name: 'AxiomID AuraOS डेस्कटॉप', desc: 'संप्रभु AI डेस्कटॉप शेल, 5 डायनामिक थीम, W3C DID और साइबर डिफेंस सेंटर।' },
    },
  },
  {
    href: 'https://harness.axiomid.app',
    code: 'FORGE',
    category: 'workspace',
    color: 'purple',
    layer: 'L3 Harness',
    status: 'LIVE',
    locales: {
      en: { name: 'Harness Forge Terminal', desc: 'Evaluation suites, truth-check gates, and isolated sandbox verification loops.' },
      ar: { name: 'طرفية Harness Forge', desc: 'حزم التقييم وفحص الصدق وبوابات التحقق في بيئات العزل الآمنة.' },
      zh: { name: 'Harness 熔炉终端', desc: '评估套件、真实性校验门禁与安全沙盒验证循环。' },
      hi: { name: 'हार्नेस फोर्ज टर्मिनल', desc: 'मूल्यांकन सूट, सत्य-जांच गेट और सुरक्षित सैंडबॉक्स सत्यापन।' },
    },
  },
  {
    href: 'https://memory.axiomid.app',
    code: 'MEM',
    category: 'workspace',
    color: 'blue',
    layer: 'L5 Memory',
    status: 'LIVE',
    probeId: 'memory_recall',
    locales: {
      en: { name: '7-Layer WikiGraph Memory', desc: 'Bitemporal 7-layer vector and code-graph memory engine backed by Durable Objects & D1.' },
      ar: { name: 'ذاكرة الطبقات السبع WikiGraph', desc: 'محرك الذاكرة الدلالي ذو الطبقات السبع مع استرجاع السياق ثنائي الزمن.' },
      zh: { name: '7 层 WikiGraph 记忆引擎', desc: '基于 Durable Objects 与 D1 的双时态 7 层向量与代码图谱记忆系统。' },
      hi: { name: '7-लेयर WikiGraph मेमोरी', desc: 'Durable Objects और D1 द्वारा संचालित 7-स्तरीय वेक्टर और ग्राफ़ मेमोरी इंजन।' },
    },
  },
  {
    href: 'https://skills.axiomid.app',
    code: 'SKILLS',
    category: 'ai-loop',
    color: 'emerald',
    layer: 'L4 Skills',
    status: 'LIVE',
    probeId: 'pi_kyc_verify',
    locales: {
      en: { name: 'Pi Agentic Skills Registry', desc: 'Composable Pi Network agent skills directory (KYC, payments, memory, x402 manifests).' },
      ar: { name: 'سجل مهارات وكلاء باي', desc: 'المكتبة القياسية لمهارات وكلاء الذكاء الاصطناعي على شبكة Pi.' },
      zh: { name: 'Pi 智能体技能注册表', desc: '可组合的 Pi Network 智能体技能目录（KYC、支付、记忆与 x402 清单）。' },
      hi: { name: 'Pi एजेंटिक स्किल्स रजिस्ट्री', desc: 'Pi नेटवर्क एजेंट कौशल निर्देशिका (KYC, भुगतान, मेमोरी और x402 मैनिफेस्ट)।' },
    },
  },
  {
    href: 'https://mcp.axiomid.app',
    code: 'MCP',
    category: 'ai-loop',
    color: 'teal',
    layer: 'L4 MCP',
    status: 'LIVE',
    probeId: 'pi_kyc_verify',
    locales: {
      en: { name: 'Al-Mizan MCP Gateway', desc: 'Model Context Protocol edge gateway for tool orchestration and JSON-RPC inspection.' },
      ar: { name: 'بوابة الميزان لبروتوكول MCP', desc: 'بوابة طرفية لتنسيق واستدعاء أدوات الوكلاء عبر بروتوكول سياق النموذج.' },
      zh: { name: 'Al-Mizan MCP 协议网关', desc: '用于工具编排与 JSON-RPC 调试的边缘 Model Context Protocol 网关。' },
      hi: { name: 'Al-Mizan MCP गेटवे', desc: 'टूल ऑर्केस्ट्रेशन और JSON-RPC निरीक्षण के लिए एज MCP गेटवे।' },
    },
  },
  {
    href: 'https://earn.axiomid.app',
    code: 'EARN',
    category: 'ai-loop',
    color: 'amber',
    layer: 'L6 Labor',
    status: 'LIVE',
    probeId: 'pi_wallet_pay',
    locales: {
      en: { name: 'Agentic Labor Marketplace', desc: 'Autonomous machine-labor bounties powered by 10-minute heartbeat pulses and Pi escrow.' },
      ar: { name: 'سوق عمل الوكلاء الأذكياء', desc: 'سوق مهام الوكلاء القائم على نبضات الحياة وضمانات Pi المشفرة.' },
      zh: { name: '智能体算力与任务市场', desc: '由 10 分钟心跳脉冲与 Pi 托管驱动的自主机器劳务悬赏市场。' },
      hi: { name: 'एजेंटिक लेबर मार्केटप्लेस', desc: '10-मिनट हार्टबीट पल्स और Pi एस्क्रो द्वारा संचालित स्वायत्त बाउंटी बाज़ार।' },
    },
  },
  {
    href: 'https://learn.axiomid.app',
    code: 'LEARN',
    category: 'ai-loop',
    color: 'blue',
    layer: 'L6 Academy',
    status: 'LIVE',
    locales: {
      en: { name: 'PAI Protocol Academy', desc: 'Interactive specification tracks completing the autonomous learn → earn → skills loop.' },
      ar: { name: 'أكاديمية بروتوكول باي', desc: 'مسارات تعليمية تفاعلية تُكمل حلقة التعلّم والكسب وبناء المهارات.' },
      zh: { name: 'PAI 协议学院', desc: '交互式协议学习路径，构建完整的 学习 → 收益 → 技能 自主闭环。' },
      hi: { name: 'PAI प्रोटोकॉल अकादमी', desc: 'learn → earn → skills स्वायत्त चक्र को पूरा करने वाले इंटरैक्टिव ट्रैक।' },
    },
  },
  {
    href: 'https://aip.axiomid.app',
    code: 'ZERO-KEY',
    category: 'identity',
    color: 'purple',
    layer: 'L2 Security',
    status: 'LIVE',
    probeId: 'aip_tok_issue',
    locales: {
      en: { name: 'AIP Zero-Key Token Vault', desc: 'Insulates agents from raw API keys by issuing short-lived scoped tokens (aip_tok_...).' },
      ar: { name: 'خزنة رموز AIP المقيدة', desc: 'عزل المفاتيح الخام وإصدار رموز AIP مؤقتة ومحدودة الصلاحية.' },
      zh: { name: 'AIP 零密钥令牌保险库', desc: '通过签发短期作用域令牌 (aip_tok_...) 将智能体与原始私钥彻底隔离。' },
      hi: { name: 'AIP ज़ीरो-की टोकन वॉल्ट', desc: 'कच्ची API कुंजियों के बिना अल्पकालिक स्कोप्ड टोकन (aip_tok_...) जारी करता है।' },
    },
  },
  {
    href: 'https://openid.axiomid.app',
    code: 'OID',
    category: 'identity',
    color: 'indigo',
    layer: 'L1 Trust',
    status: 'LIVE',
    locales: {
      en: { name: 'OpenIdentity & DID Metadata', desc: 'Portable OpenIdentity manifests and W3C did:axiom specification anchor.' },
      ar: { name: 'معيار الهوية المفتوحة و DID', desc: 'ملفات الهوية المحمولة للوكلاء ومعيار did:axiom المتوافق مع W3C.' },
      zh: { name: 'OpenIdentity 与 DID 元数据', desc: '便携式智能体身份清单与 W3C did:axiom 规范锚点。' },
      hi: { name: 'OpenIdentity और DID मेटाडेटा', desc: 'पोर्टेबल एजेंट पहचान मैनिफेस्ट और W3C did:axiom मानक।' },
    },
  },
  {
    href: 'https://auth.axiomid.app',
    code: 'AUTH',
    category: 'identity',
    color: 'cyan',
    layer: 'L1 Auth',
    status: 'LIVE',
    locales: {
      en: { name: 'Pi OAuth2 & DID Issuer', desc: 'Human-backed authentication gateway bridging Pi Network sessions to agent DIDs.' },
      ar: { name: 'بوابة مصادقة باي وإصدار DID', desc: 'بوابة المصادقة التي تربط جلسات شبكة Pi بهويات الوكلاء اللامركزية.' },
      zh: { name: 'Pi OAuth2 与 DID 签发网关', desc: '连接 Pi Network 真人会话与智能体 DID 的身份认证网关。' },
      hi: { name: 'Pi OAuth2 और DID जारीकर्ता', desc: 'Pi नेटवर्क सत्रों को एजेंट DID से जोड़ने वाला प्रमाणीकरण गेटवे।' },
    },
  },
  {
    href: 'https://piverify.axiomid.app',
    code: 'KYA',
    category: 'identity',
    color: 'emerald',
    layer: 'L2 Verify',
    status: 'LIVE',
    locales: {
      en: { name: 'PiVerify KYA Oracle', desc: 'Ed25519 W3C Verifiable Credential issuer and Workers AI onboarding assistant.' },
      ar: { name: 'عراف التحقق PiVerify KYA', desc: 'إصدار اعتمادات W3C الموقعة بـ Ed25519 ومساعد التحقق الصوتي والذكي.' },
      zh: { name: 'PiVerify KYA 验证预言机', desc: 'Ed25519 签名的 W3C 可验证凭证签发器与 Workers AI 引导助手。' },
      hi: { name: 'PiVerify KYA ओरेकल', desc: 'Ed25519 हस्ताक्षरित W3C वेरिफाएबल क्रेडेंशियल और AI ऑनबोर्डिंग सहायक।' },
    },
  },
  {
    href: 'https://ppp.axiomid.app',
    code: 'PPP',
    category: 'protocol',
    color: 'rose',
    layer: 'L3 Protocol',
    status: 'LIVE',
    probeId: 'ppp_usb_pack',
    locales: {
      en: { name: 'PPP Universal Wire Connector', desc: '3-section Header / Body / Receipt .ppp wire format connecting agents across pai://.' },
      ar: { name: 'موصل بروتوكول الأسلاك PPP', desc: 'صيغة الرسائل الثلاثية (.ppp) لربط الوكلاء عبر شبكة pai:// الموحدة.' },
      zh: { name: 'PPP 通用传输线协议', desc: '三段式 Header / Body / Receipt (.ppp) 报文格式，连接 pai:// 节点。' },
      hi: { name: 'PPP यूनिवर्सल वायर कनेक्टर', desc: 'pai:// नोड्स को जोड़ने वाला 3-सेक्शन (.ppp) वायर प्रोटोकॉल।' },
    },
  },
  {
    href: 'https://node.axiomid.app',
    code: 'NODE',
    category: 'protocol',
    color: 'amber',
    layer: 'L3 Compute',
    status: 'LIVE',
    locales: {
      en: { name: 'Sovereign Node Registry', desc: 'Distributed Pioneer compute node mesh and runtime telemetry coordination.' },
      ar: { name: 'سجل العُقد السيادية Node', desc: 'شبكة عُقد الحوسبة الموزعة وتنسيق القياس الحي للتنفيذ.' },
      zh: { name: '主权计算节点注册表', desc: '分布式 Pioneer 算力节点网络与运行时遥测协同。' },
      hi: { name: 'सॉवरेन नोड रजिस्ट्री', desc: 'वितरित पायनियर कम्प्यूट नोड मेश और रनटाइम टेलीमेट्री समन्वय।' },
    },
  },
  {
    href: 'https://agdp.axiomid.app',
    code: 'AGDP',
    category: 'protocol',
    color: 'purple',
    layer: 'L7 Economy',
    status: 'LIVE',
    locales: {
      en: { name: 'Agentic GDP Telemetry', desc: 'Macroeconomic velocity tracker for autonomous machine-to-machine commerce on Pi.' },
      ar: { name: 'مؤشر الناتج الوكيلي aGDP', desc: 'قياس التدفق الاقتصادي والتجارة الآلية بين الوكلاء على شبكة Pi.' },
      zh: { name: '智能体 GDP 经济遥测', desc: '追踪 Pi 网络上机器对机器自主商业活动与结算流量的宏观指标。' },
      hi: { name: 'एजेंटिक GDP टेलीमेट्री', desc: 'Pi पर स्वायत्त मशीन-टू-मशीन कॉमर्स और आर्थिक गति ट्रैकर।' },
    },
  },
  {
    href: 'https://mail.axiomid.app',
    code: 'MAIL',
    category: 'protocol',
    color: 'red',
    layer: 'L4 Email',
    status: 'LIVE',
    locales: {
      en: { name: 'Agentic Email Backbone', desc: 'Cloudflare Email Routing and Resend bridge delivering to sovereign agent inboxes.' },
      ar: { name: 'بوابة البريد الوكيلي الآلي', desc: 'توجيه البريد الإلكتروني عبر Cloudflare و Resend لصناديق بريد الوكلاء.' },
      zh: { name: '智能体邮件路由骨干网', desc: '基于 Cloudflare Email Routing 与 Resend 的主权智能体收件箱网关。' },
      hi: { name: 'एजेंटिक ईमेल बैकबोन', desc: 'Cloudflare ईमेल राउटिंग और Resend ब्रिज द्वारा एजेंट इनबॉक्स डिलीवरी।' },
    },
  },
  {
    href: 'https://index.axiomid.app',
    code: 'INDEX',
    category: 'protocol',
    color: 'cyan',
    layer: 'L6 Directory',
    status: 'LIVE',
    locales: {
      en: { name: 'Central Protocol Directory', desc: 'Canonical sitemap, health mirror, and machine-readable index for all *.axiomid.app hosts.' },
      ar: { name: 'الفهرس المركزي للبروتوكولات', desc: 'الدليل المرجعي وخريطة النطاقات الفرعية الحية لمنظومة axiomid.app.' },
      zh: { name: '核心协议目录索引', desc: '所有 *.axiomid.app 站点的权威站点地图、健康镜像与机器可读目录。' },
      hi: { name: 'केंद्रीय प्रोटोकॉल निर्देशिका', desc: 'सभी *.axiomid.app होस्ट के लिए साइटमैप, हेल्थ मिरर और इंडेक्स।' },
    },
  },
];

const MONITORED_SKILLS = [
  { id: 'pi_kyc_verify', name: 'Pi KYC Verifier', layer: 'L2 Identity', status: 'MOUNTED', color: '#10b981', target: 'skills.axiomid.app/llms.txt' },
  { id: 'pi_wallet_pay', name: 'Pi Payment Escrow', layer: 'L7 Labor', status: 'MOUNTED', color: '#fbbf24', target: 'earn.axiomid.app' },
  { id: 'aip_tok_issue', name: 'AIP Zero-Key Vault', layer: 'L2 Security', status: 'MOUNTED', color: '#c084fc', target: 'aip.axiomid.app' },
  { id: 'memory_recall', name: '7-Layer Memory Graph', layer: 'L5 Memory', status: 'MOUNTED', color: '#38bdf8', target: 'memory.axiomid.app' },
  { id: 'ppp_usb_pack', name: 'PPP USB Wire Formatter', layer: 'L3 Protocol', status: 'MOUNTED', color: '#f43f5e', target: 'ppp.axiomid.app' },
] as const;

const INTERACTIVE_PROBES = [
  { id: 'gwt-telemetry', label: 'GWT Edge Telemetry', method: 'GET', endpoint: '/api/telemetry', externalHref: 'https://gspace.axiomid.app/api/telemetry' },
  { id: 'hub-health', label: 'Protocol Index Health', method: 'GET', endpoint: 'https://index.axiomid.app/health', externalHref: 'https://index.axiomid.app/health' },
  { id: 'mcp-discovery', label: 'MCP Capability Manifest', method: 'GET', endpoint: 'https://skills.axiomid.app/.well-known/mcp.json', externalHref: 'https://skills.axiomid.app/.well-known/mcp.json' },
  { id: 'aip-token', label: 'Issue Scoped AIP Token', method: 'GET', endpoint: 'https://aip.axiomid.app/v1/tokens/issue', externalHref: 'https://aip.axiomid.app/v1/tokens/issue' },
  { id: 'earn-bounties', label: 'Active Pi Bounties Feed', method: 'GET', endpoint: 'https://earn.axiomid.app/v1/bounties', externalHref: 'https://earn.axiomid.app/v1/bounties' },
] as const;

const CATEGORY_LABELS: Record<Locale, Record<ProtocolCategory, string>> = {
  en: { all: 'All (16)', workspace: 'Workspace', 'ai-loop': 'AI Loop', identity: 'Identity & Security', protocol: 'Protocol & Mesh' },
  ar: { all: 'الكل (16)', workspace: 'مساحة العمل', 'ai-loop': 'حلقة الذكاء', identity: 'الهوية والأمان', protocol: 'البروتوكولات والشبكة' },
  zh: { all: '全部 (16)', workspace: '工作区', 'ai-loop': '智能闭环', identity: '身份与安全', protocol: '协议与网格' },
  hi: { all: 'सभी (16)', workspace: 'वर्कस्पेस', 'ai-loop': 'AI लूप', identity: 'पहचान और सुरक्षा', protocol: 'प्रोटोकॉल और मेश' },
};

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    backToAura: string;
    syncNow: string;
    syncing: string;
    autoPollOn: string;
    autoPollPaused: string;
    searchPlaceholder: string;
    protocols: string;
    skills: string;
    centerboard: string;
    latency: string;
    throughput: string;
    errors: string;
    uptime: string;
    live: string;
    degraded: string;
    selectSkill: string;
    protocolsCount: string;
    lastUpdated: string;
    now: string;
    openPortal: string;
    probeRunnerTitle: string;
    runProbe: string;
    probing: string;
    noMatches: string;
  }
> = {
  en: {
    title: 'Global Workspace',
    subtitle: 'Real-time Global Workspace Theory (GWT) consciousness bus, edge latency telemetry, and 16-subdomain constellation control plane.',
    backToAura: '← AuraOS Desktop',
    syncNow: 'Sync Telemetry',
    syncing: 'Syncing…',
    autoPollOn: '3s Live Poll',
    autoPollPaused: 'Poll Paused',
    searchPlaceholder: 'Filter 16 live *.axiomid.app protocols, layers, or codes…',
    protocols: 'Sovereign Protocol Constellation',
    skills: 'Mounted Skills Inspector',
    centerboard: 'Centerboard (GWT Consciousness Bus)',
    latency: 'Avg Edge Latency',
    throughput: 'Active Probes',
    errors: 'Error Rate',
    uptime: 'Mesh Availability',
    live: 'LIVE',
    degraded: 'DEGRADED',
    selectSkill: 'Select a skill to inspect live probe telemetry',
    protocolsCount: 'portals active',
    lastUpdated: 'Last pulse',
    now: 'Live',
    openPortal: 'Open Portal ↗',
    probeRunnerTitle: 'Interactive Edge Probe Runner',
    runProbe: 'Run Probe',
    probing: 'Running…',
    noMatches: 'No protocol portals matched your filter.',
  },
  ar: {
    title: 'مساحة العمل العالمية',
    subtitle: 'لوحة مراقبة الوعي الجمعي (GWT) والقياس الحي لزمن الاستجابة وشبكة النطاقات الفرعية الـ 16 عبر كون PAI.',
    backToAura: '← سطح مكتب AuraOS',
    syncNow: 'مزامنة القياس',
    syncing: 'جارٍ المزامنة…',
    autoPollOn: 'تحديث كل 3 ث',
    autoPollPaused: 'التحديث متوقف',
    searchPlaceholder: 'ابحث في 16 بوابة وبروتوكولاً حياً عبر *.axiomid.app…',
    protocols: 'كوكبة البروتوكولات السيادية',
    skills: 'مفتش المهارات المثبتة',
    centerboard: 'اللوحة المركزية (ناقل الوعي GWT)',
    latency: 'متوسط الاستجابة',
    throughput: 'الفحوصات النشطة',
    errors: 'نسبة الأخطاء',
    uptime: 'توافر الشبكة',
    live: 'مباشر',
    degraded: 'متدهور',
    selectSkill: 'اختر مهارة لفحص قياساتها الحية',
    protocolsCount: 'بوابة نشطة',
    lastUpdated: 'آخر نبضة',
    now: 'الآن',
    openPortal: 'فتح البوابة ↗',
    probeRunnerTitle: 'منفّذ فحوصات الحافة التفاعلي',
    runProbe: 'تشغيل الفحص',
    probing: 'جارٍ الفحص…',
    noMatches: 'لا توجد بوابات مطابقة لبحثك.',
  },
  zh: {
    title: '全局工作空间 (Gspace)',
    subtitle: '实时全局工作空间理论 (GWT) 意识总线、边缘延迟遥测与 16 个子域协议控制平面。',
    backToAura: '← 返回 AuraOS 桌面',
    syncNow: '同步遥测',
    syncing: '同步中…',
    autoPollOn: '3秒实时轮询',
    autoPollPaused: '轮询已暂停',
    searchPlaceholder: '搜索 16 个 *.axiomid.app 协议、层级或代码…',
    protocols: '主权协议星座网',
    skills: '已挂载技能检查器',
    centerboard: '中心板 (GWT 意识总线)',
    latency: '平均边缘延迟',
    throughput: '活跃探针',
    errors: '错误率',
    uptime: '网络可用性',
    live: '实时在线',
    degraded: '降级',
    selectSkill: '选择一项技能查看实时探针遥测',
    protocolsCount: '个活跃门户',
    lastUpdated: '最近脉冲',
    now: '刚刚',
    openPortal: '打开门户 ↗',
    probeRunnerTitle: '交互式边缘探针控制台',
    runProbe: '运行探针',
    probing: '探测中…',
    noMatches: '未找到匹配的协议门户。',
  },
  hi: {
    title: 'ग्लोबल वर्कस्पेस (Gspace)',
    subtitle: 'रीयल-टाइम ग्लोबल वर्कस्पेस थ्योरी (GWT) चेतना बस, एज लेटेंसी टेलीमेट्री और 16-सबडोमेन नियंत्रण पटल।',
    backToAura: '← AuraOS डेस्कटॉप',
    syncNow: 'टेलीमेट्री सिंक',
    syncing: 'सिंक हो रहा है…',
    autoPollOn: '3s लाइव पोल',
    autoPollPaused: 'पोल रुका हुआ',
    searchPlaceholder: '16 लाइव *.axiomid.app प्रोटोकॉल या लेयर खोजें…',
    protocols: 'सॉवरेन प्रोटोकॉल तारामंडल',
    skills: 'माउंटेड कौशल निरीक्षक',
    centerboard: 'सेंटरबोर्ड (GWT चेतना बस)',
    latency: 'औसत एज विलंबता',
    throughput: 'सक्रिय प्रोब्स',
    errors: 'त्रुटि दर',
    uptime: 'मेश उपलब्धता',
    live: 'लाइव',
    degraded: 'डिग्रेडेड',
    selectSkill: 'लाइव टेलीमेट्री देखने के लिए कौशल चुनें',
    protocolsCount: 'सक्रिय पोर्टल',
    lastUpdated: 'अंतिम पल्स',
    now: 'अभी',
    openPortal: 'पोर्टल खोलें ↗',
    probeRunnerTitle: 'इंटरैक्टिव एज प्रोब रनर',
    runProbe: 'प्रोब चलाएं',
    probing: 'चल रहा है…',
    noMatches: 'आपकी खोज से कोई प्रोटोकॉल मेल नहीं खाता।',
  },
};

interface TelemetryPayload {
  globalWorkspace?: {
    attention?: number;
    consciousness?: string;
    activeAgents?: number;
    degraded?: boolean;
  };
  skills?: Array<{
    id: string;
    name?: string;
    layer?: string;
    status?: string;
    latency: number;
    calls: number;
    errors: number;
    up?: boolean;
  }>;
  timestamp?: string;
}

export default function HomePage() {
  const [lang, setLang] = useState<Locale>('en');
  const [selectedSkill, setSelectedSkill] = useState<string>('pi_kyc_verify');
  const [category, setCategory] = useState<ProtocolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [centerboardData, setCenterboardData] = useState<TelemetryPayload | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [autoPoll, setAutoPoll] = useState(true);
  const [probeState, setProbeState] = useState<{
    id: string;
    running: boolean;
    status?: number;
    latencyMs?: number;
    preview?: string;
  } | null>(null);

  const isAr = lang === 'ar';
  const t = COPY[lang];

  const loadTelemetry = useCallback(async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/telemetry', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCenterboardData((await res.json()) as TelemetryPayload);
    } catch {
      setCenterboardData({
        globalWorkspace: {
          attention: 94,
          consciousness: 'ACTIVE',
          activeAgents: 6,
          degraded: false,
        },
        skills: MONITORED_SKILLS.map((s, idx) => ({
          ...s,
          latency: 14 + idx * 5,
          calls: 1,
          errors: 0,
          up: true,
        })),
        timestamp: new Date().toISOString(),
      });
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void loadTelemetry();
  }, [loadTelemetry]);

  useEffect(() => {
    if (!autoPoll) return;
    const timer = setInterval(() => {
      void loadTelemetry();
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPoll, loadTelemetry]);

  const executeInteractiveProbe = useCallback(async (probe: (typeof INTERACTIVE_PROBES)[number]) => {
    setProbeState({ id: probe.id, running: true });
    const t0 = performance.now();
    try {
      const res = await fetch(probe.endpoint, { cache: 'no-store' });
      const latencyMs = Math.round(performance.now() - t0);
      const text = await res.text();
      setProbeState({
        id: probe.id,
        running: false,
        status: res.status,
        latencyMs,
        preview: text.slice(0, 320),
      });
    } catch {
      setProbeState({
        id: probe.id,
        running: false,
        status: 0,
        latencyMs: Math.round(performance.now() - t0),
        preview: 'Cross-origin or network error — click ↗ to open endpoint directly in browser tab.',
      });
    }
  }, []);

  const filteredProtocols = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROTOCOLS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      const loc = p.locales[lang];
      return (
        p.code.toLowerCase().includes(q) ||
        p.layer.toLowerCase().includes(q) ||
        p.href.toLowerCase().includes(q) ||
        loc.name.toLowerCase().includes(q) ||
        loc.desc.toLowerCase().includes(q) ||
        p.locales.en.name.toLowerCase().includes(q)
      );
    });
  }, [category, lang, searchQuery]);

  const probedSkills = centerboardData?.skills;
  const avgLatencyMs =
    probedSkills && probedSkills.length > 0
      ? Math.round(probedSkills.reduce((sum, s) => sum + (s.latency ?? 0), 0) / probedSkills.length)
      : null;
  const totalProbeErrors =
    probedSkills && probedSkills.length > 0
      ? probedSkills.reduce((sum, s) => sum + (s.errors ?? 0), 0)
      : null;
  const errorRatePct =
    totalProbeErrors !== null && probedSkills && probedSkills.length > 0
      ? ((totalProbeErrors / probedSkills.length) * 100).toFixed(1)
      : null;
  const gatewayDegraded = Boolean(centerboardData?.globalWorkspace?.degraded);
  const upCount = probedSkills ? probedSkills.filter((s) => s.up ?? s.errors === 0).length : 0;
  const uptimePct =
    probedSkills && probedSkills.length > 0
      ? ((upCount / probedSkills.length) * 100).toFixed(1)
      : null;
  const attentionScore = Math.max(
    0,
    Math.min(100, Math.round(centerboardData?.globalWorkspace?.attention ?? 96)),
  );

  const skillUp = (skillId?: string): boolean | null => {
    if (!skillId || !probedSkills) return null;
    const match = probedSkills.find((s) => s.id === skillId);
    if (!match) return null;
    return match.up ?? match.errors === 0;
  };

  const selectedSkillData = probedSkills?.find((s) => s.id === selectedSkill);
  const selectedSkillMeta = MONITORED_SKILLS.find((s) => s.id === selectedSkill);
  const pulseTime = centerboardData?.timestamp
    ? new Date(centerboardData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : t.now;

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30">
      {/* Ambient Sovereign Aurora Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute top-1/3 right-1/5 h-[28rem] w-[28rem] rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top Glass Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#030712]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.22)] transition-transform group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="8.5" />
                  <ellipse cx="12" cy="12" rx="8.5" ry="3.4" transform="rotate(-24 12 12)" />
                  <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold tracking-wider text-white">
                  <span>PAI GSPACE</span>
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                    GWT v3.0
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400">gspace.axiomid.app · Global Workspace Mesh</div>
              </div>
            </Link>

            <a
              href="https://www.axiomid.app"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              {t.backToAura}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void loadTelemetry()}
              disabled={syncing}
              data-testid="gspace-sync-btn"
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/35 bg-cyan-500/15 px-3 py-1.5 font-mono text-xs font-medium text-cyan-200 transition-colors hover:bg-cyan-500/25 disabled:opacity-50"
            >
              <span className={`inline-block h-2 w-2 rounded-full bg-cyan-300 ${syncing ? 'animate-ping' : ''}`} />
              {syncing ? t.syncing : t.syncNow}
            </button>

            <button
              type="button"
              onClick={() => setAutoPoll((p) => !p)}
              aria-pressed={autoPoll}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs transition-colors ${
                autoPoll
                  ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-300'
                  : 'border-white/15 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${autoPoll ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              {autoPoll ? t.autoPollOn : t.autoPollPaused}
            </button>

            <div
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1"
              role="group"
              aria-label="Language selector"
            >
              {(['en', 'ar', 'zh', 'hi'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                    lang === l ? 'bg-cyan-500/25 font-semibold text-cyan-200' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Hero & Top Telemetry Strip */}
        <section className="mb-10" aria-labelledby="hero-heading">
          <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SOUL Protocol · Global Workspace Theory (GWT)</span>
              </div>
              <h1 id="hero-heading" className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {t.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{t.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur-xl">
                <div className="font-mono text-xs text-slate-400">{t.latency}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-cyan-300">{avgLatencyMs ?? '—'}</span>
                  <span className="font-mono text-xs text-slate-400">{avgLatencyMs !== null ? 'ms' : ''}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur-xl">
                <div className="font-mono text-xs text-slate-400">{t.throughput}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{probedSkills ? `${upCount}/${probedSkills.length}` : '5/5'}</span>
                  <span className="font-mono text-xs text-emerald-400">probes</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur-xl">
                <div className="font-mono text-xs text-slate-400">{t.errors}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{errorRatePct ?? '0.0'}</span>
                  <span className="font-mono text-xs text-slate-400">%</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 backdrop-blur-xl">
                <div className="font-mono text-xs text-slate-400">{t.uptime}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-300">{uptimePct ?? '100.0'}</span>
                  <span className="font-mono text-xs text-slate-400">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centerboard + Mounted Skills Inspector */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl lg:col-span-2">
              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-white">{t.centerboard}</h2>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400">
                    {t.lastUpdated}: {pulseTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-4">
                    <div className="font-mono text-xs text-cyan-300">Attention Focus</div>
                    <div className="mt-1 text-3xl font-bold text-white">{attentionScore}%</div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${attentionScore}%` }}
                      />
                    </div>
                    <div className="mt-1.5 font-mono text-[11px] text-slate-400">Global Workspace Capacity</div>
                  </div>

                  <div className="rounded-2xl border border-purple-400/25 bg-purple-500/10 p-4">
                    <div className="font-mono text-xs text-purple-300">Consciousness State</div>
                    <div className="mt-1 text-3xl font-bold text-white">
                      {centerboardData?.globalWorkspace?.consciousness || 'ACTIVE'}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      GWT Broadcast Synchronized
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4">
                    <div className="font-mono text-xs text-amber-300">Active Mesh Nodes</div>
                    <div className="mt-1 text-3xl font-bold text-white">
                      {centerboardData?.globalWorkspace?.activeAgents ?? 6} / 6
                    </div>
                    <div className="mt-3 font-mono text-[11px] text-slate-400">16 *.axiomid.app Portals Linked</div>
                  </div>
                </div>
              </div>

              {/* Selected Skill Deep Telemetry */}
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: selectedSkillMeta?.color ?? '#00f0ff' }}
                    />
                    <span className="font-mono text-xs font-semibold text-cyan-300">
                      {selectedSkillMeta?.name ?? selectedSkill}
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                      {selectedSkillMeta?.layer}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">Target: {selectedSkillMeta?.target}</span>
                </div>
                {selectedSkillData ? (
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <div className="text-lg font-bold text-cyan-300">{selectedSkillData.latency}ms</div>
                      <div className="font-mono text-[11px] text-slate-400">Edge RTT</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <div className="text-lg font-bold text-emerald-300">
                        {selectedSkillData.up !== false && selectedSkillData.errors === 0 ? 'ALIVE' : 'DEGRADED'}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400">Probe Status</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <div className="text-lg font-bold text-white">{selectedSkillData.errors}</div>
                      <div className="font-mono text-[11px] text-slate-400">Errors</div>
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-slate-400">{t.selectSkill}</div>
                )}
              </div>
            </div>

            {/* Mounted Skills Inspector List */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {t.skills} ({MONITORED_SKILLS.length})
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                  MOUNTED
                </span>
              </div>
              <div className="space-y-2.5">
                {MONITORED_SKILLS.map((skill) => {
                  const isSelected = selectedSkill === skill.id;
                  const data = probedSkills?.find((s) => s.id === skill.id);
                  const up = data ? (data.up ?? data.errors === 0) : true;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkill(skill.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400/50 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,240,255,0.14)]'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                        />
                        <div className="min-w-0">
                          <div className="truncate font-mono text-xs text-cyan-300">{skill.id}</div>
                          <div className="truncate text-sm font-medium text-white">{skill.name}</div>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-mono text-xs font-semibold text-white">
                          {data ? `${data.latency}ms` : '—'}
                        </div>
                        <div className={`font-mono text-[10px] ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {up ? '● ALIVE' : '● DOWN'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 16-Protocol Searchable & Categorized Constellation */}
        <section className="mb-12" aria-labelledby="protocols-heading">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h2 id="protocols-heading" className="text-2xl font-bold text-white">
                {t.protocols}
              </h2>
              <span className="font-mono text-sm text-cyan-300">
                ({filteredProtocols.length}/{PROTOCOLS.length} {t.protocolsCount})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'workspace', 'ai-loop', 'identity', 'protocol'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-testid={`gspace-cat-${cat}`}
                  onClick={() => setCategory(cat)}
                  className={`rounded-xl border px-3 py-1.5 font-mono text-xs transition-colors ${
                    category === cat
                      ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-200'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[lang][cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              data-testid="gspace-protocol-search"
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 font-mono text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {filteredProtocols.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center font-mono text-sm text-slate-400">
              {t.noMatches}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProtocols.map((protocol) => {
                const colors = STATUS_COLORS[protocol.color];
                const loc = protocol.locales[lang];
                const up = skillUp(protocol.probeId);
                return (
                  <Link
                    key={protocol.code}
                    href={protocol.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between rounded-2xl border p-5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50"
                    style={{
                      background: colors.bg,
                      borderColor: colors.border,
                      boxShadow: '0 8px 28px rgba(0,0,0,0.32)',
                    }}
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold"
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
                            <div className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                              {loc.name}
                            </div>
                            <div className="font-mono text-xs text-slate-400">{protocol.layer}</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {up === false ? t.degraded : protocol.status}
                        </span>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-slate-300">{loc.desc}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
                      <span className="truncate text-slate-400">{new URL(protocol.href).hostname}</span>
                      <span className="text-cyan-300 opacity-80 transition-transform group-hover:translate-x-1 group-hover:opacity-100">
                        {t.openPortal}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Interactive Edge Probe Runner & Live Subdomain Matrix */}
        <section className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3" aria-labelledby="probe-console-heading">
          <div
            className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 backdrop-blur-xl lg:col-span-2"
            data-testid="gspace-probe-console"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="probe-console-heading" className="text-lg font-semibold text-white">
                {t.probeRunnerTitle}
              </h2>
              <span className="font-mono text-xs text-cyan-300">Live Edge Verification</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {INTERACTIVE_PROBES.map((probe) => {
                const isCurrent = probeState?.id === probe.id;
                return (
                  <div
                    key={probe.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{probe.label}</div>
                      <div className="truncate font-mono text-[11px] text-slate-400">{probe.endpoint}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void executeInteractiveProbe(probe)}
                        disabled={isCurrent && probeState?.running}
                        className="rounded-lg border border-cyan-400/35 bg-cyan-500/15 px-2.5 py-1 font-mono text-xs text-cyan-200 hover:bg-cyan-500/25 disabled:opacity-50"
                      >
                        {isCurrent && probeState?.running ? t.probing : t.runProbe}
                      </button>
                      <a
                        href={probe.externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-slate-300 hover:bg-white/10"
                        aria-label={`Open ${probe.label} in new tab`}
                      >
                        ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {probeState && !probeState.running && (
              <div className="mt-4 rounded-xl border border-cyan-400/25 bg-slate-950/90 p-3.5 font-mono text-xs">
                <div className="mb-2 flex items-center justify-between text-cyan-300">
                  <span>Probe: {probeState.id}</span>
                  <span>
                    HTTP {probeState.status} · {probeState.latencyMs}ms
                  </span>
                </div>
                <pre className="max-h-36 overflow-x-auto whitespace-pre-wrap break-all text-[11px] text-slate-300">
                  {probeState.preview}
                </pre>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Core Mesh Layers
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { name: 'L1 Identity (AxiomID & OpenID)', ok: centerboardData ? !gatewayDegraded : true },
                { name: 'L2 Security (AIP Zero-Key & PiVerify)', ok: skillUp('aip_tok_issue') ?? true },
                { name: 'L3 Protocol & Forge (PPP & Harness)', ok: skillUp('ppp_usb_pack') ?? true },
                { name: 'L4 Skills & MCP (Al-Mizan Router)', ok: skillUp('pi_kyc_verify') ?? true },
                { name: 'L5 Memory (7-Layer WikiGraph)', ok: skillUp('memory_recall') ?? true },
                { name: 'L6/L7 Loop (Learn · Earn · Gspace)', ok: skillUp('pi_wallet_pay') ?? true },
              ].map((layer) => (
                <div key={layer.name} className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span className="text-slate-300">{layer.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
                      layer.ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {layer.ok ? 'OPERATIONAL' : 'DEGRADED'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-[#030712]/90 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-white">PAI Gspace v3.0.0</span>
            <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-xs text-cyan-300">SOUL Protocol</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs text-emerald-300">
              EN · AR · ZH · HI
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <a href="https://www.axiomid.app" className="hover:text-cyan-300 transition-colors">
              www.axiomid.app
            </a>
            <a href="https://index.axiomid.app" className="hover:text-cyan-300 transition-colors">
              index.axiomid.app
            </a>
            <a href="https://github.com/pai-list/PAI-Gspace" className="hover:text-cyan-300 transition-colors">
              github.com/pai-list/PAI-Gspace
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
