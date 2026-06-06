import { Hono } from "hono";
import { db } from "../database";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";

// Seed actors data (25 diverse actors for free tier)
const SEED_ACTORS = [
  { id: "actor-001", name: "Maya Chen", gender: "Female", ageRange: "26-35", ethnicity: "Asian", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-001.png", voiceId: "21m00Tcm4TlvDq8ikWAM" },
  { id: "actor-002", name: "James Wright", gender: "Male", ageRange: "26-35", ethnicity: "Black", style: "Casual", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-002.png", voiceId: "AZnzlk1XvdvUeBnXmlld" },
  { id: "actor-003", name: "Sofia Garcia", gender: "Female", ageRange: "18-25", ethnicity: "Hispanic", style: "Trendy", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-003.png", voiceId: "EXAVITQu4vr4xnSDxMaL" },
  { id: "actor-004", name: "Marcus Thompson", gender: "Male", ageRange: "36-50", ethnicity: "Black", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-004.png", voiceId: "ErXwobaYiN019PkySvjV" },
  { id: "actor-005", name: "Priya Sharma", gender: "Female", ageRange: "26-35", ethnicity: "South Asian", style: "Professional", accent: "British", previewUrl: "", thumbnailUrl: "/actors/actor-005.png", voiceId: "MF3mGyEYCl7XYWbV9V6O" },
  { id: "actor-006", name: "Tyler Brooks", gender: "Male", ageRange: "18-25", ethnicity: "White", style: "Casual", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-006.png", voiceId: "TxGEqnHWrfWFTfGW9XjX" },
  { id: "actor-007", name: "Amara Johnson", gender: "Female", ageRange: "26-35", ethnicity: "Black", style: "Energetic", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-007.png", voiceId: "VR6AewLTigWG4xSOukaG" },
  { id: "actor-008", name: "Hiroshi Tanaka", gender: "Male", ageRange: "26-35", ethnicity: "Asian", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-008.png", voiceId: "pNInz6obpgDQGcFmaJgB" },
  { id: "actor-009", name: "Isabella Torres", gender: "Female", ageRange: "18-25", ethnicity: "Hispanic", style: "Casual", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-009.png", voiceId: "yoZ06aMxZJJ28mfd3POQ" },
  { id: "actor-010", name: "David Kim", gender: "Male", ageRange: "26-35", ethnicity: "Asian", style: "Casual", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-010.png", voiceId: "flq6f7yk4E4fJM5XTYuZ" },
  { id: "actor-011", name: "Emma Williams", gender: "Female", ageRange: "36-50", ethnicity: "White", style: "Professional", accent: "British", previewUrl: "", thumbnailUrl: "/actors/actor-011.png", voiceId: "XrExE9yKIg1WjnnlVkGX" },
  { id: "actor-012", name: "Carlos Mendez", gender: "Male", ageRange: "26-35", ethnicity: "Hispanic", style: "Energetic", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-012.png", voiceId: "onwK4e9ZLuTAKqWW03F9" },
  { id: "actor-013", name: "Aisha Patel", gender: "Female", ageRange: "26-35", ethnicity: "South Asian", style: "Trendy", accent: "British", previewUrl: "", thumbnailUrl: "/actors/actor-013.png", voiceId: "piTKgcLEGmPE4e6mEKli" },
  { id: "actor-014", name: "Ryan Mitchell", gender: "Male", ageRange: "18-25", ethnicity: "White", style: "Casual", accent: "Australian", previewUrl: "", thumbnailUrl: "/actors/actor-014.png", voiceId: "ODq5zmih8GrVes37Dizd" },
  { id: "actor-015", name: "Fatima Al-Hassan", gender: "Female", ageRange: "26-35", ethnicity: "Middle Eastern", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-015.png", voiceId: "ThT5KcBeYPX3keUQqHPh" },
  { id: "actor-016", name: "Noah Anderson", gender: "Male", ageRange: "36-50", ethnicity: "White", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-016.png", voiceId: "g5CIjZEefAph4nQFvHAz" },
  { id: "actor-017", name: "Keiko Nakamura", gender: "Female", ageRange: "18-25", ethnicity: "Asian", style: "Trendy", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-017.png", voiceId: "jBpfuIE2acCO8z3wKNLl" },
  { id: "actor-018", name: "Emmanuel Obi", gender: "Male", ageRange: "26-35", ethnicity: "Black", style: "Energetic", accent: "British", previewUrl: "", thumbnailUrl: "/actors/actor-018.png", voiceId: "t0jbNlBVZ17f02VDIeMI" },
  { id: "actor-019", name: "Valentina Cruz", gender: "Female", ageRange: "26-35", ethnicity: "Hispanic", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-019.png", voiceId: "bVMeCyTHy58xNoL34h3p" },
  { id: "actor-020", name: "Lucas Bennett", gender: "Male", ageRange: "26-35", ethnicity: "White", style: "Casual", accent: "British", previewUrl: "", thumbnailUrl: "/actors/actor-020.png", voiceId: "nPczCjzI2devNBz1zQrb" },
  { id: "actor-021", name: "Nadia Petrov", gender: "Female", ageRange: "26-35", ethnicity: "European", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-021.png", voiceId: "wViXBPUzp2ZZixB1xQuM" },
  { id: "actor-022", name: "Jaylen Foster", gender: "Male", ageRange: "18-25", ethnicity: "Black", style: "Trendy", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-022.png", voiceId: "z9fAnlkpzviPz146aGWa" },
  { id: "actor-023", name: "Mei Lin", gender: "Female", ageRange: "36-50", ethnicity: "Asian", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-023.png", voiceId: "SAz9YHcvj6GT2YYXdXww" },
  { id: "actor-024", name: "Antonio Silva", gender: "Male", ageRange: "36-50", ethnicity: "Hispanic", style: "Professional", accent: "American", previewUrl: "", thumbnailUrl: "/actors/actor-024.png", voiceId: "TX3LPaxmHKxFdv7VOQHJ" },
  { id: "actor-025", name: "Olivia Parker", gender: "Female", ageRange: "26-35", ethnicity: "White", style: "Energetic", accent: "Australian", previewUrl: "", thumbnailUrl: "/actors/actor-025.png", voiceId: "XB0fDUnXU5powFXDhCwa" },
];

export const actors = new Hono()
  .get("/", async (c) => {
    const { gender, ageRange, style, accent } = c.req.query();
    // Return seed actors with optional filtering
    let filtered = SEED_ACTORS;
    if (gender && gender !== "All") filtered = filtered.filter((a) => a.gender === gender);
    if (ageRange && ageRange !== "All") filtered = filtered.filter((a) => a.ageRange === ageRange);
    if (style && style !== "All") filtered = filtered.filter((a) => a.style === style);
    if (accent && accent !== "All") filtered = filtered.filter((a) => a.accent === accent);
    return c.json({ actors: filtered }, 200);
  })
  .get("/:id", async (c) => {
    const actor = SEED_ACTORS.find((a) => a.id === c.req.param("id"));
    if (!actor) return c.json({ message: "Not found" }, 404);
    return c.json({ actor }, 200);
  });
