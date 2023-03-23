<?php

require_once 'configdb.php';


$stmt = $conn->prepare("SELECT * FROM products");

$stmt->execute();
$result = $stmt->get_result();
$products = [];
$i = 0;

while($row = $result->fetch_assoc()){
           
    $products[$i][0] = $row['id'];
    $products[$i][1] = $row['name']; 
    $products[$i][2] = $row['description']; 
    $products[$i][3] = $row['price']; 
    $products[$i][4] = $row['quantity'];
    $products[$i][5] = $row['group_id'];
    $i++;
}


echo json_encode($products);


?>