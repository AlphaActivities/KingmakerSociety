import { ClipboardList } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import LuxFadeIn from '../ui/LuxFadeIn';

export default function Questionnaire() {
  const categories = [
    {
      title: 'Goals & Vision',
      questions: [
        'What is your main goal for the next 90 days?',
        'What would your life look like 12 months from now if you stayed consistent?',
        'Do you want to build your own business or income path one day? (Yes, No, Unsure)',
        'Which area do you want the most improvement in? (Fitness, Faith, Health, Goals, Business)',
      ],
    },
    {
      title: 'Current Actions & Reality Check',
      questions: [
        'What have you already tried to reach your goals?',
        'What keeps stopping you from being consistent?',
        'Rate your current discipline from 1 to 10',
        'How many days per week are you currently training? (0-7)',
        'How many days per week are you currently reading scripture or praying? (0-7)',
      ],
    },
    {
      title: 'Belief Breaking',
      questions: [
        'Have you been trying to do this alone? (Yes or No)',
        'Do you believe a structured brotherhood and accountability would accelerate your results? (Yes or No)',
        'What is the cost of staying where you are for another year?',
      ],
    },
    {
      title: 'Sales-Leading Qualifiers',
      questions: [
        'How serious are you about changing your life right now? (1-10)',
        'If accepted, are you willing to invest in mentorship and accountability to accelerate results? (Yes, No, Depends)',
        'Which path are you most interested in? (Brotherhood community only / Guided growth with small group mentorship / VIP mentorship with 1-on-1 support)',
      ],
    },
  ];

  return (
    <Section id="questionnaire" background="gradient">
      <LuxFadeIn>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full mb-6">
            <ClipboardList className="w-4 h-4 text-[#FFC300]" />
            <span className="text-sm font-semibold text-[#FFC300]">Step 2: Application</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Are You Ready?
          </h2>
          <p className="text-xl text-gray-300">
            Answer these questions honestly. They will help us understand if Kingmaker Society is the right fit for you.
          </p>
        </div>
      </LuxFadeIn>

      <div className="space-y-8">
        {categories.map((category, index) => (
          <LuxFadeIn key={index} delay={index * 0.1}>
            <Card variant="premium" className="p-8">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-6">{category.title}</h3>
            <div className="space-y-4">
              {category.questions.map((question, qIndex) => (
                <div key={qIndex} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#D11F2A] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {qIndex + 1}
                  </span>
                  <p className="text-gray-300 text-lg">{question}</p>
                </div>
              ))}
            </div>
          </Card>
          </LuxFadeIn>
        ))}
      </div>

      <LuxFadeIn delay={0.5}>
        <Card variant="gold" className="p-8 text-center mt-12">
        <p className="text-xl text-white mb-4">
          These questions will be asked during your application process.
        </p>
        <p className="text-gray-300">
          Take some time to think about your answers. We only accept men who are serious about transformation.
        </p>
      </Card>
      </LuxFadeIn>
    </Section>
  );
}
