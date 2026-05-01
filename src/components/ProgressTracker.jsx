import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Registration' },
  { id: 2, title: 'Verification' },
  { id: 3, title: 'Polling Day' },
  { id: 4, title: 'Results' }
];

const ProgressTracker = ({ currentStep }) => {
  const completedSteps = Math.min(currentStep, 4);
  const isAllComplete = currentStep >= 4;

  return (
    <nav className="progress-tracker" aria-label="Election Journey Progress">
      <div className="tracker-header">
        <h3 className="tracker-title">Election Journey</h3>
        <span className="tracker-subtitle">Step {completedSteps}/4</span>
      </div>
      <ol className="timeline" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <li key={step.id} className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="timeline-icon-container">
                {isCompleted ? (
                  <CheckCircle2 size={24} className="step-icon completed-icon" />
                ) : (
                  <div className={`step-circle ${isActive ? 'active-circle' : ''}`}>
                    {step.id}
                  </div>
                )}
                {index < steps.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <span className="step-title">{step.title}</span>
              </div>
            </li>
          );
        })}
      </ol>
      {isAllComplete && (
        <div className="completion-message animate-fade-in-up">
          <CheckCircle2 size={18} className="completion-icon" />
          <span>Journey Complete! Ready to vote.</span>
        </div>
      )}
    </nav>
  );
};

export default React.memo(ProgressTracker);
