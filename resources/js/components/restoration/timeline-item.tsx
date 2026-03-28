import { cn } from '@/lib/utils';

export function TimelineItem({ label, done }: { label: string, done: boolean }) {
    return (
        <li className={cn(
            "relative pl-10 mb-8 border-l-2 border-dotted transition-all text-xl font-bold text-left",
            done ? "text-white border-white border-solid" : "text-white/20 border-white/20"
        )}>
            <div className={cn(
                "absolute -left-[11px] top-1.5 w-5 h-5 rounded-full outline-offset-4 outline-2 transition-all",
                done ? "bg-white outline-white/20 shadow-[0_0_20px_rgba(255,255,255,0.5)]" : "bg-white/20 outline-transparent"
            )} />
            {label}
        </li>
    );
}
