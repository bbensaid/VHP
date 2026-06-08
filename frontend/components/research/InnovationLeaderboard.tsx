"use client";

import React, { useState, useMemo } from "react";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  BarChart2,
  Building2,
  Shield,
  Globe,
  ArrowUpDown,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type TabId = "states" | "hospitals" | "payers";

type SortDirection = "asc" | "desc";

interface StateRecord {
  rank: number;
  state: string;
  abbr: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  composite: number;
  digitalMaturity: number;
  valueBased: number;
  sdohEquity: number;
  clinicalExcellence: number;
  patientExperience: number;
  workforceWellness: number;
  yearOverYear: number;
}

interface HospitalSystem {
  rank: number;
  name: string;
  state: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  type: "Non-profit" | "For-profit" | "Government" | "Integrated";
  maturity: number;
  revenueRisk: number;
  acoApm: number;
  qualityPerf: number;
  dataAnalytics: number;
  patientEngagement: number;
  trend: number;
}

interface Payer {
  rank: number;
  name: string;
  payerType: "Commercial" | "Medicare Advantage" | "Medicaid" | "Integrated" | "Government";
  innovationScore: number;
  apmPaymentPct: number;
  apmModelTypes: number;
  qualityMetrics: number;
  sdohInvestment: number;
  dataSharing: number;
  trend: number;
}

// ─────────────────────────────────────────────────────────────
// DATA: ALL 50 STATES
// ─────────────────────────────────────────────────────────────

const RAW_STATES: Omit<StateRecord, "rank">[] = [
  // New England (highest)
  { state: "Massachusetts", abbr: "MA", region: "Northeast", composite: 85, digitalMaturity: 88, valueBased: 87, sdohEquity: 84, clinicalExcellence: 86, patientExperience: 83, workforceWellness: 79, yearOverYear: 2.1 },
  { state: "Vermont",       abbr: "VT", region: "Northeast", composite: 82, digitalMaturity: 85, valueBased: 84, sdohEquity: 88, clinicalExcellence: 80, patientExperience: 82, workforceWellness: 76, yearOverYear: 3.2 },
  { state: "Minnesota",     abbr: "MN", region: "Midwest",   composite: 80, digitalMaturity: 82, valueBased: 81, sdohEquity: 79, clinicalExcellence: 83, patientExperience: 80, workforceWellness: 74, yearOverYear: 1.8 },
  { state: "Colorado",      abbr: "CO", region: "West",      composite: 78, digitalMaturity: 83, valueBased: 79, sdohEquity: 76, clinicalExcellence: 78, patientExperience: 78, workforceWellness: 75, yearOverYear: 2.4 },
  { state: "Oregon",        abbr: "OR", region: "West",      composite: 76, digitalMaturity: 80, valueBased: 77, sdohEquity: 79, clinicalExcellence: 74, patientExperience: 76, workforceWellness: 72, yearOverYear: 1.5 },
  { state: "Connecticut",   abbr: "CT", region: "Northeast", composite: 73, digitalMaturity: 77, valueBased: 74, sdohEquity: 72, clinicalExcellence: 75, patientExperience: 73, workforceWellness: 68, yearOverYear: 0.9 },
  { state: "Washington",    abbr: "WA", region: "West",      composite: 73, digitalMaturity: 81, valueBased: 75, sdohEquity: 74, clinicalExcellence: 72, patientExperience: 72, workforceWellness: 66, yearOverYear: 2.0 },
  { state: "Hawaii",        abbr: "HI", region: "West",      composite: 74, digitalMaturity: 72, valueBased: 74, sdohEquity: 81, clinicalExcellence: 73, patientExperience: 77, workforceWellness: 70, yearOverYear: 1.1 },
  { state: "New York",      abbr: "NY", region: "Northeast", composite: 72, digitalMaturity: 78, valueBased: 73, sdohEquity: 70, clinicalExcellence: 74, patientExperience: 70, workforceWellness: 64, yearOverYear: 0.7 },
  { state: "California",    abbr: "CA", region: "West",      composite: 71, digitalMaturity: 79, valueBased: 72, sdohEquity: 73, clinicalExcellence: 69, patientExperience: 70, workforceWellness: 63, yearOverYear: 1.3 },
  { state: "Maine",         abbr: "ME", region: "Northeast", composite: 71, digitalMaturity: 73, valueBased: 72, sdohEquity: 74, clinicalExcellence: 70, patientExperience: 74, workforceWellness: 65, yearOverYear: 1.6 },
  { state: "New Hampshire", abbr: "NH", region: "Northeast", composite: 70, digitalMaturity: 74, valueBased: 71, sdohEquity: 68, clinicalExcellence: 72, patientExperience: 71, workforceWellness: 64, yearOverYear: 0.8 },
  { state: "Rhode Island",  abbr: "RI", region: "Northeast", composite: 69, digitalMaturity: 71, valueBased: 70, sdohEquity: 71, clinicalExcellence: 68, patientExperience: 70, workforceWellness: 62, yearOverYear: 0.5 },
  { state: "Maryland",      abbr: "MD", region: "South",     composite: 69, digitalMaturity: 74, valueBased: 70, sdohEquity: 68, clinicalExcellence: 72, patientExperience: 66, workforceWellness: 61, yearOverYear: 1.2 },
  { state: "New Jersey",    abbr: "NJ", region: "Northeast", composite: 68, digitalMaturity: 72, valueBased: 69, sdohEquity: 67, clinicalExcellence: 70, patientExperience: 67, workforceWellness: 60, yearOverYear: 0.6 },
  { state: "Wisconsin",     abbr: "WI", region: "Midwest",   composite: 68, digitalMaturity: 70, valueBased: 68, sdohEquity: 67, clinicalExcellence: 71, patientExperience: 68, workforceWellness: 63, yearOverYear: 0.4 },
  { state: "Virginia",      abbr: "VA", region: "South",     composite: 66, digitalMaturity: 71, valueBased: 67, sdohEquity: 64, clinicalExcellence: 68, patientExperience: 65, workforceWellness: 58, yearOverYear: 1.0 },
  { state: "Pennsylvania",  abbr: "PA", region: "Northeast", composite: 67, digitalMaturity: 70, valueBased: 67, sdohEquity: 65, clinicalExcellence: 69, patientExperience: 66, workforceWellness: 60, yearOverYear: 0.3 },
  { state: "Iowa",          abbr: "IA", region: "Midwest",   composite: 67, digitalMaturity: 68, valueBased: 68, sdohEquity: 66, clinicalExcellence: 70, patientExperience: 67, workforceWellness: 62, yearOverYear: 0.8 },
  { state: "Nebraska",      abbr: "NE", region: "Midwest",   composite: 66, digitalMaturity: 67, valueBased: 66, sdohEquity: 64, clinicalExcellence: 68, patientExperience: 66, workforceWellness: 61, yearOverYear: 0.5 },
  { state: "Utah",          abbr: "UT", region: "West",      composite: 68, digitalMaturity: 74, valueBased: 70, sdohEquity: 63, clinicalExcellence: 69, patientExperience: 68, workforceWellness: 65, yearOverYear: 1.7 },
  { state: "Michigan",      abbr: "MI", region: "Midwest",   composite: 65, digitalMaturity: 68, valueBased: 65, sdohEquity: 64, clinicalExcellence: 67, patientExperience: 64, workforceWellness: 58, yearOverYear: 0.2 },
  { state: "Ohio",          abbr: "OH", region: "Midwest",   composite: 64, digitalMaturity: 67, valueBased: 64, sdohEquity: 62, clinicalExcellence: 66, patientExperience: 63, workforceWellness: 57, yearOverYear: 0.1 },
  { state: "Illinois",      abbr: "IL", region: "Midwest",   composite: 63, digitalMaturity: 68, valueBased: 63, sdohEquity: 61, clinicalExcellence: 64, patientExperience: 62, workforceWellness: 56, yearOverYear: -0.2 },
  { state: "Montana",       abbr: "MT", region: "West",      composite: 65, digitalMaturity: 64, valueBased: 65, sdohEquity: 67, clinicalExcellence: 63, patientExperience: 68, workforceWellness: 62, yearOverYear: 1.0 },
  { state: "Wyoming",       abbr: "WY", region: "West",      composite: 63, digitalMaturity: 62, valueBased: 63, sdohEquity: 61, clinicalExcellence: 62, patientExperience: 65, workforceWellness: 61, yearOverYear: 0.4 },
  { state: "Idaho",         abbr: "ID", region: "West",      composite: 62, digitalMaturity: 66, valueBased: 63, sdohEquity: 59, clinicalExcellence: 62, patientExperience: 63, workforceWellness: 60, yearOverYear: 0.9 },
  { state: "North Dakota",  abbr: "ND", region: "Midwest",   composite: 65, digitalMaturity: 64, valueBased: 65, sdohEquity: 63, clinicalExcellence: 67, patientExperience: 66, workforceWellness: 62, yearOverYear: 0.6 },
  { state: "South Dakota",  abbr: "SD", region: "Midwest",   composite: 63, digitalMaturity: 62, valueBased: 63, sdohEquity: 61, clinicalExcellence: 65, patientExperience: 64, workforceWellness: 60, yearOverYear: 0.3 },
  { state: "Kansas",        abbr: "KS", region: "Midwest",   composite: 63, digitalMaturity: 64, valueBased: 63, sdohEquity: 61, clinicalExcellence: 64, patientExperience: 63, workforceWellness: 59, yearOverYear: 0.2 },
  { state: "Missouri",      abbr: "MO", region: "Midwest",   composite: 62, digitalMaturity: 64, valueBased: 62, sdohEquity: 60, clinicalExcellence: 63, patientExperience: 62, workforceWellness: 57, yearOverYear: -0.1 },
  { state: "Indiana",       abbr: "IN", region: "Midwest",   composite: 62, digitalMaturity: 63, valueBased: 62, sdohEquity: 60, clinicalExcellence: 63, patientExperience: 61, workforceWellness: 57, yearOverYear: 0.1 },
  { state: "Delaware",      abbr: "DE", region: "Northeast", composite: 66, digitalMaturity: 69, valueBased: 67, sdohEquity: 65, clinicalExcellence: 67, patientExperience: 66, workforceWellness: 60, yearOverYear: 0.7 },
  { state: "North Carolina",abbr: "NC", region: "South",     composite: 62, digitalMaturity: 65, valueBased: 63, sdohEquity: 60, clinicalExcellence: 63, patientExperience: 61, workforceWellness: 57, yearOverYear: 0.8 },
  { state: "Arizona",       abbr: "AZ", region: "West",      composite: 61, digitalMaturity: 66, valueBased: 62, sdohEquity: 59, clinicalExcellence: 61, patientExperience: 61, workforceWellness: 57, yearOverYear: 0.6 },
  { state: "New Mexico",    abbr: "NM", region: "West",      composite: 60, digitalMaturity: 62, valueBased: 61, sdohEquity: 64, clinicalExcellence: 58, patientExperience: 60, workforceWellness: 54, yearOverYear: 0.3 },
  { state: "Florida",       abbr: "FL", region: "South",     composite: 60, digitalMaturity: 63, valueBased: 61, sdohEquity: 57, clinicalExcellence: 61, patientExperience: 59, workforceWellness: 56, yearOverYear: -0.3 },
  { state: "Georgia",       abbr: "GA", region: "South",     composite: 58, digitalMaturity: 62, valueBased: 59, sdohEquity: 55, clinicalExcellence: 59, patientExperience: 57, workforceWellness: 54, yearOverYear: 0.4 },
  { state: "South Carolina",abbr: "SC", region: "South",     composite: 57, digitalMaturity: 60, valueBased: 57, sdohEquity: 54, clinicalExcellence: 58, patientExperience: 56, workforceWellness: 52, yearOverYear: 0.2 },
  { state: "Texas",         abbr: "TX", region: "South",     composite: 57, digitalMaturity: 63, valueBased: 58, sdohEquity: 53, clinicalExcellence: 57, patientExperience: 56, workforceWellness: 53, yearOverYear: -0.1 },
  { state: "Nevada",        abbr: "NV", region: "West",      composite: 56, digitalMaturity: 61, valueBased: 57, sdohEquity: 54, clinicalExcellence: 55, patientExperience: 55, workforceWellness: 53, yearOverYear: 0.1 },
  { state: "Tennessee",     abbr: "TN", region: "South",     composite: 56, digitalMaturity: 59, valueBased: 56, sdohEquity: 53, clinicalExcellence: 57, patientExperience: 55, workforceWellness: 51, yearOverYear: 0.0 },
  { state: "Kentucky",      abbr: "KY", region: "South",     composite: 54, digitalMaturity: 56, valueBased: 54, sdohEquity: 52, clinicalExcellence: 55, patientExperience: 53, workforceWellness: 49, yearOverYear: -0.2 },
  { state: "Oklahoma",      abbr: "OK", region: "South",     composite: 52, digitalMaturity: 54, valueBased: 53, sdohEquity: 50, clinicalExcellence: 53, patientExperience: 51, workforceWellness: 48, yearOverYear: -0.4 },
  { state: "Arkansas",      abbr: "AR", region: "South",     composite: 50, digitalMaturity: 52, valueBased: 51, sdohEquity: 49, clinicalExcellence: 51, patientExperience: 49, workforceWellness: 46, yearOverYear: -0.3 },
  { state: "Louisiana",     abbr: "LA", region: "South",     composite: 51, digitalMaturity: 53, valueBased: 51, sdohEquity: 49, clinicalExcellence: 52, patientExperience: 50, workforceWellness: 47, yearOverYear: -0.5 },
  { state: "Alabama",       abbr: "AL", region: "South",     composite: 49, digitalMaturity: 51, valueBased: 49, sdohEquity: 47, clinicalExcellence: 50, patientExperience: 48, workforceWellness: 45, yearOverYear: -0.6 },
  { state: "Mississippi",   abbr: "MS", region: "South",     composite: 48, digitalMaturity: 49, valueBased: 48, sdohEquity: 46, clinicalExcellence: 49, patientExperience: 47, workforceWellness: 44, yearOverYear: -0.8 },
  { state: "West Virginia", abbr: "WV", region: "South",     composite: 47, digitalMaturity: 48, valueBased: 47, sdohEquity: 46, clinicalExcellence: 48, patientExperience: 46, workforceWellness: 43, yearOverYear: -0.9 },
  { state: "Alaska",        abbr: "AK", region: "West",      composite: 59, digitalMaturity: 60, valueBased: 58, sdohEquity: 63, clinicalExcellence: 57, patientExperience: 61, workforceWellness: 55, yearOverYear: 0.5 },
];

// Compute composite, find top/weakest domain, assign ranks
const DOMAIN_LABELS: Record<string, string> = {
  digitalMaturity: "Digital Maturity",
  valueBased: "Value-Based Care",
  sdohEquity: "SDOH/Equity",
  clinicalExcellence: "Clinical Excellence",
  patientExperience: "Patient Experience",
  workforceWellness: "Workforce Wellness",
};

function getDomainExtremes(s: Omit<StateRecord, "rank">) {
  const domains = [
    { key: "digitalMaturity", val: s.digitalMaturity },
    { key: "valueBased", val: s.valueBased },
    { key: "sdohEquity", val: s.sdohEquity },
    { key: "clinicalExcellence", val: s.clinicalExcellence },
    { key: "patientExperience", val: s.patientExperience },
    { key: "workforceWellness", val: s.workforceWellness },
  ];
  const sorted = [...domains].sort((a, b) => b.val - a.val);
  return { top: DOMAIN_LABELS[sorted[0].key], weakest: DOMAIN_LABELS[sorted[sorted.length - 1].key] };
}

const NATIONAL_AVG = {
  digitalMaturity: 65,
  valueBased: 65,
  sdohEquity: 63,
  clinicalExcellence: 65,
  patientExperience: 64,
  workforceWellness: 59,
};

const STATES: StateRecord[] = [...RAW_STATES]
  .sort((a, b) => b.composite - a.composite)
  .map((s, i) => ({ ...s, rank: i + 1 }));

// ─────────────────────────────────────────────────────────────
// DATA: HOSPITAL SYSTEMS
// ─────────────────────────────────────────────────────────────

const RAW_HOSPITALS: Omit<HospitalSystem, "rank">[] = [
  { name: "Kaiser Permanente",                  state: "CA", region: "West",      type: "Integrated",  maturity: 95, revenueRisk: 98, acoApm: 96, qualityPerf: 94, dataAnalytics: 97, patientEngagement: 92, trend: 1.2 },
  { name: "Geisinger Health",                   state: "PA", region: "Northeast", type: "Non-profit",  maturity: 88, revenueRisk: 88, acoApm: 90, qualityPerf: 89, dataAnalytics: 87, patientEngagement: 85, trend: 0.8 },
  { name: "Intermountain Health",               state: "UT", region: "West",      type: "Non-profit",  maturity: 85, revenueRisk: 84, acoApm: 86, qualityPerf: 87, dataAnalytics: 85, patientEngagement: 82, trend: 1.0 },
  { name: "Univ. of Vermont Health Network",    state: "VT", region: "Northeast", type: "Non-profit",  maturity: 79, revenueRisk: 77, acoApm: 80, qualityPerf: 81, dataAnalytics: 78, patientEngagement: 78, trend: 2.1 },
  { name: "Atrium Health",                      state: "NC", region: "South",     type: "Non-profit",  maturity: 80, revenueRisk: 79, acoApm: 81, qualityPerf: 82, dataAnalytics: 79, patientEngagement: 78, trend: 1.3 },
  { name: "Advocate Aurora Health",             state: "IL", region: "Midwest",   type: "Non-profit",  maturity: 78, revenueRisk: 77, acoApm: 79, qualityPerf: 79, dataAnalytics: 78, patientEngagement: 76, trend: 0.9 },
  { name: "MaineHealth",                        state: "ME", region: "Northeast", type: "Non-profit",  maturity: 76, revenueRisk: 74, acoApm: 77, qualityPerf: 78, dataAnalytics: 75, patientEngagement: 76, trend: 1.8 },
  { name: "Northwell Health",                   state: "NY", region: "Northeast", type: "Non-profit",  maturity: 75, revenueRisk: 73, acoApm: 76, qualityPerf: 76, dataAnalytics: 75, patientEngagement: 74, trend: 0.7 },
  { name: "Dartmouth-Hitchcock Health",         state: "NH", region: "Northeast", type: "Non-profit",  maturity: 74, revenueRisk: 73, acoApm: 75, qualityPerf: 75, dataAnalytics: 74, patientEngagement: 73, trend: 1.2 },
  { name: "Mass General Brigham",               state: "MA", region: "Northeast", type: "Non-profit",  maturity: 74, revenueRisk: 72, acoApm: 75, qualityPerf: 77, dataAnalytics: 76, patientEngagement: 71, trend: 0.5 },
  { name: "Beth Israel Lahey Health",           state: "MA", region: "Northeast", type: "Non-profit",  maturity: 72, revenueRisk: 71, acoApm: 73, qualityPerf: 74, dataAnalytics: 72, patientEngagement: 70, trend: 0.6 },
  { name: "Providence Health & Services",       state: "WA", region: "West",      type: "Non-profit",  maturity: 73, revenueRisk: 71, acoApm: 74, qualityPerf: 74, dataAnalytics: 73, patientEngagement: 72, trend: 0.9 },
  { name: "UPMC",                               state: "PA", region: "Northeast", type: "Non-profit",  maturity: 77, revenueRisk: 76, acoApm: 78, qualityPerf: 78, dataAnalytics: 77, patientEngagement: 75, trend: 0.8 },
  { name: "Ochsner Health",                     state: "LA", region: "South",     type: "Non-profit",  maturity: 71, revenueRisk: 69, acoApm: 72, qualityPerf: 73, dataAnalytics: 71, patientEngagement: 71, trend: 1.1 },
  { name: "Cleveland Clinic",                   state: "OH", region: "Midwest",   type: "Non-profit",  maturity: 71, revenueRisk: 67, acoApm: 71, qualityPerf: 78, dataAnalytics: 73, patientEngagement: 68, trend: 0.4 },
  { name: "ChristianaCare",                     state: "DE", region: "Northeast", type: "Non-profit",  maturity: 71, revenueRisk: 70, acoApm: 72, qualityPerf: 72, dataAnalytics: 71, patientEngagement: 70, trend: 1.3 },
  { name: "Spectrum Health / Corewell",         state: "MI", region: "Midwest",   type: "Non-profit",  maturity: 70, revenueRisk: 69, acoApm: 71, qualityPerf: 71, dataAnalytics: 70, patientEngagement: 69, trend: 1.0 },
  { name: "Banner Health",                      state: "AZ", region: "West",      type: "Non-profit",  maturity: 69, revenueRisk: 68, acoApm: 70, qualityPerf: 70, dataAnalytics: 69, patientEngagement: 68, trend: 0.7 },
  { name: "RWJBarnabas Health",                 state: "NJ", region: "Northeast", type: "Non-profit",  maturity: 67, revenueRisk: 65, acoApm: 68, qualityPerf: 68, dataAnalytics: 67, patientEngagement: 66, trend: 0.5 },
  { name: "Trinity Health",                     state: "MI", region: "Midwest",   type: "Non-profit",  maturity: 68, revenueRisk: 66, acoApm: 69, qualityPerf: 69, dataAnalytics: 68, patientEngagement: 67, trend: 0.6 },
  { name: "Mayo Clinic",                        state: "MN", region: "Midwest",   type: "Non-profit",  maturity: 68, revenueRisk: 55, acoApm: 65, qualityPerf: 91, dataAnalytics: 78, patientEngagement: 70, trend: 0.3 },
  { name: "Sanford Health",                     state: "SD", region: "Midwest",   type: "Non-profit",  maturity: 66, revenueRisk: 64, acoApm: 67, qualityPerf: 67, dataAnalytics: 66, patientEngagement: 65, trend: 0.4 },
  { name: "CommonSpirit Health",                state: "IL", region: "Midwest",   type: "Non-profit",  maturity: 72, revenueRisk: 71, acoApm: 73, qualityPerf: 73, dataAnalytics: 72, patientEngagement: 71, trend: 0.7 },
  { name: "Ascension Health",                   state: "MO", region: "Midwest",   type: "Non-profit",  maturity: 65, revenueRisk: 63, acoApm: 66, qualityPerf: 66, dataAnalytics: 65, patientEngagement: 64, trend: 0.2 },
  { name: "Prisma Health",                      state: "SC", region: "South",     type: "Non-profit",  maturity: 64, revenueRisk: 62, acoApm: 65, qualityPerf: 65, dataAnalytics: 64, patientEngagement: 63, trend: 0.5 },
  { name: "Bon Secours Mercy Health",           state: "OH", region: "Midwest",   type: "Non-profit",  maturity: 62, revenueRisk: 60, acoApm: 63, qualityPerf: 63, dataAnalytics: 62, patientEngagement: 61, trend: 0.3 },
  { name: "Ballad Health",                      state: "TN", region: "South",     type: "Non-profit",  maturity: 58, revenueRisk: 56, acoApm: 59, qualityPerf: 59, dataAnalytics: 58, patientEngagement: 57, trend: 0.1 },
  { name: "HCA Healthcare",                     state: "TN", region: "South",     type: "For-profit",  maturity: 58, revenueRisk: 52, acoApm: 57, qualityPerf: 61, dataAnalytics: 64, patientEngagement: 57, trend: -0.2 },
  { name: "Tenet Healthcare",                   state: "TX", region: "South",     type: "For-profit",  maturity: 55, revenueRisk: 48, acoApm: 54, qualityPerf: 58, dataAnalytics: 60, patientEngagement: 54, trend: -0.4 },
  { name: "Community Health Systems",           state: "TN", region: "South",     type: "For-profit",  maturity: 50, revenueRisk: 42, acoApm: 49, qualityPerf: 53, dataAnalytics: 55, patientEngagement: 50, trend: -0.6 },
];

const HOSPITALS: HospitalSystem[] = [...RAW_HOSPITALS]
  .sort((a, b) => b.maturity - a.maturity)
  .map((h, i) => ({ ...h, rank: i + 1 }));

const HOSPITAL_AVG = {
  revenueRisk: 68,
  acoApm: 69,
  qualityPerf: 71,
  dataAnalytics: 71,
  patientEngagement: 69,
};

// ─────────────────────────────────────────────────────────────
// DATA: PAYERS
// ─────────────────────────────────────────────────────────────

const RAW_PAYERS: Omit<Payer, "rank">[] = [
  { name: "CMS / Medicare",               payerType: "Government",          innovationScore: 90, apmPaymentPct: 92, apmModelTypes: 10, qualityMetrics: 92, sdohInvestment: 85, dataSharing: 88, trend: 1.5 },
  { name: "Kaiser Foundation Health Plan",payerType: "Integrated",          innovationScore: 88, apmPaymentPct: 90, apmModelTypes: 9,  qualityMetrics: 90, sdohInvestment: 86, dataSharing: 91, trend: 0.8 },
  { name: "BCBS Massachusetts (AQC)",     payerType: "Commercial",          innovationScore: 82, apmPaymentPct: 84, apmModelTypes: 8,  qualityMetrics: 84, sdohInvestment: 79, dataSharing: 80, trend: 1.2 },
  { name: "BCBS Vermont (BCBSVT)",        payerType: "Commercial",          innovationScore: 78, apmPaymentPct: 80, apmModelTypes: 7,  qualityMetrics: 79, sdohInvestment: 80, dataSharing: 76, trend: 2.0 },
  { name: "Humana",                       payerType: "Medicare Advantage",  innovationScore: 75, apmPaymentPct: 77, apmModelTypes: 7,  qualityMetrics: 76, sdohInvestment: 73, dataSharing: 73, trend: 1.0 },
  { name: "CDPHP (NY)",                   payerType: "Commercial",          innovationScore: 76, apmPaymentPct: 77, apmModelTypes: 7,  qualityMetrics: 77, sdohInvestment: 74, dataSharing: 74, trend: 1.4 },
  { name: "BCBS Michigan (PGIP)",         payerType: "Commercial",          innovationScore: 74, apmPaymentPct: 75, apmModelTypes: 7,  qualityMetrics: 75, sdohInvestment: 71, dataSharing: 73, trend: 0.9 },
  { name: "UnitedHealthcare",             payerType: "Commercial",          innovationScore: 72, apmPaymentPct: 73, apmModelTypes: 7,  qualityMetrics: 73, sdohInvestment: 69, dataSharing: 71, trend: 0.6 },
  { name: "CVS / Aetna",                  payerType: "Commercial",          innovationScore: 70, apmPaymentPct: 71, apmModelTypes: 6,  qualityMetrics: 71, sdohInvestment: 68, dataSharing: 70, trend: 0.8 },
  { name: "Point32Health (Harvard/Tufts)",payerType: "Commercial",          innovationScore: 71, apmPaymentPct: 72, apmModelTypes: 6,  qualityMetrics: 72, sdohInvestment: 69, dataSharing: 70, trend: 1.1 },
  { name: "Priority Health (MI)",         payerType: "Commercial",          innovationScore: 73, apmPaymentPct: 74, apmModelTypes: 6,  qualityMetrics: 73, sdohInvestment: 71, dataSharing: 71, trend: 1.0 },
  { name: "Cigna",                        payerType: "Commercial",          innovationScore: 68, apmPaymentPct: 69, apmModelTypes: 6,  qualityMetrics: 69, sdohInvestment: 66, dataSharing: 67, trend: 0.5 },
  { name: "Independence BCBS PA",         payerType: "Commercial",          innovationScore: 67, apmPaymentPct: 68, apmModelTypes: 6,  qualityMetrics: 68, sdohInvestment: 65, dataSharing: 66, trend: 0.4 },
  { name: "Medicaid (National Avg)",      payerType: "Medicaid",            innovationScore: 65, apmPaymentPct: 66, apmModelTypes: 5,  qualityMetrics: 65, sdohInvestment: 72, dataSharing: 62, trend: 0.7 },
  { name: "Elevance Health (Anthem)",     payerType: "Commercial",          innovationScore: 65, apmPaymentPct: 66, apmModelTypes: 5,  qualityMetrics: 66, sdohInvestment: 62, dataSharing: 64, trend: 0.3 },
  { name: "BCBS (National Avg)",          payerType: "Commercial",          innovationScore: 62, apmPaymentPct: 63, apmModelTypes: 5,  qualityMetrics: 63, sdohInvestment: 59, dataSharing: 61, trend: 0.2 },
  { name: "AmeriHealth Caritas",          payerType: "Medicaid",            innovationScore: 60, apmPaymentPct: 60, apmModelTypes: 4,  qualityMetrics: 61, sdohInvestment: 67, dataSharing: 57, trend: 0.4 },
  { name: "Molina Healthcare",            payerType: "Medicaid",            innovationScore: 58, apmPaymentPct: 58, apmModelTypes: 4,  qualityMetrics: 59, sdohInvestment: 63, dataSharing: 55, trend: 0.2 },
  { name: "Centene Corporation",          payerType: "Medicaid",            innovationScore: 55, apmPaymentPct: 55, apmModelTypes: 3,  qualityMetrics: 56, sdohInvestment: 60, dataSharing: 51, trend: 0.0 },
  { name: "WellCare Health Plans",        payerType: "Medicaid",            innovationScore: 52, apmPaymentPct: 52, apmModelTypes: 3,  qualityMetrics: 53, sdohInvestment: 57, dataSharing: 48, trend: -0.3 },
];

const PAYERS: Payer[] = [...RAW_PAYERS]
  .sort((a, b) => b.innovationScore - a.innovationScore)
  .map((p, i) => ({ ...p, rank: i + 1 }));

const PAYER_AVG = {
  apmPaymentPct: 69,
  apmModelTypes: 6,
  qualityMetrics: 70,
  sdohInvestment: 68,
  dataSharing: 67,
};

// ─────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 70) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 50) return "bg-orange-400";
  return "bg-red-500";
}

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 inline-flex items-center justify-center text-xs font-bold text-fuchsia-300">{rank}</span>;
}

function TrendArrow({ val }: { val: number }) {
  if (val > 0.5)  return <TrendingUp  className="w-4 h-4 text-emerald-400 inline" />;
  if (val < -0.1) return <TrendingDown className="w-4 h-4 text-red-400 inline" />;
  return <Minus className="w-4 h-4 text-slate-400 inline" />;
}

function ScoreBar({ score, avg, color }: { score: number; avg: number; color: string }) {
  return (
    <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-visible">
      <div className={`h-3 rounded-full ${color}`} style={{ width: `${score}%` }} />
      <div
        className="absolute top-0 h-3 w-0.5 bg-white opacity-60"
        style={{ left: `${avg}%` }}
        title={`National avg: ${avg}`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 1: STATE RANKINGS
// ─────────────────────────────────────────────────────────────

type StateSort = "rank" | "composite" | "digitalMaturity" | "valueBased" | "sdohEquity" | "clinicalExcellence" | "patientExperience" | "workforceWellness" | "yearOverYear";

function StateRankings() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<StateSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [topN, setTopN] = useState<number>(50);
  const [expandedState, setExpandedState] = useState<string | null>(null);

  const toggleSort = (key: StateSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...STATES];
    if (search) data = data.filter(s => s.state.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()));
    if (regionFilter !== "All") data = data.filter(s => s.region === regionFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data.slice(0, topN);
  }, [search, regionFilter, sortKey, sortDir, topN]);

  const ColHeader = ({ label, k }: { label: string; k: StateSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3 opacity-60" />
      </span>
    </th>
  );

  const handleExport = () => {
    const lines = ["Rank\tState\tComposite\tTop Domain\tWeakest Domain\tYoY Change", ...filtered.map(s => {
      const { top, weakest } = getDomainExtremes(s);
      return `${s.rank}\t${s.state}\t${s.composite}\t${top}\t${weakest}\t${s.yearOverYear > 0 ? "+" : ""}${s.yearOverYear}`;
    })];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search states..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500"
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
        >
          {["All", "Northeast", "South", "Midwest", "West"].map(r => <option key={r}>{r}</option>)}
        </select>
        <select
          className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500"
          value={topN}
          onChange={e => setTopN(Number(e.target.value))}
        >
          {[10, 15, 25, 50].map(n => <option key={n} value={n}>Top {n}</option>)}
        </select>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors"
        >
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">State</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Region</th>
              <ColHeader label="Composite" k="composite" />
              <ColHeader label="Digital" k="digitalMaturity" />
              <ColHeader label="VBC" k="valueBased" />
              <ColHeader label="SDOH/Equity" k="sdohEquity" />
              <ColHeader label="Clinical" k="clinicalExcellence" />
              <ColHeader label="Patient Exp." k="patientExperience" />
              <ColHeader label="Workforce" k="workforceWellness" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Top Domain</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Weakest</th>
              <ColHeader label="YoY" k="yearOverYear" />
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(s => {
              const { top, weakest } = getDomainExtremes(s);
              const isExpanded = expandedState === s.state;
              return (
                <React.Fragment key={s.state}>
                  <tr
                    className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedState(isExpanded ? null : s.state)}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <MedalIcon rank={s.rank} />
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-white">
                      <span className="inline-block w-7 text-center text-xs bg-fuchsia-900/60 rounded px-1 mr-1.5 text-fuchsia-300">{s.abbr}</span>
                      {s.state}
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">{s.region}</td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(s.composite)}`}>{s.composite}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{s.digitalMaturity}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.valueBased}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.sdohEquity}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.clinicalExcellence}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.patientExperience}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.workforceWellness}</td>
                    <td className="px-3 py-2.5 text-emerald-400 text-xs font-medium">{top}</td>
                    <td className="px-3 py-2.5 text-orange-400 text-xs font-medium">{weakest}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs font-semibold ${s.yearOverYear > 0 ? "text-emerald-400" : s.yearOverYear < 0 ? "text-red-400" : "text-slate-400"}`}>
                        {s.yearOverYear > 0 ? "+" : ""}{s.yearOverYear.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${s.state}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={14} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "Digital Maturity", val: s.digitalMaturity, avg: NATIONAL_AVG.digitalMaturity },
                            { label: "Value-Based Care", val: s.valueBased, avg: NATIONAL_AVG.valueBased },
                            { label: "SDOH / Equity", val: s.sdohEquity, avg: NATIONAL_AVG.sdohEquity },
                            { label: "Clinical Excellence", val: s.clinicalExcellence, avg: NATIONAL_AVG.clinicalExcellence },
                            { label: "Patient Experience", val: s.patientExperience, avg: NATIONAL_AVG.patientExperience },
                            { label: "Workforce Wellness", val: s.workforceWellness, avg: NATIONAL_AVG.workforceWellness },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label}</span>
                                <span className={scoreColor(d.val)}>{d.val} <span className="text-slate-500">/ avg {d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = national average. Weights: Digital 20%, VBC 15%, SDOH 20%, Clinical 20%, Patient Exp. 15%, Workforce 10%.</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Showing {filtered.length} of {STATES.length} states. | Last Updated: Q1 2025</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 2: HOSPITAL SYSTEMS
// ─────────────────────────────────────────────────────────────

type HospSort = "rank" | "maturity" | "revenueRisk" | "acoApm" | "qualityPerf" | "dataAnalytics" | "patientEngagement" | "trend";

function HospitalRankings() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<HospSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [expandedHosp, setExpandedHosp] = useState<string | null>(null);

  const toggleSort = (key: HospSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...HOSPITALS];
    if (search) data = data.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.state.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "All") data = data.filter(h => h.type === typeFilter);
    if (regionFilter !== "All") data = data.filter(h => h.region === regionFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [search, typeFilter, regionFilter, sortKey, sortDir]);

  const ColHeader = ({ label, k }: { label: string; k: HospSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">{label}<ArrowUpDown className="w-3 h-3 opacity-60" /></span>
    </th>
  );

  const typeBadgeColor: Record<string, string> = {
    "Non-profit": "bg-blue-900/60 text-blue-300",
    "For-profit": "bg-orange-900/60 text-orange-300",
    "Government": "bg-purple-900/60 text-purple-300",
    "Integrated": "bg-emerald-900/60 text-emerald-300",
  };

  const handleExport = () => {
    const lines = ["Rank\tSystem\tState\tType\tMaturity\tVBC Revenue%\tTrend", ...filtered.map(h =>
      `${h.rank}\t${h.name}\t${h.state}\t${h.type}\t${h.maturity}\t${h.revenueRisk}%\t${h.trend > 0 ? "+" : ""}${h.trend}`
    )];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search health systems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {["All", "Non-profit", "For-profit", "Government", "Integrated"].map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
          {["All", "Northeast", "South", "Midwest", "West"].map(r => <option key={r}>{r}</option>)}
        </select>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors">
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">System</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">State</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Type</th>
              <ColHeader label="Maturity" k="maturity" />
              <ColHeader label="% Risk Rev." k="revenueRisk" />
              <ColHeader label="ACO/APM" k="acoApm" />
              <ColHeader label="Quality" k="qualityPerf" />
              <ColHeader label="Data & Analytics" k="dataAnalytics" />
              <ColHeader label="Pt. Engagement" k="patientEngagement" />
              <ColHeader label="Trend" k="trend" />
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(h => {
              const isExpanded = expandedHosp === h.name;
              return (
                <>
                  <tr
                    key={h.name}
                    className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedHosp(isExpanded ? null : h.name)}
                  >
                    <td className="px-3 py-2.5"><MedalIcon rank={h.rank} /></td>
                    <td className="px-3 py-2.5 font-semibold text-white">{h.name}</td>
                    <td className="px-3 py-2.5 text-slate-400">{h.state}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColor[h.type]}`}>{h.type}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(h.maturity)}`}>{h.maturity}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{h.revenueRisk}%</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.acoApm}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.qualityPerf}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.dataAnalytics}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.patientEngagement}</td>
                    <td className="px-3 py-2.5">
                      <TrendArrow val={h.trend} />
                      <span className={`ml-1 text-xs ${h.trend > 0.5 ? "text-emerald-400" : h.trend < -0.1 ? "text-red-400" : "text-slate-400"}`}>
                        {h.trend > 0 ? "+" : ""}{h.trend.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${h.name}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={12} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "% Revenue in Risk Contracts", val: h.revenueRisk, avg: HOSPITAL_AVG.revenueRisk },
                            { label: "ACO / APM Participation", val: h.acoApm, avg: HOSPITAL_AVG.acoApm },
                            { label: "Quality Performance Composite", val: h.qualityPerf, avg: HOSPITAL_AVG.qualityPerf },
                            { label: "Data & Analytics Capability", val: h.dataAnalytics, avg: HOSPITAL_AVG.dataAnalytics },
                            { label: "Patient Engagement Level", val: h.patientEngagement, avg: HOSPITAL_AVG.patientEngagement },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label}</span>
                                <span className={scoreColor(d.val)}>{d.val} <span className="text-slate-500">/ avg {d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = peer average. VBC Maturity Index assesses transition from fee-for-service to value-based models across 5 dimensions.</p>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Showing {filtered.length} of {HOSPITALS.length} health systems. | Last Updated: Q1 2025</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 3: PAYER INNOVATION INDEX
// ─────────────────────────────────────────────────────────────

type PayerSort = "rank" | "innovationScore" | "apmPaymentPct" | "apmModelTypes" | "qualityMetrics" | "sdohInvestment" | "dataSharing" | "trend";

function PayerRankings() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<PayerSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [expandedPayer, setExpandedPayer] = useState<string | null>(null);

  const toggleSort = (key: PayerSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...PAYERS];
    if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "All") data = data.filter(p => p.payerType === typeFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [search, typeFilter, sortKey, sortDir]);

  const ColHeader = ({ label, k }: { label: string; k: PayerSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">{label}<ArrowUpDown className="w-3 h-3 opacity-60" /></span>
    </th>
  );

  const typeBadgeColor: Record<string, string> = {
    "Commercial":         "bg-blue-900/60 text-blue-300",
    "Medicare Advantage": "bg-purple-900/60 text-purple-300",
    "Medicaid":           "bg-orange-900/60 text-orange-300",
    "Integrated":         "bg-emerald-900/60 text-emerald-300",
    "Government":         "bg-yellow-900/60 text-yellow-300",
  };

  const handleExport = () => {
    const lines = ["Rank\tPayer\tType\tInnovation Score\tAPM Payment %\tAPM Model Types\tQuality Metrics\tSDOH Investment\tData Sharing\tTrend", ...filtered.map(p =>
      `${p.rank}\t${p.name}\t${p.payerType}\t${p.innovationScore}\t${p.apmPaymentPct}%\t${p.apmModelTypes}\t${p.qualityMetrics}\t${p.sdohInvestment}\t${p.dataSharing}\t${p.trend > 0 ? "+" : ""}${p.trend}`
    )];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search payers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {["All", "Commercial", "Medicare Advantage", "Medicaid", "Integrated", "Government"].map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors">
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Payer</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Type</th>
              <ColHeader label="Innovation Score" k="innovationScore" />
              <ColHeader label="APM Pay %" k="apmPaymentPct" />
              <ColHeader label="APM Models" k="apmModelTypes" />
              <ColHeader label="Quality Metrics" k="qualityMetrics" />
              <ColHeader label="SDOH Programs" k="sdohInvestment" />
              <ColHeader label="Data Sharing" k="dataSharing" />
              <ColHeader label="Trend" k="trend" />
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(p => {
              const isExpanded = expandedPayer === p.name;
              const isLeader = p.rank <= 5;
              return (
                <>
                  <tr
                    key={p.name}
                    className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedPayer(isExpanded ? null : p.name)}
                  >
                    <td className="px-3 py-2.5"><MedalIcon rank={p.rank} /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{p.name}</span>
                        {isLeader && (
                          <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full bg-fuchsia-900/80 text-fuchsia-300 border border-fuchsia-700/50">
                            <Star className="w-3 h-3" /> Leader
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColor[p.payerType]}`}>{p.payerType}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(p.innovationScore)}`}>{p.innovationScore}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{p.apmPaymentPct}%</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.apmModelTypes}/10</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.qualityMetrics}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.sdohInvestment}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.dataSharing}</td>
                    <td className="px-3 py-2.5">
                      <TrendArrow val={p.trend} />
                      <span className={`ml-1 text-xs ${p.trend > 0.5 ? "text-emerald-400" : p.trend < -0.1 ? "text-red-400" : "text-slate-400"}`}>
                        {p.trend > 0 ? "+" : ""}{p.trend.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${p.name}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={11} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "% of Payments in APMs", val: p.apmPaymentPct, avg: PAYER_AVG.apmPaymentPct },
                            { label: "APM Model Type Diversity (×10)", val: p.apmModelTypes * 10, avg: PAYER_AVG.apmModelTypes * 10 },
                            { label: "Quality Metric Sophistication", val: p.qualityMetrics, avg: PAYER_AVG.qualityMetrics },
                            { label: "SDOH Investment Programs", val: p.sdohInvestment, avg: PAYER_AVG.sdohInvestment },
                            { label: "Data Sharing with Providers", val: p.dataSharing, avg: PAYER_AVG.dataSharing },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label}</span>
                                <span className={scoreColor(d.val)}>{d.label.includes("APM Model") ? `${p.apmModelTypes}/10` : d.val} <span className="text-slate-500">/ avg {d.label.includes("APM Model") ? `${PAYER_AVG.apmModelTypes}/10` : d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = peer average. Innovation Index measures aggressiveness of APM portfolio and commitment to value-based payment reform.</p>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Showing {filtered.length} of {PAYERS.length} payers. | Last Updated: Q1 2025</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "states",
    label: "State Health Transformation Rankings",
    icon: <Globe className="w-4 h-4" />,
    description: "HTI composite scores across all 50 states — 6 domains, weighted index",
  },
  {
    id: "hospitals",
    label: "Hospital System VBC Maturity",
    icon: <Building2 className="w-4 h-4" />,
    description: "Value-Based Care maturity index for 30 major U.S. health systems",
  },
  {
    id: "payers",
    label: "Payer Innovation Index",
    icon: <Shield className="w-4 h-4" />,
    description: "APM portfolio aggressiveness ranking for 20 national payers",
  },
];

export default function InnovationLeaderboard() {
  const [activeTab, setActiveTab] = useState<TabId>("states");
  const [showMethodology, setShowMethodology] = useState(false);

  const topState   = STATES[0];
  const topHosp    = HOSPITALS[0];
  const topPayer   = PAYERS[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-fuchsia-950 via-gray-900 to-gray-950 border-b border-fuchsia-800/30 px-6 py-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-fuchsia-800/40 rounded-xl border border-fuchsia-700/40">
                  <Trophy className="w-6 h-6 text-fuchsia-300" />
                </div>
                <h1 className="text-2xl font-bold text-white">Innovation Leaderboard &amp; Benchmarks</h1>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl">
                Comprehensive rankings of healthcare transformation performance across states, health systems, and payers.
                Data reflects 2024 performance with Q1 2025 updates.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-fuchsia-900/40 border border-fuchsia-700/30 text-fuchsia-300">
                Last Updated: Q1 2025
              </span>
              <button
                onClick={() => setShowMethodology(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700/40 text-slate-400 hover:text-white transition-colors"
              >
                <Info className="w-3.5 h-3.5" /> Methodology
              </button>
            </div>
          </div>

          {/* Methodology panel */}
          {showMethodology && (
            <div className="mt-4 p-4 bg-gray-900/80 rounded-xl border border-fuchsia-800/30 text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-fuchsia-300 mb-2">Scoring Methodology</p>
              <p className="mb-2">
                <strong className="text-white">State HTI Composite:</strong> Weighted average of six domain scores (0–100 each):
                Digital Maturity (20%), Value-Based Care Adoption (15%), SDOH &amp; Equity Integration (20%),
                Clinical Excellence (20%), Patient Experience (15%), Workforce Wellness (10%).
                Scores derived from CMS quality data, state health department reports, NCQA accreditation, AHRQ datasets, and proprietary survey data.
              </p>
              <p className="mb-2">
                <strong className="text-white">Hospital VBC Maturity Index:</strong> Five-dimension framework assessing
                % revenue in risk contracts, ACO/APM program participation breadth, quality performance composite (HEDIS/CMS Star),
                data &amp; analytics infrastructure capability, and patient engagement program sophistication.
              </p>
              <p>
                <strong className="text-white">Payer Innovation Index:</strong> Measures aggressiveness of Alternative Payment Model portfolio.
                Dimensions: % of total payments flowing through APMs, diversity of APM model types (MSSP, REACH, bundles, episode payments, P4P, global caps),
                quality metric sophistication, SDOH investment program scope, and bidirectional data-sharing infrastructure with provider partners.
              </p>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Top State",  val: topState.state,  score: topState.composite,  icon: <Globe className="w-4 h-4 text-fuchsia-400" /> },
              { label: "Top System", val: topHosp.name,    score: topHosp.maturity,    icon: <Building2 className="w-4 h-4 text-fuchsia-400" /> },
              { label: "Top Payer",  val: topPayer.name,   score: topPayer.innovationScore, icon: <Shield className="w-4 h-4 text-fuchsia-400" /> },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3 bg-gray-900/60 rounded-xl px-4 py-3 border border-fuchsia-800/20">
                <div className="p-1.5 bg-fuchsia-900/40 rounded-lg">{c.icon}</div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">{c.label}</p>
                  <p className="text-sm font-semibold text-white truncate">{c.val}</p>
                </div>
                <div className="ml-auto">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <p className="text-xs font-bold text-yellow-400 text-right">{c.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-900/40"
                  : "bg-gray-800/60 text-slate-400 hover:text-white hover:bg-gray-800 border border-gray-700/40"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab description */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <BarChart2 className="w-3.5 h-3.5 text-fuchsia-400" />
          {TABS.find(t => t.id === activeTab)?.description}
        </div>

        {/* Tab content */}
        <div className="pb-16">
          {activeTab === "states"    && <StateRankings />}
          {activeTab === "hospitals" && <HospitalRankings />}
          {activeTab === "payers"    && <PayerRankings />}
        </div>
      </div>
    </div>
  );
}
