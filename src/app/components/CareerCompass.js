"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  DollarSign,
  Users, 
  Zap, 
  Trophy,
  Brain,
  Globe,
  Sparkles,
  Building2
} from 'lucide-react';

// Market salary data by role and location
const SALARY_DATA = {
  "Software Engineer": {
    "US": { entry: 85000, mid: 120000, senior: 180000 },
    "India": { entry: 1200000, mid: 2000000, senior: 3500000 },
    "Europe": { entry: 45000, mid: 70000, senior: 100000 }
  },
  "Content Creator": {
    "US": { entry: 45000, mid: 85000, senior: 150000 },
    "India": { entry: 800000, mid: 1500000, senior: 2500000 },
    "Europe": { entry: 35000, mid: 60000, senior: 90000 }
  },
  "Product Manager": {
    "US": { entry: 90000, mid: 130000, senior: 190000 },
    "India": { entry: 1500000, mid: 2500000, senior: 4000000 },
    "Europe": { entry: 50000, mid: 80000, senior: 120000 }
  }
};

// Career advice based on market position
const getCareerAdvice = (role, experience, marketPosition) => {
  const baseAdvice = {
    "Software Engineer": {
      significantly_underpaid: {
        immediate_actions: [
          {
            title: "Skill Gap Analysis",
            description: "You're likely missing key skills commanding higher salaries.",
            action: "Master these high-value skills: Cloud Architecture, API Design, System Design"
          },
          {
            title: "Portfolio Upgrade",
            description: "Build proof of your capabilities.",
            action: "Create 2-3 projects showcasing advanced technical skills"
          },
          {
            title: "Market Visibility",
            description: "Make your achievements visible to potential employers.",
            action: "Update LinkedIn with quantifiable achievements and start posting technical content"
          }
        ],
        negotiation_tips: [
          "Research and document market rates for your specific skills",
          "Prepare a performance portfolio with concrete impact metrics",
          "Consider competing offers as negotiation leverage"
        ]
      },
      slightly_underpaid: {
        immediate_actions: [
          {
            title: "Value Documentation",
            description: "Prepare evidence of your contributions.",
            action: "Document projects, innovations, and cost savings you've delivered"
          },
          {
            title: "Skill Enhancement",
            description: "Identify and fill small skill gaps.",
            action: "Get certified in one in-demand technology in your stack"
          }
        ],
        negotiation_tips: [
          "Schedule a performance review meeting",
          "Present a clear case for value delivered",
          "Have a specific target salary in mind"
        ]
      },
      competitive: {
        immediate_actions: [
          {
            title: "Growth Positioning",
            description: "Prepare for the next level.",
            action: "Take on leadership responsibilities in current role"
          },
          {
            title: "Expertise Building",
            description: "Develop rare, valuable skills.",
            action: "Specialize in emerging tech like AI/ML or cloud architecture"
          }
        ],
        negotiation_tips: [
          "Focus on future value and growth potential",
          "Discuss path to next role or level",
          "Consider non-salary benefits and perks"
        ]
      }
    },
    // Add more roles similarly...
  };

  return baseAdvice[role]?.[marketPosition] || baseAdvice["Software Engineer"][marketPosition];
};

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6+ years)" }
];

const LOCATIONS = [
  { value: "US", label: "United States", currency: "$" },
  { value: "India", label: "India", currency: "₹" },
  { value: "Europe", label: "Europe", currency: "€" }
];

export default function CareerCompass() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const analyzeSalary = () => {
    const currentSalary = parseFloat(salary);
    const marketSalary = SALARY_DATA[role][location.value][experience];
    const difference = ((currentSalary - marketSalary) / marketSalary) * 100;
    
    let marketPosition;
    if (difference < -15) {
      marketPosition = "significantly_underpaid";
    } else if (difference < -5) {
      marketPosition = "slightly_underpaid";
    } else {
      marketPosition = "competitive";
    }

    const advice = getCareerAdvice(role, experience, marketPosition);

    setAnalysis({
      currentSalary,
      marketSalary,
      difference,
      marketPosition,
      advice,
      currency: LOCATIONS.find(loc => loc.value === location.value).currency
    });

    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
    setStep(2);
  };

  const formatSalary = (amount, currency) => {
    return `${currency}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-bounce">
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </div>
          </div>
        )}
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-12 h-12 text-indigo-600 mr-4" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Am I Underpaid?
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-4">Know your worth, grow your career</p>
        </div>

        {step === 1 && (
          <Card className="mb-8 border-2 border-indigo-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-600" />
                Your Details
              </CardTitle>
              <CardDescription>Lets see how your salary stacks up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <Select onValueChange={setRole}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="What do you do?" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(SALARY_DATA).map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Select onValueChange={setLocation}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Where are you based?" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map(loc => (
                        <SelectItem key={loc.value} value={loc}>{loc.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Experience</label>
                  <Select onValueChange={setExperience}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Years of experience?" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map(level => (
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Current Annual Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Your current salary"
                      className="pl-10 h-12"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg"
                onClick={analyzeSalary}
                disabled={!role || !location || !experience || !salary}
              >
                Analyze My Salary 🚀
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && analysis && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="border-2 border-indigo-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                  Salary Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg border-2 border-indigo-50">
                    <p className="text-sm text-gray-600 mb-1">Your Salary</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatSalary(analysis.currentSalary, analysis.currency)}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-indigo-50">
                    <p className="text-sm text-gray-600 mb-1">Market Rate</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatSalary(analysis.marketSalary, analysis.currency)}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-2 border-indigo-50">
                    <p className="text-sm text-gray-600 mb-1">Difference</p>
                    <p className={`text-2xl font-bold ${analysis.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.difference > 0 ? '+' : ''}{Math.round(analysis.difference)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-4">Immediate Actions</h3>
                    {analysis.advice.immediate_actions.map((action, index) => (
                      <div key={index} className="mb-4 p-4 bg-white rounded-lg border-2 border-indigo-50 hover:border-indigo-200 transition-all">
                        <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                        <p className="text-gray-600 mb-3">{action.description}</p>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Zap className="w-4 h-4" />
                          <span className="font-medium">{action.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-4">Negotiation Strategy</h3>
                    <div className="space-y-3">
                      {analysis.advice.negotiation_tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border-2 border-indigo-50">
                          <Brain className="w-5 h-5 text-purple-600 mt-1" />
                          <p className="text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg"
              onClick={() => setStep(1)}
            >
              Analyze Another Role ✨
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}