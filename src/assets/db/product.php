<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	//hotel.php?action=userHotel

include 'conn.php';

$action = $_GET['action'];

if($action == "getProduct"){

	$sql = "select p.id,p.name,p.deleted_by ,u.unit_name,u.id as uid from product_register p ,unit_register u where p.unit_id = u.id order by p.id";
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
			$tmp[$i]['uid'] = $row['uid'];
			$tmp[$i]['name'] = $row['name'];
			$tmp[$i]['uname'] = $row['unit_name'];
			$tmp[$i]['deleted_by'] = $row['deleted_by'];
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
		$userid = $data->userid;
		$date = $data->date;

		$addProduct="INSERT INTO product_register(name,unit_id,created_by,created_on,modified_by,modified_on)VALUES('$pname','$uid','$userid ','$date','$userid ','$date')";
		$result=$conn->query($addProduct);
		$prodId = $conn->insert_id; 

	}
	if($result){
		$addstock="INSERT INTO stock_register(product_id)VALUES('$prodId')";
		$result1=$conn->query($addstock);

		$data1["status"] = 200;
		header(' ', true, 200);
	}
	else{
		$data1["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data1);
}

if($action=='toggleProduct'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$pid = $data->pid;
		$action = $data->action;
		$userid = $data->userid;
		$date = $data->date;
		

		if($action === 'activate'){
			$toggleProduct="Update product_register set  modified_by='$userid' , modified_on='$date',  deleted_by=null,deleted_on=null where id= $pid";
		}
		if($action === 'deactivate'){

			$toggleProduct="Update product_register set  modified_by='$userid' , modified_on='$date',  deleted_by='$userid' ,deleted_on= '$date'where  id= $pid";

		}	

		$result=$conn->query($toggleProduct);
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


if($action=='editProduct'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$pname = $data->pname;
		$uid = $data->uid;
		$userid = $data->userid;
		$date = $data->date;
		$pid = $data->pid;


		$editProduct="Update product_register set  modified_by='$userid' , modified_on='$date',  unit_id='$uid',name='$pname' where id= $pid";
		
		$result=$conn->query($editProduct);
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