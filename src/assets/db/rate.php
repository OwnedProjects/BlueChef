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

		 $addRate="INSERT INTO  rate_register(rate,menu_id,hotel_id,created_by,modified_by)VALUES('$rate','$mid','$hid','$userid','$userid')";

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

 

?>