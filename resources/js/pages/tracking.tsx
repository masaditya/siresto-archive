import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Search,
    Loader2,
    CheckCircle2,
    Clock,
    FileImage,
    Download,
    FileArchive,
    FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { TimelineItem } from '@/components/restoration/timeline-item';

export default function Tracking() {
    const [trackingResult, setTrackingResult] = useState<any>(null);
    const [searchResi, setSearchResi] = useState('');
    const [searching, setSearching] = useState(false);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);
        setTrackingResult(null); // Clear previous
        try {
            const response = await fetch(route('api.tracking.details', { resi: searchResi }));
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (data) {
                setTrackingResult(data);
            } else {
                alert('Nomor Resi tidak ditemukan. Pastikan data yang Anda masukkan benar.');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat mencari data. Silakan coba lagi.');
        } finally {
            setSearching(false);
        }
    };


    return (
        <PublicLayout>
            <Head title="Tracking Restorasi - Si-Resto" />

            <div className="container mx-auto px-4 mt-12">
                <section className="max-w-5xl mx-auto space-y-16 py-12">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold">Lacak Progres Restorasi</h2>
                            <p className="text-white/40">Gunakan Nomor Resi (10 Karakter) untuk melihat sejauh mana pengerjaan arsip Anda.</p>
                        </div>
                        <form onSubmit={handleTrack} className="flex gap-4 p-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl focus-within:border-white/30 transition-all text-left">
                            <div className="flex items-center pl-6 text-white/40">
                                <Search className="w-6 h-6" />
                            </div>
                            <Input 
                                className="bg-transparent border-none h-14 text-xl tracking-[0.2em] font-bold placeholder:text-white/10 focus-visible:ring-0" 
                                placeholder="RESTCXXXXX" 
                                required
                                maxLength={10}
                                value={searchResi}
                                onChange={e => setSearchResi(e.target.value.toUpperCase())}
                            />
                            <Button 
                                type="submit" 
                                className="h-14 px-10 rounded-full bg-white text-[#032553] font-bold text-lg hover:bg-white/90"
                                disabled={searching}
                            >
                                {searching ? <Loader2 className="animate-spin" /> : "CARI"}
                            </Button>
                        </form>
                    </div>


                    {trackingResult ? (
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl space-y-16 animate-in zoom-in-95 fade-in duration-500 text-left">
                            <div className="text-center space-y-2">
                                <p className="text-white/40 font-medium italic">Status Terkini Dokumen</p>
                                <h3 className="text-4xl lg:text-5xl font-black">RESI: {trackingResult.resi_number}</h3>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-bold text-white">{trackingResult.name}</p>
                                    <p className="text-sm font-medium text-white/60 lowercase italic tracking-widest">{trackingResult.person_name}</p>
                                </div>
                                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full border border-white/10 mt-4 mb-4">
                                    <div className={cn("w-2 h-2 rounded-full animate-pulse", trackingResult.status === 'Selesai' ? "bg-green-500" : "bg-blue-500")} />
                                    <span className="text-sm font-bold tracking-widest uppercase">{trackingResult.status}</span>
                                </div>

                                {trackingResult.result_file_path && (
                                    <div className="max-w-3xl mx-auto mt-12 mb-16 p-10 bg-green-500/10 border-2 border-green-500/20 rounded-[48px] space-y-8 animate-in zoom-in-95 duration-1000">
                                        <div className="space-y-3">
                                            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto text-[#032553] shadow-[0_20px_40px_rgba(34,197,94,0.3)]">
                                                <FileCheck size={40} />
                                            </div>
                                            <h4 className="text-3xl font-black tracking-tight text-white uppercase italic">Restorasi Selesai!</h4>
                                            <p className="text-white/60 max-w-sm mx-auto leading-relaxed">Arsip Anda telah berhasil direstorasi dan didigitalkan secara profesional oleh tim kami.</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Button asChild size="lg" className="h-20 px-8 rounded-full bg-green-500 text-[#032553] font-black text-xs tracking-widest uppercase shadow-2xl hover:bg-green-400 transition-all hover:-translate-y-1">
                                                <a href={`/storage/${trackingResult.result_file_path}`} download target="_blank">
                                                    <FileArchive className="mr-3 w-5 h-5" /> UNDUH HASIL RESTORASI (FILE BESAR)
                                                </a>
                                            </Button>
                                            
                                            {trackingResult.ba_final_path && (
                                                <Button asChild size="lg" variant="outline" className="h-20 px-8 rounded-full border-green-500/30 text-green-400 font-black text-xs tracking-widest uppercase hover:bg-green-500/10 transition-all">
                                                    <a href={`/storage/${trackingResult.ba_final_path}`} target="_blank">
                                                        <Download className="mr-3 w-5 h-5" /> BERITA ACARA FINAL (PDF)
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-green-500/50 font-bold tracking-[0.2em] uppercase italic">PENTING: File arsip hasil restorasi berukuran besar, pastikan koneksi internet stabil.</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4 py-8">
                                <ul className="space-y-0 p-0 list-none">
                                    <TimelineItem label="Pengajuan dan upload dokumen" done={true} />
                                    <TimelineItem label="Verifikasi dan penyerahan arsip" done={['Verifikasi dan penyerahan arsip', 'Pemisahan lembar arsip', 'Perapian lembar arsip', 'Alih media', 'Penyatuan kembali arsip', 'Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Pemisahan lembar arsip" done={['Pemisahan lembar arsip', 'Perapian lembar arsip', 'Alih media', 'Penyatuan kembali arsip', 'Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Perapian lembar arsip" done={['Perapian lembar arsip', 'Alih media', 'Penyatuan kembali arsip', 'Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Alih media" done={['Alih media', 'Penyatuan kembali arsip', 'Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                </ul>
                                <ul className="space-y-0 p-0 list-none">
                                    <TimelineItem label="Penyatuan kembali arsip" done={['Penyatuan kembali arsip', 'Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Duplikasi" done={['Duplikasi', 'Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Penjilidan arsip" done={['Penjilidan arsip', 'Selesai dan serah terima kembali arsip'].includes(trackingResult.current_stage)} />
                                    <TimelineItem label="Selesai & Serah Terima" done={trackingResult.current_stage === 'Selesai dan serah terima kembali arsip'} />
                                </ul>
                            </div>

                            <div className="space-y-8 flex flex-col items-center">
                                {trackingResult.progress && trackingResult.progress.length > 0 && (
                                    <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex items-center gap-6 animate-in slide-in-from-bottom-4 duration-700">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                                            {trackingResult.progress[trackingResult.progress.length - 1].photos?.[0] ? (
                                                <img 
                                                    src={`/storage/${trackingResult.progress[trackingResult.progress.length - 1].photos[0].file_path}`} 
                                                    className="w-full h-full object-cover"
                                                    alt="Preview"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                                    <FileImage size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-left space-y-1">
                                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Update Terakhir</p>
                                            <h4 className="text-xl font-bold line-clamp-1">{trackingResult.progress[trackingResult.progress.length - 1].stage}</h4>
                                            <p className="text-sm text-white/40 font-medium">
                                                {new Date(trackingResult.progress[trackingResult.progress.length - 1].completed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button 
                                            size="lg" 
                                            className="rounded-full px-12 py-8 bg-white text-[#032553] font-bold shadow-xl hover:-translate-y-1 transition-all"
                                        >
                                            <FileImage className="mr-3" />
                                            LIHAT RIWAYAT PEKERJAAN LENGKAP
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-50 text-slate-900 rounded-[32px] border-none p-8">
                                        <DialogHeader>
                                            <DialogTitle className="text-3xl font-black">Detail Bukti Pekerjaan: <span className="text-blue-600">{trackingResult.resi_number}</span></DialogTitle>
                                            <DialogDescription className="text-slate-500 font-medium">History pengerjaan restorasi setiap tahapan secara berkala.</DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="mt-8 space-y-6">
                                            {trackingResult.progress && trackingResult.progress.length > 0 ? (
                                                trackingResult.progress.map((prog: any, idx: number) => (
                                                    <div key={idx} className="bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className="space-y-1">
                                                                <h6 className="text-xl font-bold flex items-center gap-2 text-green-600">
                                                                    <CheckCircle2 className="w-5 h-5" />
                                                                    {idx + 1}. {prog.stage}
                                                                </h6>
                                                                <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                                                                    <Clock className="w-4 h-4" /> 
                                                                    Diperbarui: {new Date(prog.completed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 uppercase">Selesai</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                                            <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                                                                {prog.photos && prog.photos.map((photo: any, pIdx: number) => (
                                                                    <img 
                                                                        key={pIdx}
                                                                        src={`/storage/${photo.file_path}`} 
                                                                        className="rounded-2xl aspect-square object-cover shadow-sm w-full" 
                                                                        alt="Bukti Progress" 
                                                                    />
                                                                ))}
                                                            </div>
                                                            <div className="lg:col-span-8 space-y-3">
                                                                <p className="text-sm font-bold text-slate-400 tracking-wide uppercase">Catatan Restorator:</p>
                                                                <p className="text-slate-600 font-medium leading-[1.8] bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                                    {prog.notes || "Tidak ada catatan khusus untuk tahapan ini."}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-20 px-8 bg-blue-50/50 rounded-[40px] border-2 border-dashed border-blue-100">
                                                    <Loader2 className="w-12 h-12 text-blue-300 animate-spin mx-auto mb-6" />
                                                    <h4 className="text-xl font-bold text-blue-900 italic">Pengerjaan sedang dalam antrian</h4>
                                                    <p className="text-blue-500/80 mt-2 max-w-sm mx-auto">Tim restorasi kami baru akan memposting bukti digital setelah dokumen fisik Anda melewati tahap verifikasi dan pengerjaan awal.</p>
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4">
                            <div className="max-w-md mx-auto space-y-6 opacity-30">
                                <Clock className="w-20 h-20 mx-auto text-white/50" />
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold">Menunggu Input Resi</h4>
                                    <p>Silakan masukkan kode resi pengajuan Anda pada kolom di atas untuk melihat status pengerjaan.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </PublicLayout>
    );
}
