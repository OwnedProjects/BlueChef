<?php
	//ini_set('error_reporting', E_STRICT);
	 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    include 'conn.php';
    //$conn = new mysqli("localhost", "root", "", "bluechef");

	$action = $_GET['action'];
	
	if($action=='addUser'){
		if($_SERVER['REQUEST_METHOD']=='POST'){
	
		$data = json_decode(file_get_contents("php://input"));
		$data1=array();
	
		 $fname = $data->fname;
		 $lname = $data->lname;
		 $uname = $data->uname;
		 $passwd = md5($data->passwd);
		 $cont = $data->cont;
		 $roleid = $data->roleid;
		$userid = $data->userid;

		$adduser="INSERT INTO user_register(first_name,last_name,user_name,password,contact_number,role_id,created_by,modified_by)VALUES('$fname','$lname','$uname','$passwd','$cont','$roleid','$userid','$userid')";
			
		 $result=$conn->query($adduser);

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
	//get role
		if($action == "getRoles"){
		
		$sql = "select * from user_role_register where id != '1'";
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
				$tmp[$i]['type'] = $row['type'];
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