{
	'use strict';

	// ¯\_(ツ)_/¯
	const $ = document.querySelector.bind(document);
	const API = 'http://specie.dev';

	/**
	 * Exchanges ZAR to a foreign currency
	 *
	 * @param Event e
	 * @return null
	 */
	function exchangeLocalCurrency(e) {
		let amount = $('input[name="localAmount"]').value;
		const currency = $('select[name="localCurrency"]').value;		

		fetch(API + '/exchange', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, currency })}).then((response) => {
			response.json().then((result) => {
				showOrderConfirmation(result.order);
			});
		});
		
	}

	/**
	 * Exchanges foreign currency
	 *
	 * @param Event e
	 * @return null
	 */
	function exchangeForeignCurrency(e) {
		let amount = $('input[name="foreignAmount"]').value;
		const currency = $('select[name="foreignCurrency"]').value;		

		amount = amount / exchangeRates[currency.toUpperCase()];

		fetch(API + '/exchange', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, currency })}).then((response) => {
			response.json().then((result) => {
				showOrderConfirmation(result.order);
			});
		});
		
	}

	/**
	 * Returns to the purchase page
	 *
	 * @param Event e
	 * @return null
	 */
	function goBack(e) {
		$('.select-page').style.display = '';
		$('.confirm-page').style.display = 'none';
	}

	/**
	 * Shows an populates the order confirmation page
	 *
	 * @param Object e
	 * @return null
	 */
	function showOrderConfirmation(order) {
		$('.summary-body').innerHTML = '';

		for (let item in order) {
			$('.summary-body').innerHTML += '<tr>\
				<td>' + item.replace('_', ' ').toUpperCase() + '</td>\
				<td>' + order[item] + '</td>\
				</tr>';
		}

		$('.select-page').style.display = 'none';
		$('.confirm-page').style.display = '';
		$('.confirm-page').classList = 'confirm-page row';

		$('input[name="foreignAmount"]').value = '';
		$('input[name="localAmount"]').value = '';
		$('select[name="foreignCurrency"]').value = 'usd';
		$('select[name="localCurrency"]').value = 'usd';
	}

	/**
	 * Utility to bind click handler based on class
	 *
	 * @param String selector
	 * @param Function handler
	 * @return null
	 */
	function click(selector, handler) {
		document.querySelector(selector).addEventListener('click', handler);
	}

	let exchangeRates = {
		USD: 0,
		GBP: 0,
		EUR: 0,
		KES: 0,
	};

	fetch(API + '/currency').then((response) => {
		response.json().then((result) => {
			exchangeRates = result.rates;	

			click('.localButton', exchangeLocalCurrency);
			click('.foreignButton', exchangeForeignCurrency);
			click('.goBack', goBack);
		});
	});

}
