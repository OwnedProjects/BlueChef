<?php
header('Access-Control-Allow-Origin: *');
	//loginDB.php?action=checkLogin&usernm=admin&passwd=admin

    include 'conn.php';
    //$conn = new mysqli("localhost", "root", "", "bluechef");

	$action = $_GET['action'];
	
	if($action == "checkLogin"){
		$unm = $_GET["usernm"];
		$pwd = md5($_GET["passwd"]);
		
		$sql = "select * from `user_register` where user_name='$unm' and password='$pwd'";
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
				// $tmp[$i]['role_id'] = $row['role_id'];
				$tmp[$i]['user_name'] = $row['user_name'];
				$tmp[$i]['first_name'] = $row['first_name'];
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