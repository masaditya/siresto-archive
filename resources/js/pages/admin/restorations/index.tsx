import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    ChevronRight,
    Search,
    BookOpen,
    Clock,
    PlusCircle,
    FileImage,
    MessageSquare,
    CheckCircle2,
    Loader2,
    CloudUpload,
    Info,
    Calendar,
    ArrowUpCircle,
    Eye,
    FileText,
    Image as ImageIcon,
    AlertTriangle,
    FileArchive,
    FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Update Pengajuan', href: '/admin/restorations' },
];

export default function RestorationIndex({ requests }: { requests: any[] }) {
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [showDocs, setShowDocs] = useState(false);

    const isDocumentsComplete = (req: any) => {
        const types = req.documents.map((d: any) => d.document_type);
        return types.includes('Surat Permohonan') &&
            types.includes('Berita Acara') &&
            types.includes('Foto Kondisi');
    };

    const { data, setData, post, processing, reset, errors, progress } = useForm({
        stage: '',
        notes: '',
        photos: [] as File[],
        result_file: null as File | null,
        ba_final_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedRequest?.id) return;

        post(route('admin.restorations.update-progress', { restorationRequest: selectedRequest.id }), {
            onSuccess: () => {
                setOpen(false);
                reset();
                alert('Berhasil memperbarui progres!');
            },
            onError: (errors) => {
                console.error(errors);
                // Optionally show a more specific error alert
                if (errors.error) alert(errors.error);
            }
        });
    };


    return (
        <AdminLayout>
            <Head title="Manajemen Restorasi - Si-Resto" />

            <div className="p-8 space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black">Manajemen Restorasi</h1>
                        <p className="text-slate-500 font-medium">Monitoring dan update progres restorasi berkas masyarakat.</p>
                    </div>
                </div>

                {(errors as any).error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl font-bold">
                        {(errors as any).error}
                    </div>
                )}


                <div className="bg-black/10 border border-white/10 backdrop-blur-md rounded-[40px] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-white/40">Resi & Pemohon</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-white/40">Grup Arsip</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Dokumen</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-white/40">Status Terkini</th>
                                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-white/5 transition-all group">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono font-black text-blue-400 text-lg tracking-wider mb-1 uppercase">{req.resi_number}</span>
                                                <span className="font-bold text-base text-white">{req.name}</span>
                                                <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{req.whatsapp}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                                                <BookOpen className="w-4 h-4 text-purple-400" />
                                                <span className="font-bold text-sm">{req.archive_type}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            {isDocumentsComplete(req) ? (
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-full font-black text-[10px] uppercase">Lengkap</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-red-500/30 text-red-400 rounded-full font-black text-[10px] uppercase">Belum Lengkap</Badge>
                                            )}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="space-y-2">
                                                <Badge className={cn(
                                                    "rounded-full px-5 py-1.5 font-black uppercase tracking-widest text-[10px]",
                                                    req.status === 'Selesai' ? "bg-green-500 text-white" :
                                                        req.status === 'Dikerjakan' ? "bg-blue-600 text-white" : "bg-white text-[#032553]"
                                                )}>
                                                    {req.status === 'Pending' ? 'Antri' : req.status}
                                                </Badge>
                                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {req.current_stage || 'Menunggu Verifikasi'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <Button
                                                className="rounded-full bg-white text-[#032553] font-black tracking-widest text-[10px] hover:bg-white/90 shadow-xl transition-all hover:-translate-y-1"
                                                onClick={() => {
                                                    setSelectedRequest(req);
                                                    setOpen(true);
                                                }}
                                            >
                                                {req.status === 'Pending' ? 'VERIFIKASI & UPDATE' : 'UPDATE PROGRESS'} <ArrowUpCircle className="ml-2 w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-32 text-center text-white/20 italic font-black uppercase tracking-[0.3em]">Belum ada data pengajuan masuk.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SINGLE MODAL FOR UPDATING PROGRESS */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-4xl bg-[#021a3a] text-white p-0 border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="p-8 border-b border-white/5 relative z-10 shrink-0">
                            <DialogHeader className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 text-left">
                                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-white border border-white/10 shadow-2xl shrink-0">
                                            <CloudUpload className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <DialogTitle className="text-3xl font-black tracking-tight uppercase">Update Pengerjaan</DialogTitle>
                                            <DialogDescription className="font-black text-blue-400 tracking-[0.2em] text-[10px] uppercase">
                                                RESI: {selectedRequest?.resi_number} | {selectedRequest?.name}
                                            </DialogDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            type="button"
                                            variant={showDocs ? "default" : "outline"}
                                            className={cn("rounded-2xl border-white/10 text-[10px] font-black uppercase h-10 px-6", showDocs ? "bg-blue-600 text-white" : "bg-white/5 text-white/50")}
                                            onClick={() => setShowDocs(!showDocs)}
                                        >
                                            <Eye className="w-3.5 h-3.5 mr-2" /> {showDocs ? "Tutup Dokumen" : "Review Berkas"}
                                        </Button>
                                    </div>
                                </div>
                            </DialogHeader>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
                            {showDocs && (
                                <div className="mb-10 bg-black/30 border border-white/10 rounded-[32px] p-8 animate-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FileText className="w-4 h-4 text-white/30" />
                                        <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Verifikasi Digital Masyarakat</h5>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        {selectedRequest?.documents.map((doc: any, i: number) => (
                                            <a href={`/storage/${doc.file_path}`} target="_blank" key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                                        {doc.document_type === 'Foto Kondisi' ? <ImageIcon className="w-5 h-5 text-green-400" /> : <FileText className="w-5 h-5 text-blue-400" />}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="text-xs font-bold text-white leading-tight truncate">{doc.document_type}</p>
                                                        <p className="text-[10px] text-white/20 uppercase font-black tracking-tighter">Buka di Tab Baru</p>
                                                    </div>
                                                </div>

                                            </a>
                                        ))}
                                        {selectedRequest?.documents.length === 0 && (
                                            <p className="col-span-full py-12 text-center text-red-400 font-black text-[10px] uppercase tracking-widest">Belum ada dokumen digital yang diunggah.</p>
                                        )}
                                    </div>
                                    {!isDocumentsComplete(selectedRequest) && (
                                        <div className="mt-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Peringatan: Dokumen digital belum lengkap.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <form id="progress-form" onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] pl-1">Tahapan yang Selesai *</Label>
                                    <Select 
                                        required 
                                        value={data.stage} 
                                        onValueChange={(v) => {
                                            setData('stage', v);
                                            // Reset files if we change stage from 'Selesai' away
                                            if (v !== 'Selesai & Serah Terima') {
                                                setData(d => ({ ...d, result_file: null, ba_final_file: null }));
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="!h-14 rounded-xl w-full border-white/10 font-bold bg-white/5 focus:ring-2 focus:ring-white/20 transition-all">
                                            <SelectValue placeholder="-- Pilih Tahapan --" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl bg-[#021a3a] border-white/10 text-white shadow-2xl p-2">
                                            <SelectItem value="Verifikasi arsip fisik">1. Verifikasi arsip fisik</SelectItem>
                                            <SelectItem value="Pengerjaan pemisahan">2. Pengerjaan pemisahan</SelectItem>
                                            <SelectItem value="Perbaikan lembaran">3. Perbaikan lembaran</SelectItem>
                                            <SelectItem value="Penyusunan dan perapihan">4. Penyusunan dan perapihan</SelectItem>
                                            <SelectItem value="Duplikasi arsip">5. Duplikasi arsip</SelectItem>
                                            <SelectItem value="Penjilidan arsip">6. Penjilidan arsip</SelectItem>
                                            <SelectItem value="Alih Media">7. Alih Media</SelectItem>
                                            <SelectItem value="Selesai & Serah Terima">8. Selesai & Serah Terima</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.stage && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{errors.stage}</p>}
                                </div>
``
                                {data.stage === 'Selesai & Serah Terima' && (
                                    <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-8 space-y-8 animate-in zoom-in-95 duration-500">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#021a3a]">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <h6 className="font-black text-xs uppercase tracking-widest text-green-400">Berkas Hasil Akhir (Wajib)</h6>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                            <div className="space-y-4">
                                                <Label className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] pl-1 flex items-center gap-2">
                                                    <FileArchive className="w-3.5 h-3.5" /> 1. Arsip Hasil Restorasi (Besar)
                                                </Label>
                                                <Input 
                                                    type="file" 
                                                    required
                                                    className="rounded-xl border-white/10 h-14 pt-3.5 px-4 bg-white/5 text-white font-bold file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-green-500 file:text-[#021a3a] cursor-pointer" 
                                                    onChange={e => setData('result_file', e.target.files ? e.target.files[0] : null)}
                                                />
                                                <p className="text-[9px] text-white/30 italic">Unggah seluruh hasil restorasi dalam satu file (Zip/Rar/PDF).</p>
                                            </div>

                                            <div className="space-y-4">
                                                <Label className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] pl-1 flex items-center gap-2">
                                                    <FileCheck className="w-3.5 h-3.5" /> 2. Berita Acara Final (PDF)
                                                </Label>
                                                <Input 
                                                    type="file" 
                                                    accept=".pdf"
                                                    required
                                                    className="rounded-xl border-white/10 h-14 pt-3.5 px-4 bg-white/5 text-white font-bold file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-green-500 file:text-[#021a3a] cursor-pointer" 
                                                    onChange={e => setData('ba_final_file', e.target.files ? e.target.files[0] : null)}
                                                />
                                                <p className="text-[9px] text-white/30 italic">Pindai Berita Acara yang sudah ditandatangani.</p>
                                            </div>
                                        </div>

                                        {progress && (
                                            <div className="space-y-3 pt-4 border-t border-white/5">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Loader2 className="w-3 h-3 animate-spin" /> Sedang Mengirim Berkas...
                                                    </span>
                                                    <span className="text-[10px] font-black text-white/40">{progress.percentage}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${progress.percentage}%` }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    <div className="space-y-3">
                                        <Label className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] pl-1">Foto Bukti Update *</Label>
                                        <div className="relative group">
                                            <Input 
                                                type="file" 
                                                multiple 
                                                accept="image/*" 
                                                required
                                                className="rounded-xl border-white/10 h-14 pt-3.5 px-4 bg-white/5 text-white font-bold file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-white file:text-[#032553] hover:file:bg-white/80 transition-all cursor-pointer" 
                                                onChange={e => setData('photos', Array.from(e.target.files || []))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] pl-1">Catatan Restorasi</Label>
                                    <Textarea
                                        className="rounded-2xl border-white/10 font-medium p-6 min-h-[140px] bg-white/5 focus:ring-2 focus:ring-white/20 transition-all text-base placeholder:text-white/10"
                                        placeholder="Detail kondisi, kendala, atau tindakan..."
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    />
                                    {errors.notes && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{errors.notes}</p>}
                                </div>
                            </form>
                        </div>

                        <div className="p-8 border-t border-white/5 bg-[#021a3a]/80 backdrop-blur-md relative z-20 shrink-0">
                            <DialogFooter className="flex flex-col sm:flex-row gap-4">
                                <Button type="button" variant="ghost" className="rounded-full px-10 h-14 font-black tracking-widest uppercase text-[10px] text-white/50 hover:bg-white/5 hover:text-white transition-all" onClick={() => setOpen(false)}>Batal</Button>
                                <Button
                                    form="progress-form"
                                    type="submit"
                                    className="flex-1 rounded-full h-14 bg-white text-[#032553] font-black tracking-[0.2em] uppercase text-[10px] shadow-2xl transition-all hover:bg-white/90 active:scale-95 flex items-center justify-center gap-3"
                                    disabled={processing}
                                >
                                    {processing ? <Loader2 className="animate-spin w-5 h-5" /> : <><CheckCircle2 className="w-4 h-4" /> Simpan & Publikasikan</>}
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}

