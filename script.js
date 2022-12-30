// function calculate() {
//   fetch('items.json', {
//     method: 'POST',
//     headers: {
//       'Content-Type: application/json'
//     }
//   });
// }

const currencyEl_one = document.getElementById('currency_one');
const amountEl_one = document.getElementById('amount_one');
const currencyEl_two = document.getElementById('currency_two');
const amountEl_two = document.getElementById('amount_two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  // console.log("RAN");
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // console.log(currency_one, currency_two);
  fetch(`https://v6.exchangerate-api.com/v6/b1ae34883d179b2380487e92/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.conversion_rates[currency_two]; // Special syntax for accessing properties of objects
      // console.log(rate);
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
