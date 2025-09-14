import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface ProfileData {
  headline: string;
  summary: string;
  skills: string;
  achievements: string;
}

interface EnhancedProfile {
  headline: string;
  summary: string;
  skills: string;
  score: number;
  feedback: string[];
  keywords: string[];
}

function Results() {
  const [originalData, setOriginalData] = useState<ProfileData | null>(null);
  const [enhancedData, setEnhancedData] = useState<EnhancedProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Get original data from localStorage
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setOriginalData(data);
      
      // Generate mock enhanced data
      const enhanced = generateEnhancedProfile(data);
      
      setTimeout(() => {
        setEnhancedData(enhanced);
        setIsLoading(false);
        
        // Animate score
        let current = 0;
        const target = enhanced.score;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedScore(Math.round(current * 10) / 10);
        }, 30);
      }, 1500);
    }
  }, []);

  const generateEnhancedProfile = (data: ProfileData): EnhancedProfile => {
    // Mock AI enhancement logic
    const enhanceHeadline = (headline: string) => {
      if (headline.toLowerCase().includes('manager')) {
        return `Strategic ${headline} | Driving Growth & Innovation | Results-Oriented Leader`;
      }
      if (headline.toLowerCase().includes('developer')) {
        return `Full-Stack ${headline} | Building Scalable Solutions | Tech Innovation Expert`;
      }
      if (headline.toLowerCase().includes('marketing')) {
        return `Performance-Driven ${headline} | ROI-Focused Campaigns | Digital Growth Strategist`;
      }
      return `${headline} | Industry Expert | Results-Driven Professional`;
    };

    const enhanceSummary = (summary: string) => {
      const enhanced = summary
        .replace(/I work/g, 'I collaborate strategically')
        .replace(/I have/g, 'I bring')
        .replace(/experience/g, 'proven expertise')
        .replace(/years/g, 'years of measurable success');
      
      return `${enhanced}\n\n🎯 Key Achievements:\n• Delivered 25% increase in team productivity\n• Implemented data-driven strategies resulting in 40% improvement in key metrics\n• Led cross-functional initiatives that generated $500K+ in value\n\n💡 What sets me apart: I combine analytical thinking with creative problem-solving to drive sustainable growth and exceed expectations.`;
    };

    const enhanceSkills = (skills: string) => {
      const skillArray = skills.split(',').map(s => s.trim());
      const enhancedSkills = [
        ...skillArray,
        'Strategic Planning',
        'Data Analysis',
        'Cross-functional Leadership',
        'Process Optimization'
      ];
      return enhancedSkills.slice(0, 10).join(', ');
    };

    return {
      headline: enhanceHeadline(data.headline),
      summary: enhanceSummary(data.summary),
      skills: enhanceSkills(data.skills),
      score: 8.7,
      feedback: [
        'Excellent use of action verbs and quantifiable results',
        'Strong keyword optimization for recruiter searches',
        'Professional tone with clear value proposition',
        'Consider adding industry-specific certifications',
        'Great balance of technical and leadership skills'
      ],
      keywords: ['Strategic', 'Results-Driven', 'Innovation', 'Leadership', 'Growth', 'Data-Driven', 'ROI', 'Performance']
    };
  };

  const copyToClipboard = () => {
    if (!enhancedData) return;
    
    const text = `HEADLINE:\n${enhancedData.headline}\n\nSUMMARY:\n${enhancedData.summary}\n\nSKILLS:\n${enhancedData.skills}`;
    navigator.clipboard.writeText(text);
    alert('Enhanced profile copied to clipboard!');
  };

  const downloadText = () => {
    if (!enhancedData) return;
    
    const text = `ENHANCED LINKEDIN PROFILE\n\nHEADLINE:\n${enhancedData.headline}\n\nSUMMARY:\n${enhancedData.summary}\n\nSKILLS:\n${enhancedData.skills}\n\nPROFILE SCORE: ${enhancedData.score}/10`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-linkedin-profile.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading || !originalData || !enhancedData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Enhancing Your Profile</h2>
            <p className="text-gray-600">Our AI is analyzing and optimizing your content...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Enhanced LinkedIn Profile
            </h1>
            <p className="text-lg text-gray-600">
              Here's your optimized profile with AI-powered improvements
            </p>
          </div>

          {/* Profile Score */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Score</h2>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(animatedScore / 10) * 314} 314`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">{animatedScore}</span>
                  <span className="text-lg text-gray-500">/10</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-4">Excellent Profile Quality</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </button>
                <button
                  onClick={downloadText}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download .txt
                </button>
              </div>
            </div>
          </div>

          {/* Before vs After Comparison */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Before */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  B
                </span>
                Before (Original)
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Headline</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{originalData.headline}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Summary</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                    {originalData.summary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{originalData.skills}</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  A
                </span>
                After (Enhanced)
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Headline</h4>
                  <p className="text-gray-900 bg-green-50 p-3 rounded-lg font-medium">{enhancedData.headline}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Summary</h4>
                  <p className="text-gray-900 bg-green-50 p-3 rounded-lg text-sm leading-relaxed whitespace-pre-line">
                    {enhancedData.summary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
                  <p className="text-gray-900 bg-green-50 p-3 rounded-lg">{enhancedData.skills}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback and Keywords */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Recruiter Feedback */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recruiter Feedback</h3>
              <ul className="space-y-3">
                {enhancedData.feedback.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Optimized Keywords</h3>
              <p className="text-gray-600 mb-4">These keywords improve your discoverability:</p>
              <div className="flex flex-wrap gap-2">
                {enhancedData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <Link
              to="/input"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-4"
            >
              Enhance Another Profile
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Results;