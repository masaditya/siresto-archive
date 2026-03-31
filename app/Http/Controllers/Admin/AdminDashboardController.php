<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RestorationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'waiting' => RestorationRequest::where('status', 'Pending')->count(),
            'in_progress' => RestorationRequest::where('status', 'Dikerjakan')->count(),
            'total' => RestorationRequest::count(),
        ];

        $recentRequests = RestorationRequest::latest()->take(5)->get();

        // Chart data (mocking for now, adjust with real logic if needed)
        $chartData = RestorationRequest::select(DB::raw('COUNT(*) as count'), DB::raw("DATE_FORMAT(created_at, '%m') as month"))
            ->groupBy('month')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
            'chartData' => $chartData,
        ]);
    }
}
