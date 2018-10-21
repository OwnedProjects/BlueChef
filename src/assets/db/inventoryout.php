

<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


include 'conn.php';

$action = $_GET['action'];



if($action == "getStockProducts"){

	$sql = "SELECT p.id,p.name,p.deleted_by FROM stock_register s, product_register p WHERE s.product_id=p.id";
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
			$tmp[$i]['pname'] = $row['name'];

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

if($action == "checkQuantity"){

	$data = json_decode(file_get_contents("php://input"));

	$pid = $data->pid;

	$sql = "SELECT p.id,p.name,s.quantity FROM stock_register s, product_register p WHERE s.product_id=p.id and p.id='$pid'";
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
			$tmp[$i]['pname'] = $row['name'];
			$tmp[$i]['qty'] = $row['quantity'];
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


if($action == "removeInventory"){
	$data = json_decode(file_get_contents("php://input"));


	$date =  $data->date;
	$product_list = $data->outproducts;
	$userid = $data->userid;

	$rows= array();

	for($i=0; $i<count($product_list); $i++) {
		$qty= $product_list[$i]->qty;
		$prodid= $product_list[$i]->prodid;


		$sql = "INSERT INTO inventory_register(quantity,material_in_or_out,date,product_id,user_id)
		VALUES ('$qty','Out','$date','$prodid','$userid')";
		$result1 = $conn->query($sql);

		if ($result1){
			$sql = "SELECT * FROM stock_register WHERE product_id='$prodid'";
			$result = $conn->query($sql);
			 
			while($row = $result->fetch_array())
			{
				$sqty= $row['quantity'];

				$newqty= $sqty - $qty;

				$sql = "UPDATE stock_register SET  quantity='$newqty' WHERE product_id ='$prodid'";	
				$result2=$conn->query($sql);


			}

		}
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