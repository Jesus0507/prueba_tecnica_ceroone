<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Fecades\Http;

class PostController extends Controller
{
    public function getContacts()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.holded.com/api/invoicing/v1/contacts', [
            'headers' => [
            'accept' => 'application/json',
            'key' => 'fb26799641c8ce2038631e031bcd34d2',
            ],
        ]);
  
        echo $response->getBody();
    }

    public function getInvoices()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.holded.com/api/invoicing/v1/documents/invoice', [
        'headers' => [
            'accept' => 'application/json',
            'key' => 'fb26799641c8ce2038631e031bcd34d2',
        ],
        ]);

        echo $response->getBody();
    }

    public function getAccounts()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.holded.com/api/invoicing/v1/treasury', [
        'headers' => [
            'accept' => 'application/json',
            'key' => 'fb26799641c8ce2038631e031bcd34d2',
        ],
        ]);

        echo $response->getBody();
    }

    public function getPurchase()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', 'https://api.holded.com/api/invoicing/v1/documents/purchase', [
        'headers' => [
            'accept' => 'application/json',
            'key' => 'fb26799641c8ce2038631e031bcd34d2',
        ],
        ]);

        echo $response->getBody();
    }

}
