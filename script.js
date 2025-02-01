const sipRadioButton = document.querySelector("input[name=toggleSip]");
const sip = document.getElementById("sip");

sipRadioButton.addEventListener("change", function () {
	if (this.checked) {
		sip.classList.add("show-sip");
	} else {
		sip.classList.remove("show-sip");
	}
});

document.getElementById("calculate").addEventListener("click", function () {
	const startingBalance = parseFloat(
		document.getElementById("starting").value,
	);
	const periods = parseFloat(document.getElementById("periods").value);
	const interest = parseFloat(document.getElementById("interest").value);

	let sipAmount = 0;
	if (sipRadioButton.checked) {
		sipAmount = parseFloat(document.getElementById("sipAmount").value) ||
			0;
	}
	let totalSip = 0;
	totalSip = sipAmount * periods;

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
		result = parseFloat(
			initialBalance + initialBalance * interestPercentage,
		);

		const row = document.createElement("tr");
		profit = result.toFixed(2) - startingBalance;
		interestGain = 100 * (profit / startingBalance);

		row.innerHTML = `
			<td>${i}</td>
			<td contenteditable="true" class = "sip">${
			i > 1 ? sipAmount : 0
		}</td>
			<td class = "initialBalance">${initialBalance.toFixed(2)}</td>
			<td contenteditable ="true" class = "interest">${interest}</td>
			<td >${interestGain.toFixed(2)}</td>
			<td>${profit.toFixed(2)}</td>
			<td>${result.toFixed(2)}</td>
	`;
		resultTable.appendChild(row);

		const interestRow = row.querySelector(".interest");
		interestRow.addEventListener("input", function () {
			interestChange(i, row, resultTable);
		});
		const sipRow = row.querySelector(".sip");
		sipRow.addEventListener("input", function () {
			sipChange(i, row, resultTable);
		});

		initialBalance = result;
		if (i === periods) {
			finalSummery(result, profit, interestGain);
		}
	}

	//This for the sip change
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

		newRow.querySelector("td:nth-child(3)").textContent = initialBalance
			.toFixed(2);
		newRow.querySelector("td:nth-child(7)").textContent = result.toFixed(
			2,
		);
		newRow.querySelector("td:nth-child(6)").textContent = profit.toFixed(
			2,
		);
		newRow.querySelector("td:nth-child(5)").textContent = interestGain
			.toFixed(2);
		sumOfSip();
		const nextRow = newRow.nextElementSibling;
		const nextRowSip = nextRow.querySelector("td:nth-child(2)");
		sipAmount = parseFloat(nextRowSip.textContent);
		recalculation(currentIndex, currentTable, sipAmount);
		finalSummery(result, profit, interestGain);
	}

	//This for the interest change:
	function interestChange(index, newRow, table) {
		const currentIndex = index;
		const currentTable = table;
		const newSipAmount = newRow.querySelector("td:nth-child(2)");
		sipAmount = parseFloat(newSipAmount.textContent);

		const previousBalance = newRow.querySelector("td:nth-child(3)");
		initialBalance = parseFloat(previousBalance.textContent);
		console.log("sipAmpount:", sipAmount);
		const newInterest = newRow.querySelector("td:nth-child(4)");
		interestPercentage = parseFloat(newInterest.textContent / 100)
			.toFixed(2);
		console.log("interest Percentage:", interestPercentage);

		profit = parseFloat(initialBalance * interestPercentage);
		console.log("initialBalance:", initialBalance);
		result = parseFloat(initialBalance + profit);
		console.log("result", result);

		interestGain = 100 * (profit / startingBalance);
		newRow.querySelector("td:nth-child(7)").textContent = result.toFixed(
			2,
		);
		newRow.querySelector("td:nth-child(6)").textContent = profit.toFixed(
			2,
		);
		newRow.querySelector("td:nth-child(5)").textContent = interestGain
			.toFixed(2);

		sumOfSip();
		const nextRow = newRow.nextElementSibling;
		const nextSipElement = nextRow.querySelector("td:nth-child(2)");
		sipAmount = parseFloat(nextSipElement.textContent);

		recalculation(currentIndex, currentTable, sipAmount);
		finalSummery(result, profit, interestGain);
	}

	//This will calculate output corresponding to the changes
	function recalculation(currentIndex, currentTable, currentSip) {
		if (currentIndex === 1) {
			const index = currentTable.rows[currentIndex];

			sipAmount = parseFloat(index.cells[1].textContent);
		}
		sipAmount = currentSip;
		initialBalance = parseFloat(result + sipAmount);
		for (let i = currentIndex; i < periods; i++) {
			const row = currentTable.rows[i];
			interestPercentage = parseFloat(row.cells[3].textContent / 100);

			sipAmount = parseFloat(row.cells[1].textContent);
			profit = parseFloat(initialBalance * interestPercentage);
			result = parseFloat(initialBalance + profit);
			interestGain = 100 * (profit / startingBalance);

			row.cells[2].textContent = initialBalance.toFixed(2);
			row.cells[5].textContent = profit.toFixed(2);
			row.cells[4].textContent = interestGain.toFixed(2);
			row.cells[6].textContent = result.toFixed(2);

			initialBalance = result + sipAmount;

			if (i === periods) {
				finalSummery(parseFloat(result), profit, interestGain);
			}
		}
		sumOfSip();
	}
});

function sumOfSip() {
	// Select all SIP amount cells from the second column (excluding header)
	const sipCells = document.querySelectorAll("table tr td:nth-child(2)");
	const startingBalance = parseFloat(
		document.getElementById("starting").value,
	);

	// Convert NodeList to an array, extract numbers, and sum them
	const totalSIP = Array.from(sipCells)
		.map((td) => parseFloat(td.textContent.replace(/,/g, "")) || 0) // Convert text to number
		.reduce((sum, amount) => sum + amount, 0) + startingBalance; // Sum all values

	console.log("Total SIP Amount:", totalSIP);
	return totalSIP;
}
function finalSummery(netAmount, netProfit, netPercentageReturn) {
	const netSip = sumOfSip();
	const totalProfit = netAmount - netSip;
	const netProfitPercentage = (totalProfit / netSip) * 100;
	document.getElementById(
		"netSipAmount",
	).textContent = `NET SIP AMOUNT: ${netSip.toFixed(2)}`;
	document.getElementById(
		"netAmount",
	).textContent = `TOTAL NET AMOUNT:${parseFloat(netAmount).toFixed(2)}`;
	document.getElementById(
		"netProfit",
	).textContent = `NET PROFIT : ${totalProfit.toFixed(2)}`;
	document.getElementById(
		"netPercentage",
	).textContent = `NET PERCENTAGE :${netProfitPercentage.toFixed(2)}%`;
}
