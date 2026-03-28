import PublicLayout from '@/layouts/public-layout';
    import { Head, useForm, usePage, Link } from '@inertiajs/react';
    import { useEffect, useState } from 'react';
    import { 
        Loader2,
        Calendar,
        Printer,
        UploadCloud
    } from 'lucide-react';
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
        DialogTitle,
    } from "@/components/ui/dialog";
    
    export default function Pengajuan() {
        const { flash } = usePage().props as any;
        const [modalOpen, setModalOpen] = useState(false);
    
        const submissionForm = useForm({
            name: '',
            whatsapp: '',
            address: '',
            archive_type: '',
            estimated_sheets: '',
        });
    
        useEffect(() => {
            if (flash?.success) {
                setModalOpen(true);
            }
        }, [flash]);
    
        const handleSubmission = (e: React.FormEvent) => {
            e.preventDefault();
            submissionForm.post(route('submission.store'), {
                onSuccess: () => {
                    submissionForm.reset();
                }
            });
        };
    
        return (
            <PublicLayout>
                <Head title="Pengajuan Restorasi - Si-Resto" />
    
                <div className="container mx-auto px-4 mt-12">
                    <section className="max-w-4xl mx-auto space-y-12 py-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl font-bold tracking-tight">Pengajuan Restorasi Arsip</h2>
                            <p className="text-white/50">Lengkapi formulir di bawah ini untuk mendapatkan nomor antrian dan resi digital Anda.</p>
                        </div>
    
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 shadow-2xl">
                            <form onSubmit={handleSubmission} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-3">
                                    <Label className="text-white/60 ml-1">Nama Lengkap / Instansi</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <Input 
                                            className="bg-white/5 border-white/10 h-16 pl-14 rounded-xl focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20" 
                                            placeholder="Cth: Pemerintah Desa Mekarjaya"
                                            required
                                            value={submissionForm.data.name}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => submissionForm.setData('name', e.target.value)}
                                        />
                                    </div>
                                    {submissionForm.errors.name && <p className="text-red-400 text-xs ml-1">{submissionForm.errors.name}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-white/60 ml-1">No. WhatsApp (Aktif)</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <Input 
                                            type="tel" 
                                            className="bg-white/5 border-white/10 h-16 pl-14 rounded-xl focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20" 
                                            placeholder="Cth: 081234567890"
                                            required
                                            value={submissionForm.data.whatsapp}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => submissionForm.setData('whatsapp', e.target.value)}
                                        />
                                    </div>
                                    {submissionForm.errors.whatsapp && <p className="text-red-400 text-xs ml-1">{submissionForm.errors.whatsapp}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-3">
                                    <Label className="text-white/60 ml-1">Alamat Lengkap</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-8 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        </div>
                                        <Textarea 
                                            className="bg-white/5 border-white/10 pl-14 pt-5 rounded-xl focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20 min-h-[120px]" 
                                            placeholder="Alamat lengkap lokasi arsip..."
                                            required
                                            value={submissionForm.data.address}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => submissionForm.setData('address', e.target.value)}
                                        />
                                    </div>
                                    {submissionForm.errors.address && <p className="text-red-400 text-xs ml-1">{submissionForm.errors.address}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-white/60 ml-1">Jenis Arsip</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors z-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                        </div>
                                        <Select 
                                            required
                                            value={submissionForm.data.archive_type}
                                            onValueChange={val => submissionForm.setData('archive_type', val)}
                                        >
                                            <SelectTrigger className="bg-white/5 w-full border-white/10 !h-16 !pl-14 rounded-xl focus:bg-white/10 focus:border-white/20 transition-all text-left">
                                                <SelectValue placeholder="Pilih Jenis Arsip" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#021a3a] border-white/20 text-white rounded-2xl">
                                                <SelectItem value="Buku C Desa">Buku C (Letter C Desa)</SelectItem>
                                                <SelectItem value="Buku B1 Desa">Buku B1 Desa</SelectItem>
                                                <SelectItem value="Arsip Pribadi">Arsip Pribadi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {submissionForm.errors.archive_type && <p className="text-red-400 text-xs ml-1">{submissionForm.errors.archive_type}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-white/60 ml-1">Estimasi Jumlah Lembar</Label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V7a5 5 0 0 1 10 0v4"></path><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M12 16v2"></path></svg>
                                        </div>
                                        <Input 
                                            type="number" 
                                            className="bg-white/5 border-white/10 h-16 pl-14 rounded-xl focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20" 
                                            placeholder="0"
                                            required
                                            value={submissionForm.data.estimated_sheets}
                                            onChange={e => submissionForm.setData('estimated_sheets', e.target.value)}
                                        />
                                    </div>
                                    {submissionForm.errors.estimated_sheets && <p className="text-red-400 text-xs ml-1">{submissionForm.errors.estimated_sheets}</p>}
                                </div>

                                <div className="md:col-span-2 pt-6">
                                    <Button 
                                        type="submit" 
                                        size="lg" 
                                        className="w-full h-20 rounded-full text-xl font-bold bg-white text-[#032553] hover:bg-white/90 shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1"
                                        disabled={submissionForm.processing}
                                    >
                                        {submissionForm.processing ? <Loader2 className="animate-spin" /> : "Ambil Nomor Antrian & Resi"}
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </section>
                </div>
    
                {/* NOTIF MODAL */}
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="max-w-md bg-[#021a3a] text-white border-white/20 rounded-[32px] p-0 overflow-hidden shadow-[0_0_80px_rgba(3,37,83,0.5)]">
                        <div className="flex bg-[#021a3a] px-8 pt-8 pb-4 items-center justify-between border-b border-white/10">
                            <DialogTitle className="text-xl font-bold">PENGAJUAN BERHASIL!</DialogTitle>
                        </div>
                        <div className="p-8 space-y-8">
                            <div id="printArea" className="bg-white text-[#032553] p-8 rounded-[24px] shadow-sm text-center space-y-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <h5 className="font-extrabold text-xs tracking-[0.3em] uppercase opacity-40 mb-1">BUKTI DIGITAL SI-RESTO</h5>
                                <p className="text-[10px] font-bold text-[#6c757d] mb-6">DINAS PERPUSTAKAAN DAN KEARSIPAN</p>
                                
                                <div className="space-y-1 py-4 border-t border-b border-dashed border-slate-200">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Nomor Antrean</p>
                                    <h1 className="text-[90px] font-black tracking-tighter leading-none text-blue-600">
                                        {flash?.success?.queue}
                                    </h1>
                                </div>
                                
                                <div className="pt-6 pb-2 space-y-1">
                                    <p className="text-xs font-medium text-slate-400 tracking-widest uppercase">Nomor Resi / Kode Tracking</p>
                                    <h3 className="text-3xl font-black text-red-500">
                                        {flash?.success?.resi}
                                    </h3>
                                </div>
                                
                                <div className="pt-4 flex flex-col items-center gap-1.5">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                        <Calendar className="w-3 h-3" /> {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                    </div>
                                    <p className="text-[9px] italic text-slate-400">*Gunakan resi untuk Upload & Tracking.</p>
                                </div>
                            </div>
    
                            <div className="flex gap-4">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 rounded-full h-14 border-white/20 hover:bg-white hover:text-[#032553] transition-all font-bold"
                                    onClick={() => window.print()}
                                >
                                    <Printer className="mr-2" /> CETAK
                                </Button>
                                <Button 
                                    asChild
                                    className="flex-1 rounded-full h-14 bg-white text-[#032553] hover:bg-white/90 font-bold"
                                >
                                    <Link href="/upload">
                                        <UploadCloud className="mr-2" /> UPLOAD
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
    
                <style>
                    {`
                        @page {
                            size: A5;
                            margin: 0;
                        }
                        @media print {
                            html, body {
                                zoom: 100%;
                                background: white !important;
                                height: auto;
                            }
                            body * { visibility: hidden !important; }
                            #printArea, #printArea * { visibility: visible !important; }
                            #printArea {
                                position: fixed !important;
                                left: 0 !important;
                                top: 0 !important;
                                width: 100% !important;
                                height: 100% !important;
                                max-width: none !important;
                                margin: 0 !important;
                                padding: 2cm !important;
                                border: none !important;
                                box-shadow: none !important;
                                background: white !important;
                                display: flex !important;
                                flex-direction: column !important;
                                justify-content: center !important;
                            }
                        }
                    `}
                </style>

            </PublicLayout>
        );
    }
