<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Models\Expense;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{
    /**
     * Store a newly created expense in storage, including pivot data.
     */
    public function store(StoreExpenseRequest $request): JsonResponse
    {
        // Start a database transaction to ensure atomicity. 
        // If the main expense is created but the pivot fails, everything rolls back.
        DB::beginTransaction();

        try {
            // 1. Create the main expense record
            $expense = Expense::create($request->only([
                'amount',
                'description',
                'user_id',
                'category_id'
            ]));

            // 2. Prepare the pivot data array for syncing
            $pivotData = [];
            foreach ($request->debtors as $debtor) {
                // The key is the user_id, and the value is an array of pivot column data
                $pivotData[$debtor['user_id']] = [
                    'amount_owed' => $debtor['amount_owed']
                ];
            }

            // 3. Attach the debtors and their owed amounts to the expense
            // We use attach here as it is a new record, and we want explicit control.
            // The Expense model's users' relationship is used here.
            $expense->users()->attach($pivotData);

            DB::commit();

            // Return the created expense with its relationships loaded
            return response()->json([
                'message' => 'Expense successfully created.',
                'expense' => $expense->load(['payer', 'users', 'category'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            \Log::error('Expense creation failed: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to create expense.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
