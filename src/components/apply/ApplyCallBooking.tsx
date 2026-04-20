import { Calendar, CheckCircle, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { trackClickBookCall } from '../../utils/analytics';

export default function ApplyCallBooking() {
  const navigate = useNavigate();

  const handleBookCall = () => {
    trackClickBookCall('apply_call_booking');
    window.open('https://calendly.com/jordanaliwork/30min', '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="relative inline-flex">
          <div className="absolute inset-0 bg-[#FFC300]/15 rounded-full blur-xl scale-150" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FFC300]/20 to-[#D4A000]/10 border border-[#FFC300]/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-9 h-9 text-[#FFC300]" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mt-4">
          Application Complete
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
          Your application has been received. The final step is to book a short call with our team so we can review your goals and confirm your path.
        </p>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-2xl p-8 text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <Calendar className="w-7 h-7 text-[#FFC300]" />
          <h2 className="text-xl font-bold text-white">Request Your Evaluation Call</h2>
        </div>

        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          A short call to review your application, assess your current level, and determine if you're a fit for the brotherhood.
        </p>

        <div className="grid grid-cols-3 gap-4 py-2">
          <div className="text-center">
            <div className="text-xl font-bold text-[#FFC300]">30 Min</div>
            <p className="text-gray-500 text-xs mt-1">Duration</p>
          </div>
          <div className="text-center border-x border-white/8">
            <div className="text-xl font-bold text-[#FFC300]">Free</div>
            <p className="text-gray-500 text-xs mt-1">No Cost</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#FFC300]">Direct</div>
            <p className="text-gray-500 text-xs mt-1">Access</p>
          </div>
        </div>

        <Button variant="secondary" size="lg" className="w-full sm:w-auto sm:px-12" onClick={handleBookCall}>
          <span className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Request Your Evaluation</span>
          </span>
        </Button>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-white/2 border border-white/6 rounded-xl">
        <Shield className="w-4 h-4 text-[#FFC300]/60 shrink-0 mt-0.5" />
        <p className="text-[12px] text-gray-500 leading-relaxed">
          Your application has been saved. If you need to close this page and come back, your session will be preserved automatically.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Return to Main Site
        </button>
      </div>
    </div>
  );
}
