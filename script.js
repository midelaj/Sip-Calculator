document.getElementById("calculate").addEventListener("click", function() {
	const startingBalance = parseFloat(document.getElementById("starting").value);
	const periods = parseFloat(document.getElementById("periods").value);
	const interest = parseFloat(document.getElementById("interest").value);
	let interestPercentage =
		parseFloat(document.getElementById("interest").value) / 100;

	console.log(interestPercentage);

	let result;
	let totalProfit;
	let initialBalance = startingBalance;
	let profit;
	let interestGain;
	const resultTable = document.getElementById("resultTable");
	resultTable.innerHTML = "";

	for (let i = 1; i <= periods; i++) {
		result = initialBalance + initialBalance * interestPercentage;
		console.log(result);

		const row = document.createElement("tr");
		profit = result.toFixed(2) - startingBalance;
		interestGain = 100 * (profit / startingBalance);

		row.innerHTML = `
			<td>${i}</td>
			<td></td>
			<td class = "initialBalance">${initialBalance}</td>
			<td contenteditable ="true" class = "interest">${interest}</td>
			<td >${interestGain.toFixed(2)}</td>
			<td>${profit.toFixed(2)}</td>
			<td>${result}</td>
	`;
		resultTable.appendChild(row);

		const interestRow = row.querySelector(".interest");
		interestRow.addEventListener("input", function() {
			recalculate(row);
		});

		initialBalance = result;
	}

	function recalculate(newRow) {
		const currentRow = newRow;
		console.log("row", newRow);
		const previousBalance = newRow.querySelector("td:nth-child(3)");
		initialBalance = parseFloat(previousBalance.textContent);

		const newInterest = newRow.querySelector("td:nth-child(4)");
		interestPercentage = parseFloat(newInterest.textContent / 100);

		profit = parseFloat(initialBalance * interestPercentage);

		result = parseFloat(initialBalance + profit);

		interestGain = 100 * (profit / startingBalance);
		currentRow.querySelector("td:nth-child(7)").textContent = result;
		currentRow.querySelector("td:nth-child(6)").textContent = profit;
		currentRow.querySelector("td:nth-child(5)").textContent = interestGain;
	}
});

//hey
