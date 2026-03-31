<?php

namespace App\Http\Controllers;

use App\Models\RestorationRequest;
use App\Models\RestorationDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RestorationController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'stats' => [
                'waiting' => RestorationRequest::where('status', 'Pending')->count(),
                'in_progress' => RestorationRequest::where('status', 'Dikerjakan')->count(),
                'completed' => RestorationRequest::where('status', 'Selesai')->count(),
                'total' => RestorationRequest::count(),
            ]
        ]);
    }

    public function pengajuan()
    {
        return Inertia::render('pengajuan');
    }

    public function upload()
    {
        return Inertia::render('upload');
    }

    public function trackingPage()
    {
        return Inertia::render('tracking');
    }


    public function storeSubmission(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'person_name' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'address' => 'required|string',
            'archive_type' => 'required|string',
            'estimated_sheets' => 'required|integer',
        ]);

        $resi = 'RESTC' . strtoupper(Str::random(5)); // Exactly 10 chars: RESTC (5) + random (5)
        $queue = str_pad(RestorationRequest::count() + 1, 3, '0', STR_PAD_LEFT);


        $restoration = RestorationRequest::create([
            'resi_number' => $resi,
            'queue_number' => $queue,
            'name' => $request->name,
            'person_name' => $request->person_name,
            'whatsapp' => $request->whatsapp,
            'address' => $request->address,
            'archive_type' => $request->archive_type,
            'estimated_sheets' => $request->estimated_sheets,
            'status' => 'Pending',
            'current_stage' => 'Pengajuan dan upload dokumen',
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', [
            'resi' => $resi,
            'queue' => $queue,
            'name' => $request->name,
        ]);

    }

    public function uploadDocuments(Request $request)
    {
        $request->validate([
            'resi_number' => 'required|exists:restoration_requests,resi_number',
            'permohonan' => 'nullable|file|mimes:pdf|max:10240',
            'berita_acara' => 'nullable|file|mimes:pdf|max:10240',
            'foto_kondisi' => 'nullable|array',
            'foto_kondisi.*' => 'required|image|mimes:jpeg,png,jpg|max:10240',
        ]);


        $restoration = RestorationRequest::where('resi_number', $request->resi_number)->firstOrFail();

        $resiPrefix = $request->resi_number . '_';
        
        // Store files with unique names including resi
        if ($request->hasFile('permohonan')) {
            $path1 = $request->file('permohonan')->storeAs(
                'documents',
                $resiPrefix . 'permohonan_' . time() . '.' . $request->file('permohonan')->getClientOriginalExtension(),
                'public'
            );
            RestorationDocument::create([
                'restoration_request_id' => $restoration->id,
                'document_type' => 'Surat Permohonan',
                'file_path' => $path1,
            ]);
        }

        if ($request->hasFile('berita_acara')) {
            $path2 = $request->file('berita_acara')->storeAs(
                'documents',
                $resiPrefix . 'berita_acara_' . time() . '.' . $request->file('berita_acara')->getClientOriginalExtension(),
                'public'
            );
            RestorationDocument::create([
                'restoration_request_id' => $restoration->id,
                'document_type' => 'Berita Acara',
                'file_path' => $path2,
            ]);
        }

        if ($request->hasFile('foto_kondisi')) {
            foreach ($request->file('foto_kondisi') as $index => $file) {
                $path = $file->storeAs(
                    'documents',
                    $resiPrefix . 'foto_' . $index . '_' . time() . '.' . $file->getClientOriginalExtension(),
                    'public'
                );
                RestorationDocument::create([
                    'restoration_request_id' => $restoration->id,
                    'document_type' => 'Foto Kondisi',
                    'file_path' => $path,
                ]);
            }
        }


        return back()->with('message', 'Dokumen berhasil diunggah.');
    }

    public function trackDetails($resi)
    {
        $restoration = RestorationRequest::with(['progress.photos'])
            ->where('resi_number', $resi)
            ->first();

        return response()->json($restoration);
    }
}

