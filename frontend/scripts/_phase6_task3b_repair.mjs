// Phase 6 task 3b: repair a double application from an accidental second --commit run of _phase6_task3_sweep.mjs
// (two pairs whose replacement text contains the original). The lib walker now skips such pairs once applied.
import { applyEverywhere } from './_phase6_lib.mjs';
const S = 'Self-inflicted duplication from re-running _phase6_task3_sweep.mjs --commit; restores the single intended replacement.';
const SENT = ' The model ended on December 31, 2025, and its final evaluation (August 2026) put net Medicare savings at about $800 million across all eight model years, after net losses in Model Years 1–3.';
await applyEverywhere({ sanityIds: ['bundled-payment-evidence'], sanityFields: ['body'], residue: [SENT + SENT], pairs: [
  { old: SENT + SENT, new: SENT, src: S, note: 'Removed duplicated sentence.' }] });
await applyEverywhere({ sanityIds: ['academyModule-vbc-bundled-mechanics'], sanityFields: ['body'], residue: ['includedd'], pairs: [
  { old: 'Major convener organizations in BPCI-Advanced includedd', new: 'Major convener organizations in BPCI-Advanced included', src: S, note: 'Fixed "includedd".' }] });
