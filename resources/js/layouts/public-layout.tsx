import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function PublicLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();

    return (
        <div className="bg-[#032553] text-white font-sans selection:bg-white/20">
            <nav className="container mx-auto px-4 py-6">
                <div className="bg-[#021a3a] border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl">
                    <Link href="/" className="text-xl font-bold tracking-tight">Si-Resto</Link>
                    
                    <div className="hidden md:flex items-center gap-8">
                        <Link 
                            href="/" 
                            className={cn(
                                "text-sm font-bold transition-all hover:text-white",
                                url === '/' ? "text-white underline underline-offset-8 decoration-2 decoration-red-500" : "text-white/40"
                            )}
                        >
                            HOME
                        </Link>
                        <Link 
                            href="/pengajuan" 
                            className={cn(
                                "text-sm font-bold transition-all hover:text-white",
                                url === '/pengajuan' ? "text-white underline underline-offset-8 decoration-2 decoration-red-500" : "text-white/40"
                            )}
                        >
                            PENGAJUAN
                        </Link>
                        <Link 
                            href="/upload" 
                            className={cn(
                                "text-sm font-bold transition-all hover:text-white",
                                url === '/upload' ? "text-white underline underline-offset-8 decoration-2 decoration-red-500" : "text-white/40"
                            )}
                        >
                            UPLOAD DOKUMEN
                        </Link>
                        <Link 
                            href="/tracking" 
                            className={cn(
                                "text-sm font-bold transition-all hover:text-white",
                                url === '/tracking' ? "text-white underline underline-offset-8 decoration-2 decoration-red-500" : "text-white/40"
                            )}
                        >
                            TRACKING
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>

            <footer className="container mx-auto px-4 py-20 text-center text-white/40 text-sm border-t border-white/5 mt-20">
                &copy; {new Date().getFullYear()} Si-Resto - Dinas Perpustakaan dan Kearsipan Kabupaten Bojonegoro. All rights reserved.
            </footer>
        </div>
    );
}
