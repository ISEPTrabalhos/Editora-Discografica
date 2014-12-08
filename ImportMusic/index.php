<?php
	require_once("DAL.php");
	
	$statement = $db->prepare("SELECT * FROM Sale JOIN SaleDetails ON Sale.ID = SaleDetails.SaleID");
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
			<th>Album</th>
			<th>Quantity</th>
			<th>Type</th>
			<th>Price</th>
		</tr>
		<?php foreach ($row as $elem) : ?>
				<tr>
					<td><?php echo $elem['Album']; ?></td>
					<td><?php echo $elem['Quantity']; ?></td>
					<td><?php echo $elem['Type']; ?></td>
					<td><?php echo $elem['Price']; ?></td>
				</tr>
		<?php endforeach; ?>
	</table>
</body>
</html>