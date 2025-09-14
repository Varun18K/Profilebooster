import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  headline: string;
  summary: string;
  skills: string;
  achievements: string;
}

const ProfileInput: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileData>({
    headline: '',
    summary: '',
    skills: '',
    achievements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW STATES
  const [resumeFileName, setResumeFileName] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing delay
    setTimeout(() => {
      // Store form data + resume file name in localStorage
      localStorage.setItem(
        'profileData',
        JSON.stringify({ ...formData, resumeFileName })
      );

      navigate('/results');
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Enhance Your LinkedIn Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Headline Field */}
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
              Headline
              <span className="ml-2 text-xs text-gray-500 cursor-help" title="This appears below your name on LinkedIn">
                ℹ️
              </span>
            </label>
            <input
              id="headline"
              type="text"
              required
              value={formData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              placeholder="Ex: Software Engineer | Full Stack Developer | AI Enthusiast"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              💡 Tip: Use keywords that highlight your role, expertise, and career goals
            </p>
          </div>

          {/* Summary Field */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Summary
              <span className="ml-2 text-xs text-gray-500 cursor-help" title="A short bio describing your career journey and achievements">
                ℹ️
              </span>
            </label>
            <textarea
              id="summary"
              required
              rows={6}
              maxLength={2000}
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Write about your career journey, expertise, and achievements..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.summary.length}/2000 characters
            </p>
            <p className="mt-1 text-xs text-gray-500">
              💡 Tip: Describe your experience, achievements, and what makes you unique
            </p>
          </div>

          {/* Skills Field */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
              Skills
              <span className="ml-2 text-xs text-gray-500 cursor-help" title="Separate skills with commas">
                ℹ️
              </span>
            </label>
            <input
              id="skills"
              type="text"
              required
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="Ex: React, Node.js, SQL, Problem Solving"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              💡 Tip: Include both technical and soft skills relevant to your career
            </p>
          </div>

          {/* Achievements Field */}
          <div>
            <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
              Achievements
              <span className="ml-2 text-xs text-gray-500 cursor-help" title="Highlight awards, certifications, or recognitions">
                ℹ️
              </span>
            </label>
            <textarea
              id="achievements"
              rows={4}
              value={formData.achievements}
              onChange={(e) => handleInputChange('achievements', e.target.value)}
              placeholder="List your awards, recognitions, certifications..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              💡 Tip: Mention measurable achievements (e.g., 'Improved system performance by 40%')
            </p>
          </div>

          {/* Resume Upload */}
          <div className="mt-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (Optional)
              <span className="ml-2 text-xs text-gray-500 cursor-help" title="Upload your resume (mock only)">
                ℹ️
              </span>
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setResumeFileName(file.name);
                  setToast('Resume uploaded successfully (mock)');
                  setTimeout(() => setToast(null), 2500);
                }
              }}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
            />
            {resumeFileName && (
              <p className="mt-2 text-sm text-green-600">Selected: {resumeFileName}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              ⚠️ File upload is simulated — it won’t be sent to a server.
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Enhancing...
                </>
              ) : (
                'Enhance Profile'
              )}
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileInput;
