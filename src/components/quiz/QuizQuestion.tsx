import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuestionOption {
  text: string;
  points: number;
}

interface Question {
  id: number;
  title: string;
  question: string;
  options: QuestionOption[];
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (points: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  return (
    <Card className="p-8 md:p-12 animate-fade-in">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            {question.title}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {question.question}
          </h2>
        </div>
        
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={() => onAnswer(option.points)}
              className="w-full text-left justify-start h-auto py-6 px-6 text-base hover:bg-primary/10 hover:border-primary hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
            >
              <span className="flex-1">{option.text}</span>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
