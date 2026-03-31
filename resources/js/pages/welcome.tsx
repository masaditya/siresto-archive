import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Wrench,
    FileCheck,
    HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/restoration/stat-card';
import { FAQCard } from '@/components/restoration/faq-card';

export default function Welcome({ stats }: { stats: any }) {
    return (
        <PublicLayout>
            <Head title="Si-Resto - Sistem Informasi Restorasi Arsip" />

            <div className="flex flex-col gap-24 py-12">
                {/* HERO SECTION */}
                <section className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 text-left">
                        <div className="space-y-1">
                            <h4 className="text-xl font-light text-white/50 tracking-widest uppercase">Si-Resto</h4>
                            <p className="text-lg font-medium text-white/80">Sistem Informasi Perpustakaan & Kearsipan</p>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black leading-tight text-white tracking-tighter">
                            Restorasi <span className="text-red-500">Arsip</span>
                        </h1>
                        <p className="text-lg text-white/50 max-w-md leading-relaxed">
                            Layanan restorasi profesional untuk menjaga arsip bernilai sejarah, hukum, dan ilmu pengetahuan tetap abadi.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-10 py-7 text-lg font-bold bg-white text-[#032553] hover:bg-red-500 hover:text-white transition-all shadow-xl"
                        >
                            <Link href="/pengajuan">AJUKAN SEKARANG</Link>
                        </Button>
                    </div>
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="bg-[#021a3a] border border-white/5 p-4 rounded-[40px] shadow-2xl">
                            <img
                                src="https://bast.anri.go.id/frontend-cms/media/content/1667881948.png"
                                alt="Restorasi Arsip"
                                className="rounded-[32px] w-full aspect-video object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="container mx-auto px-4 space-y-12 text-center">
                    <h5 className="text-sm font-bold text-white/30 tracking-[0.2em] uppercase">Statistik Pelayanan</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            icon={Users}
                            label="Pemohon Antrian"
                            value={stats?.waiting || 0}
                            colorClass="bg-[#ffe8d6] text-[#f08a5d]"
                        />
                        <StatCard
                            icon={Wrench}
                            label="Sedang Dikerjakan"
                            value={stats?.in_progress || 0}
                            colorClass="bg-[#eaddff] text-[#7e57c2]"
                        />
                        <StatCard
                            icon={FileCheck}
                            label="Restorasi Terselesaikan"
                            value={stats?.completed || 0}
                            colorClass="bg-[#d1f2eb] text-[#2ecc71]"
                        />
                        <StatCard
                            icon={HelpCircle}
                            label="Total Permohonan"
                            value={stats?.total || 0}
                            colorClass="bg-white/10 text-white/50"
                        />
                    </div>
                </section>

                {/* QUOTE SECTION */}
                <section className="bg-white/5 border-y border-white/5 py-24 text-center">
                    <div className="container mx-auto px-4 space-y-12">
                        <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-white">"Arsip Terawat, Informasi Selamat"</h2>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed italic">
                            Jangan biarkan arsip penting Anda hancur dimakan waktu. Kami hadir dengan teknologi dan metode terbaik untuk mengembalikan kejayaan arsip Anda.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <img src="https://cdn-jpr.jawapos.com/images/43/2026/01/19/arsip-online-2746692795.jpg" className="rounded-2xl aspect-video object-cover border border-white/5" alt="Proses 1" />
                            <img src="https://web.komdigi.go.id/resource/ZHJ1cGFsL2tvbWluZm8tYW50YXJhZm90by1wZW5nZWxvbGFhbi1hcnNpcC1uYXNpb25hbC0xMDEyMTkuanBn" className="rounded-2xl aspect-video object-cover border border-white/5" alt="Proses 2" />
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="container mx-auto px-4 space-y-16" id="faq">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Tanya Jawab <span className="text-red-500 italic">Si-Resto</span></h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Informasi lengkap mengenai layanan restorasi arsip di Bojonegoro.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <FAQCard title="1. Apa itu Restorasi Arsip?" highlight className="rounded-3xl! border-none">
                            <p className="text-lg text-[#032553]/80 mb-4">
                                Restorasi arsip adalah proses perbaikan dan pemulihan arsip yang mengalami kerusakan fisik maupun kimia, agar informasi di dalamnya tetap terjaga dan dapat dimanfaatkan kembali.
                            </p>
                            <p className="font-bold text-[#032553] border-t border-[#032553]/10 pt-4">
                                "Arsip bukan sekadar kertas biasa — di dalamnya ada nilai sejarah, bukti hukum, dan data penting."
                            </p>
                        </FAQCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FAQCard title="2. Berapa lama prosedurnya :">
                                <p className="text-white/50 leading-relaxed">Tergantung pada tingkat kerusakan fisik dan kimia serta jumlah lembar arsip. Biasanya membutuhkan waktu antara <span className="text-white font-bold">2 sampai 3 bulan</span> yaaa.</p>
                            </FAQCard>
                            <FAQCard title="3. Apa saja yang direstorasi?">
                                <p className="text-white/50 leading-relaxed">Prioritas kami adalah <span className="text-white font-bold">Arsip Buku Letter C & B1 Desa</span>. Namun arsip bersejarah lain dapat disesuaikan kemudian yaaa.</p>
                            </FAQCard>
                            <FAQCard title="4. Syarat Pengajuan Restorasi">
                                <ul className="space-y-2 text-sm text-white/50">
                                    <li>• Surat Permohonan (Kades & Camat)</li>
                                    <li>• Berita Acara Penyerahan</li>
                                    <li>• Foto Arsip (Cover & Isi)</li>
                                </ul>
                            </FAQCard>
                            <FAQCard title="5. Layanan Konsultasi">
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-white tracking-tight">085-235-635-480</p>
                                    <p className="text-xs text-red-400 font-bold uppercase">Kiki Arsiparis (Dinpusip Bojonegoro)</p>
                                </div>
                            </FAQCard>
                        </div>
                    </div>
                </section>

                {/* ALUR SECTION */}
                <section className="container mx-auto px-4 py-24" id="alur">
                    <div className="max-w-5xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight italic">6. Alur Layanan <span className="not-italic text-red-500">Restorasi</span></h2>
                            <p className="text-white/40 italic">"Langkah mudah proses restorasi arsip di SIRESTO"</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { step: '01', title: 'Akses Website', desc: 'Buka website SIRESTO untuk informasi umum.' },
                                { step: '02', title: 'Ajukan Permohonan', desc: 'Isi formulir pengajuan dengan data akurat.' },
                                { step: '03', title: 'Nomor Resi', desc: 'Dapatkan nomor resi unik untuk pelacakan.' },
                                { step: '04', title: 'Upload Dokumen', desc: 'Unggah file pendukung menggunakan resi.' },
                                { step: '05', title: 'Verifikasi', desc: 'Tim kami akan memvalidasi dokumen Anda.' },
                                { step: '06', title: 'Penyerahan Arsip', desc: 'Penyerahan fisik arsip ke kantor petugas.' },
                                { step: '07', title: 'Lacak Progres', desc: 'Pantau tahapan di menu tracking sistem.' },
                                { step: '08', title: 'Penyelesaian', desc: 'Informasi selesai dan akses softfile hasil.' },
                                { step: '09', title: 'Pengambilan dan Penyerahan Kembali', desc: 'Arsip fisik siap diambil kembali oleh pemohon.' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-3xl space-y-4 hover:border-red-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                                        {item.step}
                                    </div>
                                    <h6 className="text-lg font-bold text-white tracking-tight uppercase">{item.title}</h6>
                                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
