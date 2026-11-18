#!/usr/bin/env node
/**
 * Negative Feedback Compiler — Post-Task Learning Loop
 * 
 * After each task/run, captures:
 * 1. What was attempted
 * 2. What failed/succeeded
 * 3. Root cause analysis
 * 4. Lessons learned
 * 5. Action items for improvement
 * 
 * Run via: pnpm feedback:compile "task description"
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const FEEDBACK_DIR = join(__dirname, '.feedback');
const FEEDBACK_LOG = join(FEEDBACK_DIR, 'feedback-log.jsonl');
const LESSONS_FILE = join(FEEDBACK_DIR, 'lessons-learned.md');

function ensureDir() {
  if (!existsSync(FEEDBACK_DIR)) {
    mkdirSync(FEEDBACK_DIR, { recursive: true });
  }
}

function loadLog() {
  if (!existsSync(FEEDBACK_LOG)) return [];
  const content = readFileSync(FEEDBACK_LOG, 'utf-8');
  return content.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
}

function saveEntry(entry) {
  ensureDir();
  writeFileSync(FEEDBACK_LOG, JSON.stringify(entry) + '\n', { flag: 'a' });
}

function updateLessons(entry) {
  ensureDir();
  let lessons = '# Lessons Learned — Negative Feedback Compiler\n\n';
  lessons += `*Auto-generated from task feedback — ${new Date().toISOString()}*\n\n`;
  
  const allEntries = loadLog();
  
  // Group by category
  const categories = {
    'Build/Config Issues': [] as string[],
    'Monorepo/Workspace': [] as string[],
    'Dependency Resolution': [] as string[],
    'Runtime/Deployment': [] as string[],
    'Testing/Validation': [] as string[],
    'UI/UX Implementation': [] as string[],
    'Architecture/Design': [] as string[],
    'Other': [] as string[],
  };
  
  for (const e of allEntries) {
    for (const lesson of e.lessons) {
      const cat = categorizeLesson(lesson);
      if (!categories[cat].includes(lesson)) {
        categories[cat].push(lesson);
      }
    }
  }
  
  for (const [cat, lessons_arr] of Object.entries(categories)) {
    if (lessons_arr.length > 0) {
      lessons += `## ${cat}\n\n`;
      for (const l of lessons_arr) {
        lessons += `- ${l}\n`;
      }
      lessons += '\n';
    }
  }
  
  // Add recurring patterns
  lessons += '## Recurring Patterns\n\n';
  const patternCounts = new Map();
  for (const e of allEntries) {
    for (const cause of e.rootCauses) {
      patternCounts.set(cause, (patternCounts.get(cause) || 0) + 1);
    }
  }
  for (const [pattern, count] of patternCounts.entries()) {
    if (count > 1) {
      lessons += `- **${pattern}** (occurred ${count}x)\n`;
    }
  }
  
  writeFileSync(LESSONS_FILE, lessons);
}

function categorizeLesson(lesson) {
  const l = lesson.toLowerCase();
  if (l.includes('build') || l.includes('config') || l.includes('turbopack') || l.includes('next.config')) return 'Build/Config Issues';
  if (l.includes('monorepo') || l.includes('workspace') || l.includes('pnpm') || l.includes('lockfile')) return 'Monorepo/Workspace';
  if (l.includes('dependenc') || l.includes('resolve') || l.includes('symlink') || l.includes('hoist')) return 'Dependency Resolution';
  if (l.includes('deploy') || l.includes('runtime') || l.includes('worker') || l.includes('vercel') || l.includes('cloudflare')) return 'Runtime/Deployment';
  if (l.includes('test') || l.includes('validat') || l.includes('lint') || l.includes('typecheck')) return 'Testing/Validation';
  if (l.includes('ui') || l.includes('ux') || l.includes('design') || l.includes('three') || l.includes('spatial')) return 'UI/UX Implementation';
  if (l.includes('architect') || l.includes('pattern') || l.includes('structure') || l.includes('protocol')) return 'Architecture/Design';
  return 'Other';
}

function promptFeedback() {
  const task = process.argv.slice(2).join(' ') || 'Untitled task';
  const now = new Date().toISOString();
  
  console.log('\n📝 Negative Feedback Compiler — Post-Task Review');
  console.log('='.repeat(60));
  console.log(`Task: ${task}`);
  console.log(`Time: ${now}\n`);
  
  const entry = {
    timestamp: now,
    task,
    status: 'partial',
    attempted: [],
    failed: [],
    rootCauses: [],
    lessons: [],
    actionItems: [],
    severity: 'medium',
  };
  
  // Auto-detect from recent errors (simplified)
  const recentErrors = detectRecentErrors();
  if (recentErrors.length > 0) {
    entry.failed = recentErrors;
    entry.status = 'failure';
    entry.severity = 'high';
  }
  
  saveEntry(entry);
  updateLessons(entry);
  
  console.log('✅ Feedback recorded to', FEEDBACK_LOG);
  console.log('📚 Lessons updated in', LESSONS_FILE);
  console.log('\nRun `pnpm feedback:lessons` to view accumulated lessons.\n');
  
  return entry;
}

function detectRecentErrors() {
  // Check for common error patterns in recent builds
  const errors = [];
  
  // Check .next/trace for errors
  const tracePath = join(__dirname, '.next', 'trace');
  if (existsSync(tracePath)) {
    // Could parse trace for errors
  }
  
  // Check for common known issues
  const packageJson = join(__dirname, 'package.json');
  if (existsSync(packageJson)) {
    const pkg = JSON.parse(readFileSync(packageJson, 'utf-8'));
    if (pkg.dependencies?.next && !pkg.devDependencies?.typescript) {
      errors.push('Missing TypeScript in devDependencies for Next.js project');
    }
  }
  
  return errors;
}

// Import fs functions
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('node:fs');
const { resolve, join } = require('node:path');

if (require.main === module) {
  promptFeedback();
}

module.exports = { loadLog, updateLessons };