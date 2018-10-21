<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    include 'conn.php';

	$action = $_GET['action'];
	
	 if($action == "allMenus"){
		$rows= array();
		$sql = "SELECT m.id, m.name, m.menu_type_id AS type, r.rate FROM menu_register m, rate_register r, hotel_register h WHERE r.menu_id=m.id and r.hotel_id=h.id";
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
				$tmp[$i]['type'] = $row['type'];
				$tmp[$i]['rate'] = $row['rate'];
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
	
	if($action == "hotelMenus"){
		$hotelId = $_GET["hotelId"];
		$rows= array();
		$sql = "SELECT m.id, m.name, m.menu_type_id AS type, r.rate FROM menu_register m, rate_register r, hotel_register h WHERE r.menu_id=m.id and r.hotel_id=h.id AND h.id=$hotelId";
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
				$tmp[$i]['type'] = $row['type'];
				$tmp[$i]['rate'] = $row['rate'];
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

	if($action == "menuType"){

	$sql = "select * from menu_type_register";
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


if($action=='addMenu'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		
		$mname = $data->mname;
		$mtypeid = $data->mtypeid;
		$userid = $data->userid;

		 $addMenu="INSERT INTO  menu_register(name,menu_type_id,created_by,modified_by)VALUES('$mname','$mtypeid','$userid','$userid')";

		 $result=$conn->query($addMenu);
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

	//get menu list
if($action == "menuList"){

	$sql = "SELECT m.id, m.name,m.deleted_by,mt.name AS type_name  FROM menu_register m,menu_type_register mt WHERE m.menu_type_id= mt.id ";
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
			$tmp[$i]['mtype'] = $row['type_name'];
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

if($action=='toggleMenu'){
	if($_SERVER['REQUEST_METHOD']=='POST'){

		$data = json_decode(file_get_contents("php://input"));
		$data1=array();

		$mid = $data->mid;
		$action = $data->action;
		$userid = $data->userid;
		
 
		 if($action === 'activate'){
		 
		 	$toggleMenu="Update menu_register set modified_by='$userid' , modified_on=CURDATE(),deleted_by=null,deleted_on=null where id= $mid";
		}
		 if($action === 'deactivate'){
		 
			$toggleMenu="Update menu_register set  modified_by='$userid' , modified_on=CURDATE(),deleted_by='$userid' ,deleted_on= CURDATE() where  id= $mid";
			 
		}	

		 $result=$conn->query($toggleMenu);
		 	 
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