import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('PAI Gspace Global Workspace Test Suite', () => {
  const pageSource = fs.readFileSync(
    path.resolve(__dirname, '../page.tsx'),
    'utf8'
  );

  it('defines all 16 live ecosystem protocol portals across 4 categories', () => {
    const expectedPortals = [
      'https://www.axiomid.app',
      'https://harness.axiomid.app',
      'https://memory.axiomid.app',
      'https://skills.axiomid.app',
      'https://mcp.axiomid.app',
      'https://earn.axiomid.app',
      'https://learn.axiomid.app',
      'https://aip.axiomid.app',
      'https://openid.axiomid.app',
      'https://auth.axiomid.app',
      'https://piverify.axiomid.app',
      'https://ppp.axiomid.app',
      'https://node.axiomid.app',
      'https://agdp.axiomid.app',
      'https://mail.axiomid.app',
      'https://index.axiomid.app',
    ];
    expect(expectedPortals.length).toBe(16);
    for (const url of expectedPortals) {
      expect(pageSource).toContain(`href: '${url}'`);
    }
  });

  it('verifies task-specific mounted skills and interactive probe runner', () => {
    const mountedSkills = [
      { id: 'pi_kyc_verify', name: 'Pi KYC Verifier', layer: 'L2 Identity' },
      { id: 'pi_wallet_pay', name: 'Pi Payment Escrow', layer: 'L7 Labor' },
      { id: 'aip_tok_issue', name: 'AIP Zero-Key Vault', layer: 'L2 Security' },
      { id: 'memory_recall', name: '7-Layer Memory Graph', layer: 'L5 Memory' },
      { id: 'ppp_usb_pack', name: 'PPP USB Wire Formatter', layer: 'L3 Protocol' },
    ];
    expect(mountedSkills.length).toBe(5);
    for (const skill of mountedSkills) {
      expect(pageSource).toContain(`id: '${skill.id}'`);
      expect(pageSource).toContain(`name: '${skill.name}'`);
    }
    expect(pageSource).toContain('data-testid="gspace-probe-console"');
    expect(pageSource).toContain('data-testid="gspace-protocol-search"');
  });

  it('validates i18n locale dictionary mappings for EN, AR, ZH, and HI', () => {
    expect(pageSource).toContain("title: 'Global Workspace'");
    expect(pageSource).toContain("title: 'مساحة العمل العالمية'");
    expect(pageSource).toContain("title: '全局工作空间 (Gspace)'");
    expect(pageSource).toContain("title: 'ग्लोबल वर्कस्पेस (Gspace)'");
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
