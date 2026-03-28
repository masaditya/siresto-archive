import PublicLayout from '@/layouts/public-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2, UploadCloud, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Upload() {
    const { flash } = usePage().props as any;

    const uploadForm = useForm({
        resi_number: '',
        permohonan: null as File | null,
        berita_acara: null as File | null,
        foto_kondisi: [] as File[],
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        uploadForm.post(route('documents.upload'), {
            onSuccess: () => {
                uploadForm.reset();
            }
        });
    };

    return (
        <PublicLayout>
            <Head title="Upload Dokumen - Si-Resto" />

            <div className="container mx-auto px-4 mt-12">
                <section className="max-w-3xl mx-auto space-y-12 py-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-bold tracking-tight">Upload Dokumen Persyaratan</h2>
                        <p className="text-white/50">Gunakan nomor resi Anda untuk mengunggah dokumen digital yang diperlukan.</p>
                    </div>

                    {/* Template Downloads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-white/30 uppercase tracking-widest">Template 01</p>
                                <h4 className="font-bold text-white leading-tight">Surat Permohonan</h4>
                            </div>
                            <Button asChild size="sm" variant="ghost" className="rounded-full bg-white/10 text-white hover:bg-white hover:text-black">
                                <a href="/template/Contoh-Surat-Permohonan-Restorasi.docx" download>Download</a>
                            </Button>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-white/30 uppercase tracking-widest">Template 02</p>
                                <h4 className="font-bold text-white leading-tight">Berita Acara</h4>
                            </div>
                            <Button asChild size="sm" variant="ghost" className="rounded-full bg-white/10 text-white hover:bg-white hover:text-black">
                                <a href="/template/Contoh-BA-Penyerahan-Restorasi-Arsip.docx" download>Download</a>
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 shadow-2xl overflow-hidden relative">
                        {flash?.message ? (
                            <div className="py-20 text-center space-y-8 animate-in zoom-in-95 fade-in duration-500">
                                <div className="w-24 h-24 bg-[#2ecc71] rounded-full flex items-center justify-center mx-auto text-white shadow-[0_0_50px_rgba(46,204,113,0.3)]">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-bold">Dokumen Terunggah!</h3>
                                    <p className="text-white/50 max-w-sm mx-auto">Terima kasih. Dokumen persyaratan digital Anda telah kami terima dan akan segera diverifikasi oleh tim kami.</p>
                                </div>
                                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild variant="outline" className="rounded-full h-14 px-8 border-white/20">
                                        <a href="/tracking">Lacak Progres Sekarang</a>
                                    </Button>
                                    <Button onClick={() => window.location.reload()} className="rounded-full h-14 px-8 bg-white text-[#032553] font-bold">
                                        Upload Dokumen Lain
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleUpload} className="space-y-12 text-left">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-white/60 text-lg font-bold ml-1">Kunci Akses (Nomor Resi)</Label>
                                        <p className="text-sm text-white/30 ml-1">Masukkan tepat 10 digit kode yang tertera pada bukti pendaftaran Anda. Contoh: RESTC5X2P9</p>
                                    </div>
                                    <div className="relative group">
                                        <Input 
                                            className="bg-white/5 border-white/20 h-24 text-4xl font-black text-center tracking-[0.3em] focus:border-green-500 focus:bg-white/10 transition-all text-green-400 placeholder:text-white/5 uppercase" 
                                            placeholder="RESTCXXXXX"
                                            required
                                            maxLength={10}
                                            value={uploadForm.data.resi_number}
                                            onChange={e => uploadForm.setData('resi_number', e.target.value.toUpperCase())}
                                        />
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-widest">
                                            10 DIGIT DIPERLUKAN
                                        </div>
                                    </div>
                                    {uploadForm.errors.resi_number && <p className="text-red-400 text-sm text-center font-bold">{uploadForm.errors.resi_number}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-white/60 ml-1">1. Surat Permohonan (PDF - Max 10MB)</Label>
                                        <div className="relative group">
                                            <Input 
                                                type="file" 
                                                accept=".pdf" 
                                                className="bg-white/5 border-white/10 h-16 pl-4 pr-4 pt-4 rounded-xl focus:bg-white/10 transition-all cursor-pointer file:bg-white/10 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-xs file:mr-4" 
                                                required
                                                onChange={e => uploadForm.setData('permohonan', e.target.files ? e.target.files[0] : null)}
                                            />
                                        </div>
                                        {uploadForm.errors.permohonan && <p className="text-red-400 text-xs ml-1 font-medium">{uploadForm.errors.permohonan}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-white/60 ml-1">2. Berita Acara (PDF - Max 10MB)</Label>
                                        <div className="relative group">
                                            <Input 
                                                type="file" 
                                                accept=".pdf" 
                                                className="bg-white/5 border-white/10 h-16 pl-4 pr-4 pt-4 rounded-xl focus:bg-white/10 transition-all cursor-pointer file:bg-white/10 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-xs file:mr-4" 
                                                required
                                                onChange={e => uploadForm.setData('berita_acara', e.target.files ? e.target.files[0] : null)}
                                            />
                                        </div>
                                        {uploadForm.errors.berita_acara && <p className="text-red-400 text-xs ml-1 font-medium">{uploadForm.errors.berita_acara}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-white/60 ml-1">3. Foto Kondisi Arsip / Barang (JPG/PNG - Max 10MB per file)</Label>
                                        <div className="relative group">
                                            <Input 
                                                type="file" 
                                                multiple 
                                                accept="image/jpeg,image/png" 
                                                className="bg-white/5 border-white/10 h-16 pl-4 pr-4 pt-4 rounded-xl focus:bg-white/10 transition-all cursor-pointer file:bg-white/10 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-xs file:mr-4" 
                                                required
                                                onChange={e => uploadForm.setData('foto_kondisi', Array.from(e.target.files || []))}
                                            />
                                        </div>
                                        <p className="text-[10px] text-white/30 ml-2 italic">Pilih beberapa foto sekaligus untuk dokumentasi kondisi arsip.</p>
                                        {uploadForm.errors.foto_kondisi && <p className="text-red-400 text-xs ml-1 font-medium">{uploadForm.errors.foto_kondisi}</p>}
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    className="w-full h-20 rounded-full text-xl font-bold bg-[#ffffff] text-[#032553] hover:bg-white/90 shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1 active:scale-95"
                                    disabled={uploadForm.processing}
                                >
                                    {uploadForm.processing ? (
                                        <><Loader2 className="animate-spin mr-3" /> Mengunggah Dokumen...</>
                                    ) : (
                                        <><UploadCloud className="w-6 h-6 mr-3" /> Kirim Dokumen Sekarang</>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>

                </section>
            </div>
        </PublicLayout>
    );
}
