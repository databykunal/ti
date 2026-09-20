import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
  isOpen: boolean;
}

const steps = [
  {
    title: "Welcome to TidyDrive",
    description: "Understand your storage. Clean it safely. Keep it under control.",
    icon: "📊"
  },
  {
    title: "100% Private & Safe",
    description: "All your files stay on your computer. We never upload anything to the cloud.",
    icon: "🔒"
  },
  {
    title: "Analyze Your Storage",
    description: "See exactly what's taking up space with detailed breakdowns and visualizations.",
    icon: "🔍"
  },
  {
    title: "Find Duplicates",
    description: "Detect and safely remove duplicate files to free up space.",
    icon: "🎯"
  },
  {
    title: "Smart Cleanup",
    description: "Get recommendations for safe cleanup with detailed previews.",
    icon: "✨"
  },
  {
    title: "You're Ready!",
    description: "Start scanning from Dashboard. You're in complete control.",
    icon: "🚀"
  }
];

export function OnboardingTour({ onComplete, isOpen }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleClose = () => {
    localStorage.setItem('tidydrive-onboarding-completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="text-6xl mb-4 text-center">{step.icon}</div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-2">{step.title}</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">{step.description}</p>

        {/* Progress */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mb-6 overflow-hidden">
          <div
            className="bg-primary-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              Back
            </button>
          )}
          
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleClose();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 text-sm"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
