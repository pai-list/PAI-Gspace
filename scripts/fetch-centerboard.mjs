#!/usr/bin/env node
/**
 * Fetch centerboard from gspace.axiomid.app and sync to local PAI-Gspace
 * Run via: pnpm centerboard:fetch
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');

const CENTERBOARD_URL = 'https://gspace.axiomid.app/centerboard';
const LOCAL_CENTERBOARD = resolve(__dirname, '../public/centerboard.md');
const LOCAL_JSON = resolve(__dirname, '../public/centerboard.json');

async function fetchCenterboard() {
  console.log('🔄 Fetching centerboard from', CENTERBOARD_URL);
  
  try {
    const res = await fetch(CENTERBOARD_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    
    const markdown = await res.text();
    
    // Parse sections for JSON
    const sections = parseCenterboard(markdown);
    
    // Write markdown
    writeFileSync(LOCAL_CENTERBOARD, markdown);
    console.log('✅ Written markdown to', LOCAL_CENTERBOARD);
    
    // Write JSON for programmatic access
    writeFileSync(LOCAL_JSON, JSON.stringify(sections, null, 2));
    console.log('✅ Written JSON to', LOCAL_JSON);
    
    // Update protocol list if needed
    updateProtocols(sections);
    
    return sections;
  } catch (err) {
    console.error('❌ Failed to fetch centerboard:', err.message);
    process.exit(1);
  }
}

function parseCenterboard(md) {
  const sections = {};
  let currentSection = null;
  let content = [];
  
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections[currentSection] = content.join('\n').trim();
      }
      currentSection = line.slice(3).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
      content = [];
    } else if (currentSection) {
      content.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = content.join('\n').trim();
  }
  
  return {
    raw: md,
    sections,
    lastFetched: new Date().toISOString(),
    source: CENTERBOARD_URL
  };
}

function updateProtocols(sections) {
  // Extract active skills/subdomains from centerboard for PAI-Gspace UI
  const skillsSection = sections.skills || '';
  const protocols = [];
  
  // Known subdomains from centerboard + protocol-stubs
  const knownSubdomains = [
    { key: 'index', name: 'Index Mirror', domain: 'https://index.axiomid.app' },
    { key: 'aip', name: 'AIP Vault', domain: 'https://aip.axiomid.app' },
    { key: 'ppp', name: 'PPP Wire', domain: 'https://ppp.axiomid.app' },
    { key: 'memory', name: '7-Layer Memory', domain: 'https://memory.axiomid.app' },
    { key: 'earn', name: 'Machine Exchange', domain: 'https://earn.axiomid.app' },
    { key: 'auth', name: 'OAuth2 & DID', domain: 'https://auth.axiomid.app' },
    { key: 'skills', name: 'Skills MCP', domain: 'https://skills.axiomid.app' },
    { key: 'mail', name: 'Email Gateway', domain: 'https://mail.axiomid.app' },
  ];
  
  const protocolsFile = resolve(__dirname, '../app/protocols.json');
  writeFileSync(protocolsFile, JSON.stringify(knownSubdomains, null, 2));
  console.log('✅ Updated protocols.json with', knownSubdomains.length, 'subdomains');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fetchCenterboard();
}