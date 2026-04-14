import { Calendar, Phone } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LuxFadeIn from '../ui/LuxFadeIn';
import { trackClickBookCall } from '../../utils/analytics';

export default function BookCall() {
  const handleBookCall = () => {
    trackClickBookCall('book_call_section');
    window.open('https://calendly.com/jordanaliwork/30min', '_blank');
  };

  return (
    <Section id="book-call" background="darker">
      <LuxFadeIn>
        <div className="max-w-4xl mx-auto">
          <Card variant="premium" className="p-8 md:p-12 hover:border-[#FFC300]/40 transition-all duration-500">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFC300]/10 border border-[#FFC300]/30 rounded-full">
              <Phone className="w-4 h-4 text-[#FFC300]" />
              <span className="text-sm font-semibold text-[#FFC300]">Need Guidance?</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Want Help Choosing the Best Path?
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Want help choosing the best path? Book a short call with our team.
            </p>

            <div className="bg-gradient-to-br from-[#2B2B2B] to-[#1B1B1B] border-2 border-[#FFC300]/20 rounded-xl p-8 md:p-12">
              <Calendar className="w-16 h-16 text-[#FFC300] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Schedule Your Strategy Call</h3>
              <p className="text-gray-400 mb-6">
                30-minute call to discuss your goals and find the right tier for you
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBookCall}
              >
                Book Your Call Now
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFC300] mb-2">15 Min</div>
                <p className="text-gray-400">Quick Call</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFC300] mb-2">Free</div>
                <p className="text-gray-400">No Cost</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FFC300] mb-2">No Pressure</div>
                <p className="text-gray-400">Direct Guidance</p>
              </div>
            </div>
          </div>
        </Card>
        </div>
      </LuxFadeIn>
    </Section>
  );
}
