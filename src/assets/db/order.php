<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

//order.php?action=placeOrder

    include 'conn.php';

	$action = $_GET['action'];
	
	if($action == "placeOrder"){
		//print_r($_SERVER);
		//exit;
		$data = json_decode(file_get_contents("php://input"));
		
		$orderDate = $data->orderDate;
		$hotelId = $data->hotelId;
		$dtpDelDate = $data->dtpDelDate;
		$delAddress = $data->delAddress;
		$contactNo = $data->contactNo;
		$remarks = $data->remarks;
        $orderTakenBy = $data->orderTakenBy;
        $orderMenu = $data->orderMenu;
        
		//$rows= array();
		//echo("query insert");
		if($_SERVER['REQUEST_METHOD'] == 'POST') {
			$sql = "INSERT INTO `order_register`(`order_date`, `delivery_date`, `order_by`, `contact_number`, `order_status`, `remarks`, `delivery_status`, `hotel_id`) VALUES ('$orderDate', '$dtpDelDate','$orderTakenBy','$contactNo','open','$remarks','open','$hotelId')";
			$result = $conn->query($sql);
			//print_r($conn);
			$orderID = $conn->insert_id;
		}
		
		//$sql1 = "SELECT MAX(`id`) FROM `order_register` WHERE `hotel_id`=$hotelId";
		//$result1 = $conn->query($sql1);
		//$row = $result1->fetch_array();
		//$orderID = $row["MAX(`id`)"];
		
		//$i=0;
		// $rows = json_encode($orderMenu);
		//echo json_encode($orderMenu[$i]->menuid)."-".json_encode($orderMenu[$i]->qty);
		//echo count($orderMenu);
		//exit;

		for($i=0; $i<count($orderMenu); $i++) {
			$qty= $orderMenu[$i]->qty;
			$menuid= $orderMenu[$i]->menuid;
			$sqlins = "INSERT INTO `order_details_register`(`quantity`, `order_id`, `menu_id`) VALUES ('".$qty."',".$orderID.",".$menuid.")";
			//echo "<br>AFTER 2nd INSERT ===>";
			//print_r($conn);
			$result1 = $conn->query($sqlins);
			//echo "<br>AFTER 2nd CONN ===>";
			//print_r($conn);
			//exit;
			//mysqli_query($conn, $sqlins);
		}

		if($result){
			$data1["status"] = 200;
			$data1["data"] = $orderID;
			header(' ', true, 200);
		}
		else{
			$data1["status"] = 204;
			header(' ', true, 204);
		}
		echo json_encode($data1);
	}

	if($action == "getAllOpenOrdersOfHotel"){
		$hotelId = $_GET["hotelid"];
		$sql = "SELECT * FROM `order_register` WHERE `hotel_id`=$hotelId and `order_status`='open' ORDER BY `order_date` LIMIT 5";
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
				$tmp[$i]['order_date'] = $row['order_date'];
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
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

	if($action == "getAllOpenOrders"){
		$sql = "
		SELECT h.id, h.name, o.delivery_date FROM `order_register` o, `hotel_register` h WHERE o.`hotel_id`=h.id and `order_status`='open' ORDER BY `order_date` LIMIT 5";
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
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
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

	if($action == "getOrderDetails"){
		$orderid = $_GET["orderid"];
		$hotelId = $_GET["hotelid"];
		$sql = "SELECT * FROM `order_register` WHERE `hotel_id`=$hotelId and `order_status`='open' and `id`=$orderid";
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
				$tmp[$i]['order_date'] = $row['order_date'];
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
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