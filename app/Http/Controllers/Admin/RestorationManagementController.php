<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RestorationRequest;
use App\Models\RestorationProgress;
use App\Models\RestorationProgressPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RestorationManagementController extends Controller
{
    public function index()
    {
        $requests = RestorationRequest::with(['documents', 'progress.photos'])->latest()->get();
        return Inertia::render('admin/restorations/index', [
            'requests' => $requests
        ]);
    }

    public function updateProgress(Request $request, RestorationRequest $restorationRequest)
    {
        $request->validate([
            'stage' => 'required|string',
            'notes' => 'nullable|string',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'result_file' => 'nullable|file|max:102400', // 100MB
            'ba_final_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB
        ]);

        DB::beginTransaction();
        try {
            $progress = RestorationProgress::create([
                'restoration_request_id' => $restorationRequest->id,
                'stage' => $request->stage,
                'notes' => $request->notes,
                'completed_at' => now(),
            ]);

            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $file) {
                    $path = $file->store('progress', 'public');
                    RestorationProgressPhoto::create([
                        'restoration_progress_id' => $progress->id,
                        'file_path' => $path,
                    ]);
                }
            }

            // Update current stage and status of the main request
            $updateData = [
                'current_stage' => $request->stage,
                'status' => $request->stage == 'Selesai & Serah Terima' ? 'Selesai' : 'Dikerjakan',
            ];

            if ($request->hasFile('result_file')) {
                $path = $request->file('result_file')->storeAs(
                    'final_results', 
                    $restorationRequest->resi_number . '_HASIL_RESTORASI_' . time() . '.' . $request->file('result_file')->getClientOriginalExtension(), 
                    'public'
                );
                $updateData['result_file_path'] = $path;
            }

            if ($request->hasFile('ba_final_file')) {
                $path = $request->file('ba_final_file')->storeAs(
                    'final_results', 
                    $restorationRequest->resi_number . '_BA_FINAL_' . time() . '.pdf', 
                    'public'
                );
                $updateData['ba_final_path'] = $path;
            }

            $restorationRequest->update($updateData);
            
            DB::commit();
            return back()->with('message', 'Progress berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            // If files were stored, they might need to be cleaned up manually if the transaction rolls back.
            // For now, we'll just roll back the DB changes.
            return back()->withErrors(['error' => 'Gagal memperbarui progres: ' . $e->getMessage()]);
        }
    }
}

