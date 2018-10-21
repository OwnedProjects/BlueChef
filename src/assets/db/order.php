<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//order.php?action=placeOrder

    include 'conn.php';

	$action = $_GET['action'];
	
	if($action == "placeOrder"){
		$data = json_decode(file_get_contents("php://input"));
		
		$orderDate = $data->orderDate;
		$hotelId = $data->hotelId;
		$dtpDelDate = $data->dtpDelDate;
		$delAddress = $data->delAddress;
		$contactNo = $data->contactNo;
		$remarks = $data->remarks;
        $orderTakenBy = $data->orderTakenBy;
        $orderMenu = $data->orderMenu;
        
		$rows= array();
		if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `order_register`(`order_date`, `delivery_date`, `order_by`, `contact_number`, `order_status`, `remarks`, `delivery_status`, `hotel_id`) VALUES ('$orderDate', '$dtpDelDate','$orderTakenBy','$contactNo','open','$remarks','open','$hotelId')";
		$result = $conn->query($sql);
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
			mysqli_query($conn, $sqlins);
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
		$sql = "SELECT * FROM `order_register` WHERE `hotel_id`=$hotelId and `order_status`='open' ORDER BY `order_date` DESC";
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
		SELECT o.id, h.name, o.delivery_date FROM `order_register` o, `hotel_register` h WHERE o.`hotel_id`=h.id and `order_status`='open' ORDER BY `delivery_date` DESC";
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

	if($action == "getAllPendingOrders"){
		$sql = "
		SELECT o.id, h.name, o.delivery_date FROM `order_register` o, `hotel_register` h WHERE o.`hotel_id`=h.id and `order_status`='approved' ORDER BY `delivery_date` DESC";
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
		//$sql = "SELECT * FROM `order_register` WHERE `hotel_id`=$hotelId and `order_status`='open' and `id`=$orderid";
		$sql = "SELECT o.`id`, o.`order_date`, o.`delivery_date`, o.`order_by`, o.`contact_number`, o.`hotel_id`, h.`name` FROM `order_register` o, `hotel_register` h WHERE o.`hotel_id`=$hotelId AND o.`order_status`='open' AND o.`id`=$orderid AND o.`hotel_id`=h.`id`";
		$result = $conn->query($sql);
		while($row = $result->fetch_array())
		{
			$rows[] = $row;
		}

		$tmp = array();
		$data = array();
		$i = 0;

		// Get Order details
		$rowsdets = array();
		$sqldet = "SELECT * FROM `order_details_register` o, `menu_register` m, `rate_register` r WHERE o.`order_id`=$orderid AND r.`hotel_id`=$hotelId AND o.`menu_id`=m.`id` AND r.`menu_id`=m.`id`";
		$resultdet = $conn->query($sqldet);
		while($rowdet = $resultdet->fetch_array())
		{
			$rowsdets[] = $rowdet;
		}

		$tmpdets = array();
		$datadets = array();
		$j = 0;

		if(count($rows)>0){
			foreach($rows as $row)
			{
				$tmp[$i]['id'] = $row['id'];
				$tmp[$i]['order_date'] = $row['order_date'];
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
				$tmp[$i]['order_by'] = $row['order_by'];
				$tmp[$i]['contact_number'] = $row['contact_number'];
				$tmp[$i]['hotel_id'] = $row['hotel_id'];
				$tmp[$i]['hotel_name'] = $row['name'];
				$i++;
			}
			foreach($rowsdets as $rowdet)
			{
				$tmpdets[$j]['name'] = $rowdet['name'];
				$tmpdets[$j]['quantity'] = $rowdet['quantity'];
				$tmpdets[$j]['rate'] = $rowdet['rate'];
				$j++;
			}

			$tmpOrderDet = array();
			$tmpOrderDet[0] = $tmp;
			$tmpOrderDet[1] = $tmpdets;
			$data["status"] = 200;
			$data["data"] = $tmpOrderDet;
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			header(' ', true, 204);
		}

		echo json_encode($data);
	}

	if($action == "getOpenOrderDetailsAdmin"){
		$orderid = $_GET["orderid"];
		$sql = "SELECT o.`id`, o.`order_date`, o.`delivery_date`, o.`order_by`, o.`contact_number`, o.`hotel_id`, h.`name` FROM `order_register` o, `hotel_register` h WHERE o.`order_status`='open' AND o.`id`=$orderid AND o.`hotel_id`=h.`id`";
		$result = $conn->query($sql);
		while($row = $result->fetch_array())
		{
			$rows[] = $row;
		}

		$tmp = array();
		$data = array();
		$i = 0;

		// Get Order details
		$rowsdets = array();
		$sqldet = "SELECT m.`name`, o.`quantity`, r.`rate` FROM `order_details_register` o, `menu_register` m, `rate_register` r WHERE o.`order_id`=$orderid AND  o.`menu_id`=m.`id` AND r.`menu_id`=m.`id`";
		$resultdet = $conn->query($sqldet);
		while($rowdet = $resultdet->fetch_array())
		{
			$rowsdets[] = $rowdet;
		}

		$tmpdets = array();
		$datadets = array();
		$j = 0;

		if(count($rows)>0){
			foreach($rows as $row)
			{
				$tmp[$i]['id'] = $row['id'];
				$tmp[$i]['order_date'] = $row['order_date'];
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
				$tmp[$i]['order_by'] = $row['order_by'];
				$tmp[$i]['contact_number'] = $row['contact_number'];
				$tmp[$i]['hotel_id'] = $row['hotel_id'];
				$tmp[$i]['hotel_name'] = $row['name'];
				$i++;
			}
			foreach($rowsdets as $rowdet)
			{
				$tmpdets[$j]['name'] = $rowdet['name'];
				$tmpdets[$j]['quantity'] = $rowdet['quantity'];
				$tmpdets[$j]['rate'] = $rowdet['rate'];
				$j++;
			}

			$tmpOrderDet = array();
			$tmpOrderDet[0] = $tmp;
			$tmpOrderDet[1] = $tmpdets;
			$data["status"] = 200;
			$data["data"] = $tmpOrderDet;
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			header(' ', true, 204);
		}

		echo json_encode($data);
	}

	if($action == "getApprovedOrderDetailsAdmin"){
		$orderid = $_GET["orderid"];
		$sql = "SELECT o.`id`, o.`order_date`, o.`delivery_date`, o.`order_by`, o.`contact_number`, o.`hotel_id`, h.`name` FROM `order_register` o, `hotel_register` h WHERE o.`order_status`='approved' AND o.`id`=$orderid AND o.`hotel_id`=h.`id`";
		$result = $conn->query($sql);
		while($row = $result->fetch_array())
		{
			$rows[] = $row;
		}

		$tmp = array();
		$data = array();
		$i = 0;

		// Get Order details
		$rowsdets = array();
		$sqldet = "SELECT * FROM `order_details_register` o, `menu_register` m, `rate_register` r WHERE o.`order_id`=$orderid AND  o.`menu_id`=m.`id` AND r.`menu_id`=m.`id`";
		$resultdet = $conn->query($sqldet);
		while($rowdet = $resultdet->fetch_array())
		{
			$rowsdets[] = $rowdet;
		}

		$tmpdets = array();
		$datadets = array();
		$j = 0;

		if(count($rows)>0){
			foreach($rows as $row)
			{
				$tmp[$i]['id'] = $row['id'];
				$tmp[$i]['order_date'] = $row['order_date'];
				$tmp[$i]['delivery_date'] = $row['delivery_date'];
				$tmp[$i]['order_by'] = $row['order_by'];
				$tmp[$i]['contact_number'] = $row['contact_number'];
				$tmp[$i]['hotel_id'] = $row['hotel_id'];
				$tmp[$i]['hotel_name'] = $row['name'];
				$i++;
			}
			foreach($rowsdets as $rowdet)
			{
				$tmpdets[$j]['name'] = $rowdet['name'];
				$tmpdets[$j]['quantity'] = $rowdet['quantity'];
				$tmpdets[$j]['rate'] = $rowdet['rate'];
				$j++;
			}

			$tmpOrderDet = array();
			$tmpOrderDet[0] = $tmp;
			$tmpOrderDet[1] = $tmpdets;
			$data["status"] = 200;
			$data["data"] = $tmpOrderDet;
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			header(' ', true, 204);
		}

		echo json_encode($data);
	}

	if($action == "approveOrder"){
		$ordId = $_GET["orderId"];
		$data = array();
		$sql = "UPDATE `order_register` SET `order_status`='approved' WHERE `id`=$ordId";
		$result = $conn->query($sql);
		
		if($result){
			$data["status"] = 200;
			$data["data"] = "success";
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			$data["data"] = "failed";
			header(' ', true, 204);
		}
		echo json_encode($data);
	}

	if($action == "rejectOrder"){
		$ordId = $_GET["orderId"];
		$data = array();
		$sql = "UPDATE `order_register` SET `order_status`='rejected' WHERE `id`=$ordId";
		$result = $conn->query($sql);
		
		if($result){
			$data["status"] = 200;
			$data["data"] = "success";
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			$data["data"] = "failed";
			header(' ', true, 204);
		}
		echo json_encode($data);
	}

	if($action == "out_for_delivery"){
		$ordId = $_GET["orderId"];
		$ordDt = $_GET["ordDate"];
		$delMode = $_GET["delMode"];
		$data = array();
		
		$sqlout = "UPDATE `order_register` SET `order_status`='deliveryout' WHERE `id`=$ordId";
		$resultout = $conn->query($sqlout);
		$result = false;
		if($resultout){
			$sql = "INSERT INTO `order_delivery_register`(`date`, `delivery_mode`, `order_id`) VALUES ('$ordDt','$delMode','$ordId')";
			$result = $conn->query($sql);
		}
		if($result){
			$data["status"] = 200;
			$data["data"] = "success";
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			$data["data"] = "failed";
			header(' ', true, 204);
		}
		echo json_encode($data);
	}

	if($action == "get_del_modes"){
		$sql = "SELECT DISTINCT(`delivery_mode`) FROM `order_delivery_register`";
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
				$tmp[$i]['delivery_mode'] = $row['delivery_mode'];
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

	if($action == "out_for_delivery_orders"){
		$sql = "
		SELECT o.id, h.name, o.delivery_date, h.`address`, h.`contact_person` FROM `order_register` o, `hotel_register` h WHERE o.`hotel_id`=h.id and `order_status`='deliveryout' ORDER BY `delivery_date` DESC";
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
				$tmp[$i]['address'] = $row['address'];
				$tmp[$i]['contact_person'] = $row['contact_person'];
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

	if($action == "orderDelivered"){
		$ordId = $_GET["orderId"];
		$acceptBy = $_GET["acceptBy"];
		$data = array();
		
		$sqlout = "UPDATE `order_register` SET `order_status`='delivered' WHERE `id`=$ordId";
		$resultout = $conn->query($sqlout);
		$result = false;
		if($resultout){
			$sql = "UPDATE `order_delivery_register` SET `accepted_by`='$acceptBy' WHERE `order_id`=$ordId";
			$result = $conn->query($sql);
		}
		if($result){
			$data["status"] = 200;
			$data["data"] = "success";
			header(' ', true, 200);
		}
		else{
			$data["status"] = 204;
			$data["data"] = "failed";
			header(' ', true, 204);
		}
		echo json_encode($data);
	}
?>