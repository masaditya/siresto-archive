import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';

export default function Login() {
    return (
        <div className="min-h-screen bg-[#032553] flex items-center justify-center p-4 selection:bg-blue-200">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <Head title="Admin Security Login - Si-Resto" />

            <div className="w-full max-w-[400px] bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative z-10 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="mb-8">
                    <h2 className="text-4xl font-black tracking-tight text-[#032553] mb-1">SI-RESTO</h2>
                    <p className="text-[#6c757d] font-semibold text-sm tracking-wide">Admin Security Login</p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-6 text-left"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-1.5">
                                <Label htmlFor="username" className="text-[11px] font-black uppercase tracking-widest text-[#032553] pl-1">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    autoFocus
                                    className="h-14 bg-[#f8f9fa] border-none rounded-2xl px-6 text-[#333] font-semibold placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-[#032553]/10"
                                    placeholder="Masukkan username"
                                />
                                <InputError message={errors.username} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-[#032553] pl-1">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    className="h-14 bg-[#f8f9fa] border-none rounded-2xl px-6 text-[#333] font-semibold placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-[#032553]/10"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-full bg-[#032553] text-white font-black tracking-widest text-sm hover:bg-[#032553]/90 transition-all shadow-lg active:scale-95"
                                disabled={processing}
                            >
                                {processing ? <Spinner className="mr-2" /> : "LOGIN DASHBOARD"}
                            </Button>

                            <div className="text-center pt-2">
                                <a href="/" className="text-[10px] font-bold text-zinc-400 hover:text-[#032553] transition-colors tracking-widest uppercase">
                                    Kembali ke Beranda
                                </a>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
