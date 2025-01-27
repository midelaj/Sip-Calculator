document.getElementById("calculate").addEventListener("click", function() {
	const startingBalance = parseFloat(document.getElementById("starting").value);
	const periods = parseFloat(document.getElementById("periods").value);
	const interest = parseFloat(document.getElementById("interest").value);
	const interestPercentage =
		parseFloat(document.getElementById("interest").value) / 100;

	let result;
	let totalProfit;
	let initailBalance = startingBalance;
	let profit;
	for (let i = 1; i <= periods; i++) {
		result = initailBalance + initailBalance * interestPercentage;
		console.log(result);

		const row = document.createElement("tr");
		profit = result.toFixed(2) - startingBalance;
		let interestGain = 100 * (profit / startingBalance);

		row.innerHTML = `
			<td>${i}</td>
			<td></td>
			<td>${initailBalance}</td>
			<td>${interestGain.toFixed(2)}</td>
			<td>${profit.toFixed(2)}</td>
			<td>${result}</td>
	`;
		document.getElementById("resultTable").appendChild(row);
		initailBalance = result;
	}

	const netPercentage = (100 * profit) / startingBalance;
	console.log(netPercentage);
	document.getElementById(
		"netAmount",
	).textContent = `Total Net Amount ${result}`;
	document.getElementById(
		"totalProfit",
	).textContent = `Total Profit ${profit.toFixed(2)}`;

	document.getElementById(
		"netPercentage",
	).textContent = `Net Percentage Return :${netPercentage}`;
});
