<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class InvoicesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_invoices(): void
    {
        Artisan::call('migrate');
        $load = $this->get(route('invoicesRequest'));
        $load->assertStatus(200);
        $load->dumpHeaders();
        $load->dumpSession();
        $load->dump();
    }
}
