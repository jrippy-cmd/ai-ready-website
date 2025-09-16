"use client";

import {
  Globe,
  FileText,
  Code,
  Shield,
  Zap,
  Database,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Bot,
  Sparkles,
  FileCode,
  Network,
  Info,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";
import RadarChart from "./RadarChart";
import MetricBars from "./MetricBars";

interface ControlPanelProps {
  isAnalyzing: boolean;
  showResults: boolean;
  url: string;
  analysisData?: any;
  onReset: () => void;
}

interface CheckItem {
  id: string;
  label: string;
  description: string;
  icon: any;
  status: "pending" | "checking" | "pass" | "fail" | "warning";
  score?: number;
  details?: string;
  recommendation?: string;
  actionItems?: string[];
  tooltip?: string;
}

export default function ControlPanel({
  isAnalyzing,
  showResults,
  url,
  analysisData,
  onReset,
}: ControlPanelProps) {
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiInsights, setAiInsights] = useState<CheckItem[]>([]);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [combinedChecks, setCombinedChecks] = useState<CheckItem[]>([]);
  const [checks, setChecks] = useState<CheckItem[]>([
    { id: "heading-structure", label: "Heading Hierarchy", description: "H1-H6 structure", icon: FileText, status: "pending" },
    { id: "readability", label: "Readability", description: "Content clarity", icon: Globe, status: "pending" },
    { id: "meta-tags", label: "Metadata Quality", description: "Title, desc, author", icon: FileCode, status: "pending" },
    { id: "semantic-html", label: "Semantic HTML", description: "Proper HTML5 tags", icon: Code, status: "pending" },
    { id: "accessibility", label: "Accessibility", description: "Alt text & ARIA", icon: Eye, status: "pending" },
    { id: "llms-txt", label: "LLMs.txt", description: "AI permissions", icon: Bot, status: "pending" },
    { id: "robots-txt", label: "Robots.txt", description: "Crawler rules", icon: Shield, status: "pending" },
    { id: "sitemap", label: "Sitemap", description: "Site structure", icon: Network, status: "pending" },
  ]);

  const [overallScore, setOverallScore] = useState(0);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(-1);
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [hoveredCheck, setHoveredCheck] = useState<string | null>(null);
  const [enhancedScore, setEnhancedScore] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "chart" | "bars">("grid");

  useEffect(() => {
    if (analysisData && analysisData.checks && showResults) {
      const mappedChecks = analysisData.checks.map((check: any) => ({
        ...check,
        icon: checks.find((c) => c.id === check.id)?.icon || FileText,
        description: check.details || checks.find((c) => c.id === check.id)?.description,
      }));
      setChecks(mappedChecks);
      setCombinedChecks(mappedChecks);
      setOverallScore(analysisData.overallScore || 0);
      setCurrentCheckIndex(-1);

      if (analysisData.autoStartAI && analysisData.aiAnalysisPromise) {
        setIsAnalyzingAI(true);
        setShowAIAnalysis(true);

        const placeholderAIChecks: any[] = [
          { id: "ai-loading-0", label: "Content Quality for AI", description: "Analyzing content signal ratio...", icon: Sparkles, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-1", label: "Information Architecture", description: "Evaluating page structure...", icon: Bot, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-2", label: "Crawlability Patterns", description: "Checking JavaScript usage...", icon: Database, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-3", label: "AI Training Value", description: "Assessing training potential...", icon: Network, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-4", label: "Knowledge Extraction", description: "Analyzing entity definitions...", icon: FileCode, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-5", label: "Template Quality", description: "Reviewing semantic structure...", icon: Shield, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-6", label: "Content Depth", description: "Measuring content richness...", icon: Zap, status: "checking", score: 0, isAI: true, isLoading: true },
          { id: "ai-loading-7", label: "Machine Readability", description: "Testing extraction reliability...", icon: Globe, status: "checking", score: 0, isAI: true, isLoading: true },
        ];

        placeholderAIChecks.forEach((check, idx) => {
          setTimeout(() => setCombinedChecks((prev) => [...prev, check]), 100 * (idx + 1));
        });

        analysisData.aiAnalysisPromise
          .then(async (aiResponse: any) => {
            if (!aiResponse) return;
            const data = await aiResponse.json();
            if (!data.success || !data.insights) return;

            const aiChecks: CheckItem[] = data.insights.map((insight: any, idx: number) => ({
              ...insight,
              icon: [Sparkles, Bot, Database, Network, FileCode, Shield, Zap, Globe][idx % 8],
              description: insight.details?.substring(0, 60) + "..." ||
