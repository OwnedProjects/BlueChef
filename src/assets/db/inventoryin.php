<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


include 'conn.php';

$action = $_GET['action'];

if($action == "addInventory"){
	$data = json_decode(file_get_contents("php://input"));

	$suppid = $data->suppid;
	$date =  $data->date;
	$billno = $data->billno;
	$product_list = $data->product_list;
	$total = $data->total;
	$userid = $data->userid;


	$rows= array();
		 //changed the date to null in db was giving error 
		/* $sql = "INSERT INTO supplier_bill_register(bill_number, bill_amount, bill_date,bill_status', 'supplier_id') VALUES ('$billno', '$total',
		'$date','Pending','$suppid')";*/
		$sql = "INSERT INTO supplier_bill_register(bill_number,bill_amount,bill_status,supplier_id) VALUES ('$billno', '$total',
		'Pending','$suppid')";
		$result = $conn->query($sql);
		$billId = $conn->insert_id; 


		for($i=0; $i<count($product_list); $i++) {
			$qty= $product_list[$i]->qty;
			$prodid= $product_list[$i]->prodid;
			$rate= $product_list[$i]->rate;
			$prodid= $product_list[$i]->prodid;
		 
			$sql = "INSERT INTO inventory_register(quantity,rate,material_in_or_out,date,product_id,supplier_id,supplier_bill_id,user_id)
			VALUES ('$qty','$rate','In','$date','$prodid','$suppid','$billId','$userid')";
			$result1 = $conn->query($sql);

			if ($result1){
				$sql = "SELECT * FROM stock_register WHERE product_id='$prodid'";
				$result = $conn->query($sql);
				while($row = $result->fetch_array())
				{
					$sqty= $row['quantity'];

					$newqty= $sqty + $qty;
					
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