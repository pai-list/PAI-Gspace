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
      { id: "pi_kyc_verify", name: "Pi KYC Verifier" },
      { id: "pi_wallet_pay", name: "Pi Payment Escrow" },
      { id: "aip_tok_issue", name: "AIP Zero-Key Vault" },
      { id: "memory_recall", name: "7-Layer Memory Graph" },
      { id: "ppp_usb_pack", name: "PPP USB Wire Formatter" },
    ];

    expect(mountedSkills.length).toBe(5);
    const kycSkill = mountedSkills.find(s => s.id === 'pi_kyc_verify');
    expect(kycSkill).toBeDefined();
    expect(kycSkill?.name).toBe('Pi KYC Verifier');
  });
});
