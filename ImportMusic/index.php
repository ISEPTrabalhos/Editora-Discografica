<?php
	require_once("DAL.php");
	
	$statement = $db->prepare("SELECT * FROM OrderList JOIN OrderDetail ON OrderList.id = OrderDetail.orderid");
	$statement->execute();
	$row = $statement->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
	<title>ImportMusic</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<table border="0">
		<tr>
			<th>Name</th>
			<th>Quantity</th>
			<th>Total</th>
			<th>Date</th>
		</tr>
		<?php foreach ($row as $elem) : ?>
				<tr>
					<td><?php echo $elem['album']; ?></td>
					<td><?php echo $elem['quantity']; ?></td>
					<td><?php echo $elem['total']; ?></td>
					<td><?php echo $elem['date']; ?></td>
				</tr>
		<?php endforeach; ?>
	</table>
</body>
</html>