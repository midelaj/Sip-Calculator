document.getElementById("calculate").addEventListener("click", function() {
	const startingBalance = parseFloat(document.getElementById("starting").value);
	const periods = parseFloat(document.getElementById("periods").value);
	const interestPercentage =
		parseFloat(document.getElementById("interest").value) / 100;

	let result;
	for (let i = 1; i <= periods; i++) {
		result = startingBalance * Math.pow(1 + interestPercentage, i);
		console.log(result);

		const resultElement = document.createElement("p");
		resultElement.textContent = `periods ${i}: $${result.toFixed(
			2,
		)}, Initial Balance ${startingBalance}, Total profit ${result.toFixed(2) - startingBalance.toFixed(2)
			}`;
		document.getElementById("result").appendChild(resultElement);
	}
});
