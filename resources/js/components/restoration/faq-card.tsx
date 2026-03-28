import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function FAQCard({ children, title, highlight = false, className = "" }: { children: ReactNode, title: string, highlight?: boolean, className?: string }) {
    if (highlight) {
        return (
            <div className={`bg-white text-[#032553] rounded-[32px] p-10 h-full flex flex-col shadow-2xl text-left ${className}`}>
                <ArrowUpRight className="text-[#dc3545] w-10 h-10 mb-6 shrink-0" />
                <h4 className="text-2xl font-bold mb-6">{title}</h4>
                <div className="text-secondary leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        );
    }
    return (
        <div className={`bg-black/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8 h-full flex flex-col hover:border-white/20 transition-all text-left ${className}`}>
            <ArrowUpRight className="text-white/30 w-8 h-8 mb-4 shrink-0" />
            <h5 className="text-xl font-bold mb-4">{title}</h5>
            <div className="text-white/60 leading-relaxed text-sm">
                {children}
            </div>
        </div>
    );
}
