// CareerCompass.jsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  IndianRupee, 
  Target, 
  Eye, 
  EyeOff,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { SALARY_DATA, EXPERIENCE_LEVELS, LOCATIONS, getCareerAdvice } from './data';

function CareerCompass() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    location: "",
    experience: "",
    salary: "",
    name: "",
    company: ""
  });
  const [step, setStep] = useState(1);
  const [analysis, setAnalysis] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatSalary = (amount) => {
    if (!isInitialized) return "";
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 1,
        notation: 'compact'
      }).format(amount);
    } catch (error) {
      return amount.toString();
    }
  };

  const analyzeSalary = () => {
    const { role, location, experience, salary, name, company } = formData;
    
    if (!role || !location || !experience || !salary || (!isAnonymous && (!name || !company))) {
      return;
    }

    const currentSalary = parseFloat(salary);
    const marketSalary = SALARY_DATA[role]?.[location]?.[experience];

    if (!marketSalary) {
      console.error("Market salary data not found");
      return;
    }

    const difference = ((currentSalary - marketSalary) / marketSalary) * 100;
    
    const marketPosition = difference < -20 ? "extremely_underpaid" :
                          difference < -10 ? "significantly_underpaid" :
                          difference < -5 ? "slightly_underpaid" :
                          difference <= 10 ? "competitive" : "above_market";

    const advice = getCareerAdvice(role, experience, marketPosition);

    setAnalysis({
      currentSalary,
      marketSalary,
      difference,
      marketPosition,
      advice,
      name: isAnonymous ? null : name,
      company: isAnonymous ? null : company
    });

    setShowCelebration(true);
    const timeout = setTimeout(() => setShowCelebration(false), 2000);
    setStep(2);

    return () => clearTimeout(timeout);
  };

  const resetForm = () => {
    setFormData({
      role: "",
      location: "",
      experience: "",
      salary: "",
      name: "",
      company: ""
    });
    setAnalysis(null);
    setStep(1);
  };

  if (!isInitialized) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  const isFormValid = formData.role && formData.location && 
                     formData.experience && formData.salary && 
                     (isAnonymous || (formData.name && formData.company));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-4">
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-bounce">
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </div>
          </div>
        )}
        
        <div className="mb-8 flex flex-col items-center justify-center p-6 ">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-16 h-16 text-blue-800" />
              <h1 className="text-6xl font-bold text-blue-800 text-gray-900">Am I Underpaid?</h1>
            </div>
            <p className="text-base text-4xl text-gray-600 mt-2 text-center">
              Enterprise Compensation Intelligence Platform
            </p>
          </div>


        {step === 1 ? (
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-600" />
                Your Details
              </CardTitle>
              <CardDescription>Fill in your details to see how your salary compares</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                  id="anonymous-mode"
                />
                <Label htmlFor="anonymous-mode" className="flex items-center gap-2">
                  {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isAnonymous ? "Anonymous Mode" : "Public Mode"}
                </Label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(SALARY_DATA).map(roleOption => (
                        <SelectItem key={roleOption} value={roleOption}>
                          {roleOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location</Label>
                  <Select 
                    value={formData.location} 
                    onValueChange={(value) => handleInputChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map(loc => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Experience</Label>
                  <Select 
                    value={formData.experience} 
                    onValueChange={(value) => handleInputChange('experience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salary">Annual Salary (INR)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter salary"
                      className="pl-10"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={analyzeSalary}
                disabled={!isFormValid}
              >
                Analyze My Salary
              </Button>
            </CardContent>
          </Card>
        ) : (
          analysis && (
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="w-6 h-6 text-indigo-600" />
                    Salary Analysis
                    {!isAnonymous && (
                      <span className="text-sm font-normal text-gray-600">
                        for {analysis.name} at {analysis.company}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Salary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatSalary(analysis.currentSalary)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Market Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-indigo-600">
                          {formatSalary(analysis.marketSalary)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Difference</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-2xl font-bold ${analysis.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.difference > 0 ? '+' : ''}{Math.round(analysis.difference)}%
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {analysis.advice && (
                    <>
                      <div className="mb-8">
                        <div className={`text-xl font-semibold flex items-center gap-2 ${analysis.advice.color}`}>
                          <span>{analysis.advice.icon}</span>
                          <span>{analysis.advice.status}</span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">General Recommendations</h3>
                        <ul className="space-y-3">
                          {analysis.advice.generalAdvice.map((advice, index) => (
                            <li key={index} className="flex gap-2">
                              <span>•</span>
                              <span>{advice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Technical Development</h3>
                          <ul className="space-y-3">
                            {analysis.advice.roleSpecific.technical.map((advice, index) => (
                              <li key={index} className="flex gap-2">
                                <span>•</span>
                                <span>{advice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Career Growth</h3>
                          <ul className="space-y-3">
                            {analysis.advice.roleSpecific.career.map((advice, index) => (
                              <li key={index} className="flex gap-2">
                                <span>•</span>
                                <span>{advice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={resetForm}
                    className="w-full mt-6"
                    variant="outline"
                  >
                    Start New Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CareerCompass;