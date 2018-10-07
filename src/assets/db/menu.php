<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

//menu.php?action=allMenus

    include 'conn.php';

	$action = $_GET['action'];
	
	if($action == "allMenus"){
		$udata = json_decode(file_get_contents("php://input"));
		$hid = $udata->hid;

		$rows= array();
		$sql = "SELECT m.`id`, m.`name`, m.`menu_type_id`, r.`rate` FROM `menu_register` m, `rate_register` r, `hotel_register` h WHERE r.menu_id=m.id and r.hotel_id=h.id and h.id=$hid";
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
				$tmp[$i]['type'] = $row['menu_type_id'];
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
?>