import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { 
    LayoutGrid, 
    FileEdit, 
    LogOut, 
    User as UserIcon,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children, breadcrumbs }: { children: ReactNode, breadcrumbs?: any[] }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-[#032553] text-white font-sans selection:bg-white/20">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* SIDEBAR */}
            <aside className="fixed top-0 left-0 w-64 h-full bg-[#021a3a] border-r border-white/10 z-50 py-10 flex flex-col">
                <div className="px-8 mb-12">
                    <h3 className="text-2xl font-black tracking-tight mb-0 text-white">ADMIN</h3>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Dashboard Si-Resto</p>
                </div>

                <nav className="flex-1 space-y-1 px-4">
                    <Link 
                        href="/dashboard" 
                        className={cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group",
                            url === '/dashboard' ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <LayoutGrid className={cn("w-5 h-5 transition-transform group-hover:scale-110", url === '/dashboard' ? "text-white" : "text-white/30")} />
                        Dashboard
                    </Link>
                    <Link 
                        href="/admin/restorations" 
                        className={cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group",
                            url.startsWith('/admin/restorations') ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <FileEdit className={cn("w-5 h-5 transition-transform group-hover:scale-110", url.startsWith('/admin/restorations') ? "text-white" : "text-white/30")} />
                        Update Pengajuan
                    </Link>
                </nav>

                <div className="px-4 border-t border-white/5 pt-8">
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-400 hover:bg-red-400/10 transition-all group text-left"
                    >
                        <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="ml-64 p-10 min-h-screen relative z-10">
                {/* Header / Breadcrumbs */}
                {breadcrumbs && (
                    <div className="flex items-center gap-2 mb-8 text-white/40 text-[10px] font-black tracking-widest uppercase">
                        {breadcrumbs.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <Link href={item.href} className="hover:text-white transition-colors">{item.title}</Link>
                                {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
                            </div>
                        ))}
                    </div>
                )}
                
                {children}
            </main>
        </div>
    );
}
