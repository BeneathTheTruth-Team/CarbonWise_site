import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-emerald-600 text-white'
                  : index === currentStep
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span
              className={`mt-2 text-xs whitespace-nowrap ${
                index <= currentStep ? 'text-emerald-600 font-medium' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-0.5 mx-2 -mt-6 transition-all duration-500 ${
                index < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
