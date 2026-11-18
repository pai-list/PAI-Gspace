#!/usr/bin/env node
/**
 * Lightweight Feedback Logger — Minimal overhead
 * Usage: pnpm feedback "task note" || pnpm feedback:log "task note"
 */

import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const LOG_FILE = join(__dirname, '..', '.feedback', 'feedback.log');

const note = process.argv.slice(2).join(' ') || 'No note provided';
const timestamp = new Date().toISOString().split('T')[1].slice(0, 8); // HH:MM:SS

mkdirSync(join(__dirname, '..', '.feedback'), { recursive: true });
appendFileSync(LOG_FILE, `[${timestamp}] ${note}\n`);

console.log(`✓ Logged: ${note.slice(0, 60)}${note.length > 60 ? '...' : ''}`);