"use client";

import { useState } from "react";
import { Search, Leaf, Clock, FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Cold & Flu", "Digestion", "Immunity", "Inflammation", "Skin & Hair", "Energy", "Sleep", "Blood Sugar", "Heart Health"];

const remedies = [
  { title: "Haldi Doodh (Golden Milk)", ingredients: ["Turmeric", "Milk", "Black Pepper"], evidence: "Strong", time: "5 min", tags: ["Anti-inflammatory", "Immunity"], forSymptoms: ["Cold", "Sore Throat", "Joint Pain"] },
  { title: "Ginger-Honey Tea", ingredients: ["Ginger", "Honey", "Lemon"], evidence: "Strong", time: "5 min", tags: ["Cold & Flu", "Digestion"], forSymptoms: ["Cold", "Cough", "Nausea"] },
  { title: "Jeera Water", ingredients: ["Cumin Seeds", "Water"], evidence: "Moderate", time: "10 min", tags: ["Digestion", "Bloating"], forSymptoms: ["Bloating", "Acidity", "Gas"] },
  { title: "Ajwain-Hing Water", ingredients: ["Carom Seeds", "Asafoetida", "Water"], evidence: "Traditional", time: "5 min", tags: ["Digestion"], forSymptoms: ["Stomach Pain", "Gas", "Indigestion"] },
  { title: "Tulsi-Ginger Kadha", ingredients: ["Holy Basil", "Ginger", "Black Pepper", "Jaggery"], evidence: "Strong", time: "15 min", tags: ["Immunity", "Cold & Flu"], forSymptoms: ["Cold", "Fever", "Low Immunity"] },
  { title: "Methi Water (Fenugreek Soak)", ingredients: ["Fenugreek Seeds", "Water"], evidence: "Strong", time: "Overnight", tags: ["Blood Sugar", "Weight"], forSymptoms: ["High Blood Sugar", "PCOS", "Cholesterol"] },
  { title: "Amla-Honey Mix", ingredients: ["Indian Gooseberry", "Honey"], evidence: "Moderate", time: "2 min", tags: ["Immunity", "Skin"], forSymptoms: ["Low Immunity", "Hair Loss", "Vitamin C Deficiency"] },
  { title: "Dalchini Tea (Cinnamon)", ingredients: ["Cinnamon", "Water", "Honey"], evidence: "Strong", time: "5 min", tags: ["Blood Sugar", "Heart Health"], forSymptoms: ["Blood Sugar Spikes", "Cholesterol"] },
];

const evidenceColors: Record<string, string> = {
  Strong: "bg-emerald-500/10 text-emerald-700",
  Moderate: "bg-amber-500/10 text-amber-700",
  Traditional: "bg-violet-500/10 text-violet-700",
};

export default function KitchenPharmacyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = remedies.filter((r) => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.forSymptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = category === "All" || r.tags.some((t) => t.toLowerCase().includes(category.toLowerCase()));
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Leaf className="size-6 text-emerald-500" />
          Kitchen Pharmacy
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Evidence-backed home remedies from Indian kitchens</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search by symptom or ingredient..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${category === c ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <Badge variant="secondary" className={`text-[10px] ${evidenceColors[r.evidence]}`}>
                  <FlaskConical className="size-3 mr-1" />
                  {r.evidence}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {r.ingredients.map((ing) => (
                  <span key={ing} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">{ing}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3" />{r.time}</span>
                <span>For: {r.forSymptoms.join(", ")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
