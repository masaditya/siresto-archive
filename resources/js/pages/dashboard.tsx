import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Users, 
    Wrench, 
    CheckCircle2, 
    FileCheck,
    ChevronRight,
    BookOpen,
    Clock,
    MoreVertical,
    BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
];

function StatCardAdmin({ icon: Icon, label, value, colorClass }: { icon: any, label: string, value: number, colorClass: string }) {
    return (
        <div className="bg-white rounded-[32px] p-8 flex flex-col justify-between shadow-2xl h-full transition-all hover:-translate-y-2 group">
            <div className="flex justify-between items-start">
                <div>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:rotate-12", colorClass)}>
                        <Icon className="w-7 h-7" />
                    </div>
                    <p className="text-[#6c757d] text-sm font-semibold leading-tight uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: label }} />
                </div>
                <h2 className="text-6xl font-black text-[#212529] tracking-tighter leading-none">{value}</h2>
            </div>
        </div>
    );
}

export default function Dashboard({ stats, recentRequests, chartData }: { stats: any, recentRequests: any[], chartData: any[] }) {
    // Transform chart data for display
    const monthlyStats = Array(12).fill(0);
    chartData?.forEach(item => {
        const monthIdx = parseInt(item.month) - 1;
        if (monthIdx >= 0 && monthIdx < 12) {
            monthlyStats[monthIdx] = item.count;
        }
    });

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Pelayanan - Si-Resto" />
            
            <div className="space-y-12">
                <div className="flex justify-between items-end">
                    <h2 className="text-5xl font-black tracking-tight">Dashboard Pelayanan Si-Resto</h2>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCardAdmin 
                        icon={Users} 
                        label="Pemohon dalam<br/>Antrian" 
                        value={stats.waiting} 
                        colorClass="bg-[#ffe8d6] text-[#f08a5d]"
                    />
                    <StatCardAdmin 
                        icon={Wrench} 
                        label="Pemohon Sedang<br/>Dikerjakan" 
                        value={stats.in_progress} 
                        colorClass="bg-[#eaddff] text-[#7e57c2]"
                    />
                    <StatCardAdmin 
                        icon={FileCheck} 
                        label="Total Permohonan<br/>Diajukan" 
                        value={stats.total} 
                        colorClass="bg-[#d1f2eb] text-[#2ecc71]"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Charts Section */}
                    <div className="lg:col-span-8 bg-black/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8 space-y-8">
                        <div className="flex justify-between items-center">
                            <h5 className="text-xl font-bold font-sans">Total Pengajuan Permohonan Tiap Bulan</h5>
                            <MoreVertical className="text-white/30" />
                        </div>
                        <div className="h-[300px] flex items-end gap-3 px-4">
                            {monthlyStats.map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div 
                                        className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-lg transition-all hover:brightness-125 relative group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                                        style={{ height: `${Math.max((h / (Math.max(...monthlyStats, 10)) * 100), 5)}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#032553] text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {h} Dokumen
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-white/40 uppercase">{'JFMAMJJASOND'[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-black/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8 text-center space-y-8 flex flex-col justify-center">
                        <h5 className="text-xl font-bold">Status Antrian Pemohon<br />Saat Ini</h5>
                        <div className="relative w-48 h-48 mx-auto">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="15" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - (stats.in_progress/stats.total || 0))} strokeLinecap="round" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - (stats.waiting/stats.total || 0.3))} strokeLinecap="round" style={{ transform: `rotate(${360 * (stats.in_progress/stats.total || 0)}deg)`, transformOrigin: 'center' }} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black">{stats.total}</span>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Total
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Antrean
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Dikerjakan
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="lg:col-span-12 bg-black/10 border border-white/10 backdrop-blur-md rounded-[32px] overflow-hidden">
                        <div className="p-8 pb-4">
                            <h5 className="text-xl font-bold">Daftar Pengajuan Terbaru</h5>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Jenis Arsip</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Nomor Resi</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Pemohon</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Tanggal</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Status Pekerjaan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentRequests.map((req) => (
                                        <tr key={req.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-6 flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                    <BookOpen className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <span className="font-bold">{req.archive_type}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-mono font-black text-blue-400 tracking-wider uppercase">{req.resi_number}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{req.name}</span>
                                                    <span className="text-[10px] font-bold text-white/30 tracking-tight">{req.whatsapp}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-semibold text-white/50">
                                                {new Date(req.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-8 py-6">
                                                <Badge className={cn(
                                                    "rounded-full px-5 py-1.5 font-black uppercase tracking-widest text-[10px]",
                                                    req.status === 'Selesai' ? "bg-green-500 text-white" : 
                                                    req.status === 'Dikerjakan' ? "bg-blue-600 text-white" : "bg-white text-[#032553]"
                                                )}>
                                                    {req.status === 'Pending' ? 'Antri' : req.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentRequests.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-white/20 italic font-bold">Belum ada pengajuan masuk.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
