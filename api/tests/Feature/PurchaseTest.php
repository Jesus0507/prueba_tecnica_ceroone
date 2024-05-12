<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class PurchaseTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_purchase(): void
    {
        Artisan::call('migrate');
        $load = $this->get(route('purchaseRequest'));
        $load->assertStatus(200);
        $load->dumpHeaders();
        $load->dumpSession();
        $load->dump();
    }
}
