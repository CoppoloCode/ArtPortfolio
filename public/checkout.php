<?php

require_once '../vendor/autoload.php';
require_once '../secrets.php';
require_once 'getProductForCheckout.php';

$PRODUCT_NAME = $productInfo["name"];
$PRODUCT_PRICE = $productInfo["price"];


\Stripe\Stripe::setApiKey($stripeSecretKey);
header('Content-Type: application/json');


$YOUR_DOMAIN = 'http://localhost/artportfolio/public';




$checkout_session = \Stripe\Checkout\Session::create([
  'line_items' => [[
    'price_data' => [
      'currency' => 'usd',
      'product_data' => [
        'name' => $PRODUCT_NAME,
        'images' => ['http://localhost/artportfolio/public/images/'.$PRODUCT_NAME.'.jpg'],
      ],
      'unit_amount' => $PRODUCT_PRICE,
    ],  
    'quantity' => 1,
  ]],
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/success.html',
  'cancel_url' =>  $YOUR_DOMAIN . '/cancel.html',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);