import React from 'react';
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({ 
  currentQuestion, 
  totalQuestions 
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8 space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-medium">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
