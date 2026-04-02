"use client";

import { useState } from "react";
import { FileText, Download, Share2, Mail, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const periods = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom range"];
const sections = [
  { key: "weight", label: "Weight & BMI Trend", checked: true },
  { key: "nutrition", label: "Nutrition Summary", checked: true },
  { key: "macros", label: "Macro & Micro Analysis", checked: true },
  { key: "water", label: "Water Intake", checked: true },
  { key: "exercise", label: "Exercise Log", checked: true },
  { key: "sleep", label: "Sleep Data", checked: false },
  { key: "vitals", label: "Vitals (BP, Blood Sugar)", checked: false },
  { key: "medication", label: "Medication Adherence", checked: false },
  { key: "insights", label: "AI Health Insights", checked: true },
];

export default function DoctorReportPage() {
  const [period, setPeriod] = useState("Last 30 days");
  const [selectedSections, setSelectedSections] = useState(sections.filter((s) => s.checked).map((s) => s.key));
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function toggleSection(key: string) {
    setSelectedSections((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  }

  async function generate() {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 3000));
    setGenerating(false);
    setGenerated(true);
    toast.success("Report generated!");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <FileText className="size-6 text-blue-500" />
          Doctor-Ready Report
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Generate a professional health report to share with your doctor.</p>
      </div>

      {/* Period */}
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Time Period</Label>
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-colors", period === p ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Include in Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sections.map((s) => (
            <label key={s.key} className="flex items-center gap-3 cursor-pointer">
              <div className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-colors", selectedSections.includes(s.key) ? "bg-primary border-primary" : "border-muted-foreground/30")} onClick={() => toggleSection(s.key)}>
                {selectedSections.includes(s.key) && <Check className="size-3 text-white" />}
              </div>
              <span className="text-sm">{s.label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Optional fields */}
      <div className="space-y-3">
        <div>
          <Label htmlFor="doctor">Doctor name (optional)</Label>
          <Input id="doctor" placeholder="Dr. Sharma" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="notes">Additional notes for doctor</Label>
          <Textarea id="notes" placeholder="Any symptoms or concerns to highlight..." className="mt-1" />
        </div>
      </div>

      {/* Generate */}
      <Button className="w-full h-12" onClick={generate} disabled={generating || selectedSections.length === 0}>
        {generating ? "Generating report..." : generated ? "Regenerate Report" : "Generate Report"}
      </Button>

      {/* Share options */}
      {generated && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Share Report</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { label: "Download PDF", icon: Download },
              { label: "WhatsApp", icon: Share2 },
              { label: "Email Doctor", icon: Mail },
              { label: "Print", icon: Printer },
            ].map((opt) => (
              <Button key={opt.label} variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => toast.success(`${opt.label} — coming soon!`)}>
                <opt.icon className="size-5" />
                <span className="text-xs">{opt.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-center">
        This report is based on self-reported data and AI analysis. It is not a substitute for professional medical advice.
      </p>
    </div>
  );
}
