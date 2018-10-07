<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

	//hotel.php?action=userHotel

    include 'conn.php';

	$action = $_GET['action'];
	
	if($action == "userHotel"){
		$udata = json_decode(file_get_contents("php://input"));
		$uid = $udata->userid;
		
		$rows= array();
		$sql = "SELECT u.user_name,h.id,h.address,h.contact_person,h.contact_number FROM `user_register` u, `hotel_register` h WHERE u.id = h.user_id and h.user_id = $uid";
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
				$tmp[$i]['user_name'] = $row['user_name'];
				$tmp[$i]['address'] = $row['address'];
				$tmp[$i]['contact_person'] = $row['contact_person'];
				$tmp[$i]['contact_number'] = $row['contact_number'];
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