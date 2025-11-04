import React, { useState } from 'react';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { EmailCapture } from '@/components/quiz/EmailCapture';
import { QuizResults } from '@/components/quiz/QuizResults';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export interface Answer {
  questionId: number;
  points: number;
}

const questions = [
  {
    id: 1,
    title: "Estate Planning Clarity",
    question: "How clear are you on your estate planning wishes?",
    options: [
      { text: "Crystal clear - I know exactly what I want", points: 3 },
      { text: "Pretty clear - I have some ideas, but need to organize them", points: 2 },
      { text: "Honestly unclear - I haven't really thought about it", points: 1 }
    ]
  },
  {
    id: 2,
    title: "Healthcare Decisions",
    question: "Do your loved ones know your healthcare wishes if you can't communicate?",
    options: [
      { text: "Absolutely - They know my wishes inside and out", points: 3 },
      { text: "Somewhat - We've talked about some things", points: 2 },
      { text: "Not really - We haven't had that conversation", points: 1 }
    ]
  },
  {
    id: 3,
    title: "Important Documents",
    question: "How organized are your important documents (will, healthcare directives, etc.)?",
    options: [
      { text: "All set - Documents are complete and stored securely", points: 3 },
      { text: "Partially done - I have some, but not everything", points: 2 },
      { text: "Not started - I need to get this organized", points: 1 }
    ]
  },
  {
    id: 4,
    title: "Family Communication",
    question: "How comfortable do you feel discussing end-of-life topics with your family?",
    options: [
      { text: "Very comfortable - We talk openly about everything", points: 3 },
      { text: "Somewhat comfortable - Depends on the topic", points: 2 },
      { text: "Pretty uncomfortable - We avoid tough conversations", points: 1 }
    ]
  },
  {
    id: 5,
    title: "Financial Information Access",
    question: "Do your loved ones know where to find your financial accounts and passwords?",
    options: [
      { text: "Yes - They know where everything is and how to access it", points: 3 },
      { text: "Partially - They know some things, but not everything", points: 2 },
      { text: "No - This information hasn't been shared", points: 1 }
    ]
  },
  {
    id: 6,
    title: "Final Wishes Documentation",
    question: "Are your final wishes (funeral, burial, memorial) documented?",
    options: [
      { text: "Fully documented - Written, signed, and shared", points: 3 },
      { text: "Partially documented - Some things written, others not", points: 2 },
      { text: "Not documented - Just thoughts in my head", points: 1 }
    ]
  },
  {
    id: 7,
    title: "Stress Level About Planning",
    question: "When you think about end-of-life planning, how do you feel?",
    options: [
      { text: "Calm and confident - I feel prepared", points: 3 },
      { text: "A little worried - I know I should do more", points: 2 },
      { text: "Very stressed - I don't know where to start", points: 1 }
    ]
  },
  {
    id: 8,
    title: "Executor/Agent Designation",
    question: "Have you designated someone to handle your affairs (executor, power of attorney)?",
    options: [
      { text: "All decided - They're aware and have accepted", points: 3 },
      { text: "Somewhat decided - I have ideas but haven't asked them", points: 2 },
      { text: "No idea - I haven't thought about this yet", points: 1 }
    ]
  }
];

const calculateTier = (score: number): number => {
  if (score <= 8) return 1;
  if (score <= 15) return 2;
  return 3;
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, { questionId: currentQuestion + 1, points }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, calculate score
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer.points, 0);
      setScore(totalScore);
      setTier(calculateTier(totalScore));
      setShowEmailCapture(true);
    }
  };

  const handleEmailSubmitted = (email: string) => {
    setUserEmail(email);
    setShowEmailCapture(false);
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowEmailCapture(false);
    setShowResults(false);
    setScore(0);
    setTier(0);
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-4"
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
          
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl animate-fade-in">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <span className="text-5xl">📋</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Discover Your End-of-Lyfe Readiness Level
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Take this quick 8-question quiz to uncover where you stand on your family's planning journey.
              </p>
              
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg text-left">
                <p className="font-semibold text-foreground mb-2">What you'll get:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✅ Your personalized readiness score</li>
                  <li>✅ Specific gaps in your planning</li>
                  <li>✅ FREE Conversation Starter Guide (PDF)</li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ⏱️ Takes less than 3 minutes
              </p>
              
              <Button 
                size="lg" 
                onClick={() => setShowIntro(false)}
                className="text-lg px-8 py-6"
              >
                Start the Quiz →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults 
        score={score} 
        tier={tier} 
        onRetake={handleRetake}
        email={userEmail}
      />
    );
  }

  if (showEmailCapture) {
    return (
      <EmailCapture 
        score={score} 
        tier={tier} 
        onSuccess={handleEmailSubmitted}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-4"
        >
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>
        
        <QuizProgress 
          currentQuestion={currentQuestion + 1} 
          totalQuestions={questions.length}
        />
        
        <QuizQuestion
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
