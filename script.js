const sipRadioButton = document.querySelector("input[name=toggleSip]");
const sip = document.getElementById("sip");

sipRadioButton.addEventListener("change", function() {
	if (this.checked) {
		sip.classList.add("show-sip");
	} else {
		sip.classList.remove("show-sip");
	}
});

document.getElementById("calculate").addEventListener("click", function() {
	const startingBalance = parseFloat(document.getElementById("starting").value);
	const periods = parseFloat(document.getElementById("periods").value);
	const interest = parseFloat(document.getElementById("interest").value);

	let sipAmount = 0;
	if (sipRadioButton.checked) {
		sipAmount = parseFloat(document.getElementById("sipAmount").value) || 0;
	}

	let interestPercentage =
		parseFloat(document.getElementById("interest").value) / 100;

	let result;
	let initialBalance = startingBalance;
	let profit;
	let interestGain;
	const resultTable = document.getElementById("resultTable");
	resultTable.innerHTML = "";
	for (let i = 1; i <= periods; i++) {
		if (i > 1) {
			initialBalance += sipAmount;
		}
		result = initialBalance + initialBalance * interestPercentage;

		const row = document.createElement("tr");
		profit = result.toFixed(2) - startingBalance;
		interestGain = 100 * (profit / startingBalance);

		row.innerHTML = `
			<td>${i}</td>
			<td contenteditable="true" class = "sip">${i > 1 ? sipAmount : 0}</td>
			<td class = "initialBalance">${initialBalance.toFixed(2)}</td>
			<td contenteditable ="true" class = "interest">${interest}</td>
			<td >${interestGain.toFixed(2)}</td>
			<td>${profit.toFixed(2)}</td>
			<td>${result.toFixed(2)}</td>
	`;
		resultTable.appendChild(row);

		const interestRow = row.querySelector(".interest");
		interestRow.addEventListener("input", function() {
			interestChange(i, row, resultTable);
		});
		const sipRow = row.querySelector(".sip");
		sipRow.addEventListener("input", function() {
			sipChange(i, row, resultTable);
		});

		initialBalance = result;
	}

	function sipChange(index, newRow, table) {
		const currentTable = table;
		const currentIndex = index;
		const newSipAmount = newRow.querySelector("td:nth-child(2)");
		sipAmount = parseFloat(newSipAmount.textContent);

		const previousRow = newRow.previousElementSibling;
		const previousBalance = previousRow.querySelector("td:nth-child(7)");
		initialBalance = parseFloat(previousBalance.textContent) + sipAmount;

		const interest = newRow.querySelector("td:nth-child(4)");
		interestPercentage = parseFloat(interest.textContent / 100);

		profit = parseFloat(initialBalance * interestPercentage);
		result = parseFloat(initialBalance + profit);

		interestGain = 100 * (profit / startingBalance);

		newRow.querySelector("td:nth-child(3)").textContent =
			initialBalance.toFixed(2);
		newRow.querySelector("td:nth-child(7)").textContent = result.toFixed(2);
		newRow.querySelector("td:nth-child(6)").textContent = profit.toFixed(2);
		newRow.querySelector("td:nth-child(5)").textContent =
			interestGain.toFixed(2);
		recaclulation(currentIndex, currentTable);
	}

	function interestChange(index, newRow, table) {
		const currentIndex = index;
		const currentTable = table;
		const previousBalance = newRow.querySelector("td:nth-child(3)");
		initialBalance = parseFloat(previousBalance.textContent) + sipAmount;

		const newInterest = newRow.querySelector("td:nth-child(4)");
		interestPercentage = parseFloat(newInterest.textContent / 100).toFixed(2);

		profit = parseFloat(initialBalance * interestPercentage);
		result = parseFloat(initialBalance + profit);

		interestGain = 100 * (profit / startingBalance);
		newRow.querySelector("td:nth-child(7)").textContent = result.toFixed(2);
		newRow.querySelector("td:nth-child(6)").textContent = profit.toFixed(2);
		newRow.querySelector("td:nth-child(5)").textContent =
			interestGain.toFixed(2);
		recaclulation(currentIndex, currentTable);
	}

	function recaclulation(currentIndex, currentTable) {
		initialBalance = parseFloat(result.toFixed(2)) + sipAmount;
		for (let i = currentIndex; i < periods; i++) {
			const row = currentTable.rows[i];
			interestPercentage = parseFloat(row.cells[3].textContent / 100).toFixed(
				2,
			);
			profit = parseFloat(initialBalance.toFixed(2) * interestPercentage);
			result = parseFloat(initialBalance + profit);
			interestGain = 100 * (profit / startingBalance);

			row.cells[2].textContent = initialBalance.toFixed(2);
			row.cells[5].textContent = profit.toFixed(2);
			row.cells[4].textContent = interestGain.toFixed(2);
			row.cells[6].textContent = result.toFixed(2);

			initialBalance = result;
		}
	}
});

function finalSummery(netSip, netAmount, netProfit, netPercentageReturn) {
	document.getElementById(
		"netSipAmount",
	).textContent = `NET SIP AMOUNT: ${netSip}`;
	document.getElementById(
		"netAmount",
	).textContent = `TOTAL NET AMOUNT:${netAmount}`;
	document.getElementById(
		"netProfit",
	).textContent = `NET PROFIT : ${netProfit}`;
	document.getElementById(
		"netPercentage",
	).textContent = `NET PERCENTAGE :${netPercentageReturn}`;
}

//hey
