<?php
//Create a connection
header('Access-Control-Allow-Origin: *');
$conn = new mysqli("localhost", "root", "", "assasate_license");

$name = "BlueChef";
$nmkey = md5($name);

$sql = "SELECT * FROM `licensemaster` WHERE `lickey`='$nmkey'";
$result = $conn->query($sql);
$row = $result->fetch_array();
$date = new DateTime();

$data = array();
if((double)$date->getTimestamp() > (double)($row["enddate"])){
	$data["expired"] = true;
	echo json_encode($data);
}
else{
	$data["expired"] = false;
	echo json_encode($data);
}
?>