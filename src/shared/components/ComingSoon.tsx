import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Construction, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ComingSoonProps = {
  moduleName: string;
  description?: string;
  showBackHome?: boolean;
  className?: string;
};

export function ComingSoon({
  moduleName,
  description,
  showBackHome = true,
  className,
}: ComingSoonProps) {
  return (
    <div className={cn('min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)]', className)}>
      <div className="max-w-3xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full bg-white border border-[#e8e8e8] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-mmt-50 flex items-center justify-center text-mmt-500">
                  <Construction className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center text-mmt-500 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              {moduleName} is coming soon
            </h1>
            <p className="mt-3 text-center text-sm sm:text-base text-gray-600 leading-relaxed">
              {description ||
                `We’re building the ${moduleName} experience as an independent micro-frontend module. It will be shipped soon with the same design system and shared shell.`}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {showBackHome && (
                <Link to="/">
                  <Button className="w-full sm:w-auto font-bold">Back to Home</Button>
                </Link>
              )}
              <Link to="/search/hotels">
                <Button variant="outline" className="w-full sm:w-auto font-bold">
                  Explore Hotels
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-6 sm:px-8 py-5 bg-[#fbfbfb] border-t border-[#efefef] text-center text-xs text-gray-500">
            Tip: This route is ready for Module Federation integration (remote entry → lazy import → route mount).
          </div>
        </div>
      </div>
    </div>
  );
}

