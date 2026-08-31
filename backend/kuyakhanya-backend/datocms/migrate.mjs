#!/usr/bin/env node
/**
 * DatoCMS model bootstrap — free-tier safe
 * Creates all 10 models for Kuyakhanya FM (ID 229086) if they don't exist.
 *
 * Usage:
 *   1) set DATOCMS_API_TOKEN (full-access, environment: main) in backend/kuyakhanya-backend/.env
 *   2) npm install @datocms/cma-client-node
 *   3) node datocms/migrate.mjs            # dry? add --dry
 *   4) check https://kuyakhanya-fm.admin.datocms.com → Content → Models
 *
 * Free plan: 10 models included here is within free limit (DatoCMS free = 10 models, 1000 records, GraphQL enabled).
 * No trial services used. Re-runnable / idempotent.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsPath = path.join(__dirname, "models.json");
const raw = fs.readFileSync(modelsPath, "utf-8");
const { models } = JSON.parse(raw);

const DRY = process.argv.includes("--dry");
const token = process.env.DATOCMS_API_TOKEN || process.env.DATOCMS_FULL_TOKEN;
if (!token && !DRY) {
  console.error("✗ Missing DATOCMS_API_TOKEN. Set it in env or pass --dry for preview.");
  process.exit(1);
}

console.log(`\n◎ Kuyakhanya FM DatoCMS bootstrap — project 229086`);
console.log(`  Domain: kuyakhanya-fm.admin.datocms.com`);
console.log(`  Models to ensure: ${models.length}`);
console.log(`  Mode: ${DRY ? "DRY-RUN (no writes)" : "LIVE"}\n`);

if (DRY) {
  for (const m of models) {
    console.log(`  • ${m.name} (${m.apiKey}) — ${m.collection ? "collection" : "single"} — ${m.fields.length} fields`);
    for (const f of m.fields) console.log(`      - ${f.apiKey}: ${f.fieldType}${f.hint ? ` (${f.hint})` : ""}`);
  }
  console.log("\n✓ Dry-run complete. Run without --dry to apply with DATOCMS_API_TOKEN.\n");
  process.exit(0);
}

// Live mode — uses CMA client
const { buildClient } = await import("@datocms/cma-client-node");
const client = buildClient({ apiToken: token, environment: process.env.DATOCMS_ENVIRONMENT || "main" });

async function ensureModels() {
  const existing = await client.itemTypes.list();
  const byKey = new Map(existing.map((i) => [i.apiKey, i]));

  for (const m of models) {
    if (byKey.has(m.apiKey)) {
      console.log(`  = exists: ${m.name} (${m.apiKey}) — skipping create`);
      continue;
    }
    console.log(`  + creating: ${m.name} (${m.apiKey}) ...`);
    try {
      const itemType = await client.itemTypes.create({
        api_key: m.apiKey,
        name: m.name,
        collection: m.collection,
        // singleton single-instance if not collection
        singleton: !m.collection,
        modular_block: false,
        sortable: m.collection,
        tree: false,
        draft_mode_active: true,
      });
      // create fields sequentially (order matters)
      for (const f of m.fields) {
        await client.fields.create(itemType.id, {
          api_key: f.apiKey,
          label: f.label,
          field_type: f.fieldType,
          hint: f.hint || null,
          validators: f.validators || {},
          position: f.position,
          appeareance: undefined,
        });
        console.log(`      ✓ field ${f.apiKey}`);
      }
      console.log(`  ✓ created ${m.name}`);
    } catch (e) {
      console.error(`  ✗ failed ${m.apiKey}:`, e?.message || e);
      if (e?.data) console.error(JSON.stringify(e.data, null, 2));
    }
  }
  console.log("\n✓ DatoCMS bootstrap done. Verify at https://kuyakhanya-fm.admin.datocms.com/admin/item_types\n");
  console.log("Next: create records in DatoCMS UI, then set DATOCMS_READONLY_API_TOKEN in frontend .env.local\n");
}

await ensureModels();
