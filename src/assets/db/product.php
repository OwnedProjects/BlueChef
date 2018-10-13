<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	//hotel.php?action=userHotel

include 'conn.php';

$action = $_GET['action'];

 if($action == "getProduct"){

	$sql = "select p.id,p.name,u.unit_name from product_register p ,unit_register u where p.unit_id = u.id order by p.id";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$tmp = array();
	$data = array();
	$i = 0;

	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['id'] = $row['id'];
			$tmp[$i]['name'] = $row['name'];
			$tmp[$i]['uname'] = $row['unit_name'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

	//get unit
if($action == "unitList"){

	$sql = "select * from unit_register";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$tmp = array();
	$data = array();
	$i = 0;

	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['id'] = $row['id'];
			$tmp[$i]['uname'] = $row['unit_name'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}
if($action=='addProduct'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$pname = $data->pname;
		$uid = $data->uid;

		$addHotel="INSERT INTO product_register(name,unit_id)VALUES('$pname','$uid')";

		$result=$conn->query($addHotel);

	}
	if($result){
		$data1["status"] = 200;
		header(' ', true, 200);
	}
	else{
		$data1["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data1);
}



?>