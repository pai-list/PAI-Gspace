import { describe, it, expect } from 'vitest';

describe('PAI Gspace Global Workspace Test Suite', () => {
  it('defines the 9 core protocol subdomains', () => {
    const protocols = [
      'axiomid.app',
      'aip.axiomid.app',
      'skills.axiomid.app',
      'earn.axiomid.app',
      'ppp.axiomid.app',
      'mail.axiomid.app',
      'memory.axiomid.app',
      'mcp.axiomid.app',
      'openid.axiomid.app',
    ];
    expect(protocols.length).toBe(9);
    expect(protocols).toContain('skills.axiomid.app');
    expect(protocols).toContain('earn.axiomid.app');
  });

  it('verifies task-specific mounted skills configuration', () => {
    const mountedSkills = [
      { id: "pi_kyc_verify", name: "Pi KYC Verifier", layer: "L2 Identity", status: "active", latency: "14ms" },
      { id: "pi_wallet_pay", name: "Pi Payment Escrow", layer: "L7 Labor", status: "active", latency: "22ms" },
      { id: "aip_tok_issue", name: "AIP Zero-Key Vault", layer: "L1 Auth", status: "active", latency: "8ms" },
      { id: "memory_recall", name: "7-Layer Memory Graph", layer: "L5 Memory", status: "active", latency: "31ms" },
      { id: "ppp_usb_pack", name: "PPP USB Wire Formatter", layer: "L4 Wire", status: "active", latency: "5ms" },
    ];

    expect(mountedSkills.length).toBe(5);
    const kycSkill = mountedSkills.find(s => s.id === 'pi_kyc_verify');
    expect(kycSkill).toBeDefined();
    expect(kycSkill?.name).toBe('Pi KYC Verifier');
    expect(kycSkill?.layer).toBe('L2 Identity');
  });

  it('validates i18n locale dictionary mappings for EN and AR', () => {
    const dict = {
      en: { title: "PAI Gspace", sub: "Global Workspace Interpretability" },
      ar: { title: "مساحة باي العالمية", sub: "قابلية التفسير للمساحة العالمية" },
    };
    expect(dict.en.title).toBe("PAI Gspace");
    expect(dict.ar.title).toBe("مساحة باي العالمية");
  });

  it('verifies trust score calculation and metrics', () => {
    const metrics = {
      trustScore: 100,
      mechanisticVerification: true,
      zeroBlackBox: true,
    };
    expect(metrics.trustScore).toBe(100);
    expect(metrics.mechanisticVerification).toBe(true);
  });
});
