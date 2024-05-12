<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class AccountsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_accounts(): void
    {
        Artisan::call('migrate');
        $load = $this->get(route('accountsRequest'));
        $load->assertStatus(200);
        $load->dumpHeaders();
        $load->dumpSession();
        $load->dump();
    }
}
