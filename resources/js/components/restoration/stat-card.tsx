import { cn } from '@/lib/utils';

export function StatCard({ icon: Icon, label, value, colorClass }: { icon: any, label: string, value: string | number, colorClass: string }) {
    return (
        <div className="bg-white rounded-[32px] p-8 flex flex-col justify-between shadow-2xl h-full transition-transform hover:-translate-y-2 text-left">
            <div className="flex justify-between items-start">
                <div>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm", colorClass)}>
                        <Icon className="w-7 h-7" />
                    </div>
                    <p className="text-[#6c757d] text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: label }} />
                </div>
                <h2 className="text-6xl font-black text-[#212529] tracking-tighter leading-none">{value}</h2>
            </div>
        </div>
    );
}
