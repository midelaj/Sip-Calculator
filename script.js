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
			recalculate(i, row, resultTable);
		});

		initialBalance = result;
	}

	function recalculate(index, newRow, table) {
		const currentRow = newRow;
		const currentIndex = index;
		const currentTable = table;
		console.log({ index: currentIndex, currentRow: newRow });
		const previousBalance = newRow.querySelector("td:nth-child(3)");
		initialBalance = parseFloat(previousBalance.textContent);

		const newInterest = newRow.querySelector("td:nth-child(4)");
		interestPercentage = parseFloat(newInterest.textContent / 100);

		profit = parseFloat(initialBalance * interestPercentage);
		result = parseFloat(initialBalance + profit);

		interestGain = 100 * (profit / startingBalance);
		currentRow.querySelector("td:nth-child(7)").textContent = result.toFixed(2);
		currentRow.querySelector("td:nth-child(6)").textContent = profit.toFixed(2);
		currentRow.querySelector("td:nth-child(5)").textContent =
			interestGain.toFixed(2);

		initialBalance = parseFloat(result.toFixed(2));
		for (let i = currentIndex; i < periods; i++) {
			const row = currentTable.rows[i];
			interestPercentage = parseFloat(row.cells[3].textContent / 100);
			profit = parseFloat(initialBalance * interestPercentage);
			result = parseFloat(initialBalance + profit);
			interestGain = 100 * (profit / startingBalance);

			row.cells[2].textContent = initialBalance.toFixed(2);
			row.cells[5].textContent = profit.toFixed(2);
			row.cells[4].textContent = interestGain.toFixed(2);
			row.cells[6].textContent = result.toFixed(2);

			console.log("row", row, {
				initialBalance: initialBalance,
				interest: interestPercentage,
				profit: profit,
				resutl: result,
			});
			initialBalance = result;
		}
	}
});

//hey
