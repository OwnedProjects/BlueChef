<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//SELECT * FROM `bill_register` WHERE `order_id`=28 ORDER BY `order_id` DESC LIMIT 1;
    include 'conn.php';

$action = $_GET['action'];

if($action=='addBill'){
	if($_SERVER['REQUEST_METHOD']=='POST'){
		$data = json_decode(file_get_contents("php://input"));
		$data1=array();
		
		$orderDate = $data->orderDate;
		$amount = $data->amount;
		$oId = $data->oId;

		$addBill="INSERT INTO `bill_register`(`status`, `amount`, `date`, `order_id`) VALUES ('pending',$amount,'$orderDate',$oId)";
		$result=$conn->query($addBill);
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

if($action=='getBillDetails'){
	$oId = $_GET["orderId"];
	$data1=array();

	$sql = "SELECT b.id,b.date, o.order_date,o.delivery_date,o.order_by,h.contact_number,h.name FROM `bill_register` b, `order_register` o, `hotel_register` h WHERE b.`order_id`=$oId AND o.id=b.`order_id` AND o.`hotel_id`=h.`id` ORDER BY `order_id` DESC LIMIT 1";
	$result = $conn->query($sql);
	$row = $result->fetch_array();
	$billID = $row["id"];
	$billDate = $row["date"];
	$orderDate = $row["order_date"];
	$delDate = $row["delivery_date"];
	$orderBy = $row["order_by"];
	$contNo = $row["contact_number"];
	$hotelName = $row["name"];

	if($result){
		$data1["status"] = 200;
		$data1["billID"] = $billID;
		$data1["orderDate"] = $orderDate;
		$data1["delDate"] = $delDate;
		$data1["orderBy"] = $orderBy;
		$data1["contNo"] = $contNo;
		$data1["hotelNm"] = $hotelName;
		$data1["billDate"] = $billDate;
		header(' ', true, 200);
	}
	else{
		$data1["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data1);
}

if($action == "getAllBills"){
	$sql = "SELECT * FROM `bill_register` where `status`='pending' OR `status`='partial'";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$rowsAcc = array();
	if($result){
		$sqlAcc = "SELECT a.`id`,a.`bill_date`,a.`amount`,a.`payment_mode`,a.`received_by`,a.`remarks`,a.`bill_id` FROM `account_register` a, `bill_register` b WHERE a.`bill_id`=b.`id` AND (b.`status`='pending' OR b.`status`='partial')";
		$resultAcc = $conn->query($sqlAcc);
		while($rowAcc = $resultAcc->fetch_array())
		{
			$rowsAcc[] = $rowAcc;
		}
	}

	$tmp = array();
	$tmpAcc = array();
	$data = array();
	$i = 0;
	$j = 0;
	
	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['id'] = $row['id'];
			$tmp[$i]['order_id'] = $row['order_id'];
			$tmp[$i]['date'] = $row['date'];
			$tmp[$i]['amount'] = $row['amount'];
			$i++;
		}
		foreach($rowsAcc as $rowAcc)
		{
			$tmpAcc[$j]['id'] = $rowAcc['id'];
			$tmpAcc[$j]['bill_date'] = $rowAcc['bill_date'];
			$tmpAcc[$j]['amount'] = $rowAcc['amount'];
			$tmpAcc[$j]['payment_mode'] = $rowAcc['payment_mode'];
			$tmpAcc[$j]['received_by'] = $rowAcc['received_by'];
			$tmpAcc[$j]['remarks'] = $rowAcc['remarks'];
			$tmpAcc[$j]['bill_id'] = $rowAcc['bill_id'];
			$j++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		$data["dataAcc"] = $tmpAcc;
		header(' ', true, 200);
	}
	else{
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

if($action == "get_allpay_methods"){
	$sql = "SELECT DISTINCT(`payment_mode`) FROM `account_register`";
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
			$tmp[$i]['payment_mode'] = $row['payment_mode'];
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

if($action == "settleCompleteBill"){
	$billId = $_GET["billId"];
	$billAmt = $_GET["billAmt"];
	$payMode = $_GET["payMode"];
	$billDt = $_GET["billDt"];
	$receivedBy = $_GET["receivedBy"];
	$remarks = $_GET["remarks"];
	$data = array();
	
	$sqlout = "INSERT INTO `account_register`(`type`, `bill_date`, `amount`, `payment_mode`, `bill_id`, `received_by`, `remarks`) VALUES ('In','$billDt',$billAmt,'$payMode',$billId, '$receivedBy', '$remarks')";
	$resultout = $conn->query($sqlout);
	$result = false;
	if($resultout){
		$sql = "UPDATE `bill_register` SET `status`='settled' WHERE `id`=$billId";
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
if($action == "settlePartialBill"){
	$billId = $_GET["billId"];
	$billAmt = $_GET["billAmt"];
	$payMode = $_GET["payMode"];
	$billDt = $_GET["billDt"];
	$receivedBy = $_GET["receivedBy"];
	$remarks = $_GET["remarks"];
	$data = array();
	
	$sqlout = "INSERT INTO `account_register`(`type`, `bill_date`, `amount`, `payment_mode`, `bill_id`, `received_by`, `remarks`) VALUES ('In','$billDt',$billAmt,'$payMode',$billId, '$receivedBy', '$remarks')";
	$resultout = $conn->query($sqlout);
	$result = false;
	if($resultout){
		$sql = "UPDATE `bill_register` SET `status`='partial' WHERE `id`=$billId";
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