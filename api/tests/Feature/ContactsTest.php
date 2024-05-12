<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class ContactsTest extends TestCase
{
    //Recordar encender el servidor de Mysql para poder realizar el testing
    public function test_contacts(): void
    {
        Artisan::call('migrate');
        $load = $this->get(route('contactsRequest'));
        $load->assertStatus(200);
        $load->dumpHeaders();
        $load->dumpSession();
        $load->dump();
    }
}
