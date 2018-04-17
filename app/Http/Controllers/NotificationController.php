<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notification;
use Log;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notifications = Notification::all();
        return response()->json([
                                'error' => false,
                                'status' => 200,
                                'data' => $notifications,
                                'message' => ''
                                    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $notifications = new Notification([
                'title' => $request->get('title')
            ]);
            if ($notifications->save()) {
                $notification_data = Notification::all();
                return response()->json([
                                'error' => false,
                                'status' => 200,
                                'data' => $notification_data,
                                'message' => 'Notification created successfully!'
                                    ], 200);
            }else{
                return response()->json([
                        'error' => true,
                        'status' => 500,
                        'data' => array(),
                        'message' => "Something went wrong. Please Contact Technical Team."
                            ], 500);
            }
            
        } catch (Exception $e) {
            Log::info("NotificationController Error:\n" . $e);
            return response()->json([
                        'error' => true,
                        'status' => 500,
                        'data' => array(),
                        'message' => "Something went wrong. Please Contact Technical Team."
                            ], 500);
        }
        
    }
}
