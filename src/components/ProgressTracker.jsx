import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Registration' },
  { id: 2, title: 'Verification' },
  { id: 3, title: 'Polling Day' },
  { id: 4, title: 'Results' }
];

const ProgressTracker = ({ currentStep }) => {
  return (
    <div className="progress-tracker">
      <h3 className="tracker-title">Election Journey</h3>
      <div className="timeline">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <div key={step.id} className={`timeline-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
