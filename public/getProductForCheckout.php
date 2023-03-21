<?php

require_once 'configdb.php';

$id = $_POST['id'];

$stmt = $conn->prepare("SELECT name,price FROM products WHERE id = ?");
$stmt->bind_param('s', $id);
$stmt->execute();
$result = $stmt->get_result();


$productInfo = $result->fetch_assoc();
           


?>