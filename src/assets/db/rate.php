<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//menu.php?action=allMenus

include 'conn.php';

$action = $_GET['action'];

if($action=='addRate'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$rate = $data->rate;
		$hid = $data->hid;
		$mid = $data->mid;
		$userid = $data->userid;
		$date = $data->date;

		$addRate="INSERT INTO  rate_register(rate,menu_id,hotel_id,created_by,created_on,modified_by,modified_on)VALUES('$rate','$mid','$hid','$userid','$date','$userid','$date')";


		$result=$conn->query($addRate);
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

 	//get hotel rate
if($action == "hotelRate"){
	$data = json_decode(file_get_contents("php://input"));
	$data1=array();


	$hid = $data->hid;

	$sql = "select r.id,r.rate,r.deleted_by,m.id as mid,m.name as mname,h.id as hid,h.name as hname from rate_register r,hotel_register h, menu_register m WHERE r.menu_id=m.id AND h.id = r.hotel_id and r.hotel_id='$hid'";



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
			$tmp[$i]['mid'] = $row['mid'];
			$tmp[$i]['hid'] = $row['hid'];
			$tmp[$i]['rate'] = $row['rate'];
			$tmp[$i]['mname'] = $row['mname'];
			$tmp[$i]['hname'] = $row['hname'];
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
if($action=='toggleRate'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$hrid = $data->hrid;
		$action = $data->action;
		$userid = $data->userid;
		$date = $data->date;
		

		if($action === 'activate'){
			$toggleRate="Update rate_register set  modified_by='$userid' , modified_on='$date',  deleted_by=null,deleted_on=null where id= $hrid";
		}
		if($action === 'deactivate'){

			$toggleRate="Update rate_register set  modified_by='$userid' , modified_on='$date',  deleted_by='$userid' ,deleted_on= '$date'where  id= $hrid";
		}	

		$result=$conn->query($toggleRate);
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



if($action=='editRate'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();


		$rid = $data->rid;
		$rate = $data->rate;
		$userid = $data->userid;
		$date = $data->date;



		$editProduct="Update rate_register set  modified_by='$userid' , modified_on='$date',rate='$rate' where id= $rid";
		
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