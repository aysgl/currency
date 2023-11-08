const amount = document.querySelector(".amount > input")
const result = document.querySelector(".result > input")
const firstSelect = document.querySelector(".first-select")
const secondSelect = document.querySelector(".second-select")
const graphic = document.querySelector(".graphic")

let countryFlags = {
    "AUD": "🇳🇦",
    "BGN": "🇧🇬",
    "BRL": "🇧🇷",
    "CAD": "🇳🇨",
    "CHF": "🇳🇨",
    "CNY": "🇳🇨",
    "CZK": "🇳🇨",
    "DKK": "🇩🇰",
    "EUR": "🇳🇪",
    "GBP": "🇳🇬",
    "HKD": "🇭🇰",
    "HRK": "🇭🇷",
    "HUF": "🇭🇺",
    "IDR": "🇮🇩",
    "ILS": "🇮🇱",
    "INR": "🇮🇳",
    "ISK": "🇮🇸",
    "JPY": "🇯🇵",
    "KRW": "🇰🇷",
    "MXN": "🇲🇽",
    "MYR": "🇲🇾",
    "NOK": "🇳🇴",
    "NZD": "🇳🇿",
    "PHP": "🇵🇭",
    "PLN": "🇵🇱",
    "RON": "🇷🇴",
    "RUB": "🇷🇺",
    "SEK": "🇸🇪",
    "SGD": "🇸🇬",
    "THB": "🇹🇭",
    "TRY": "🇹🇷",
    "USD": "🇺🇸",
    "ZAR": "🇿🇦",
};

async function exchange(amount, firstSelect, secondSelect) {
    const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7u9PkMT9kGqtIjTbAyoA41eOgPz9IwzTe3jFafHl&base_currency${firstSelect}`)
    const result = await res.json()
    const exchangeResult = amount * result.data[secondSelect];
    return exchangeResult;
}

async function graphics(firstSelect) {
    const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7u9PkMT9kGqtIjTbAyoA41eOgPz9IwzTe3jFafHl&base_currency${firstSelect}`)
    const result = await res.json()
    const x = result.data.TRY;
    return x;
}

async function country() {
    const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7u9PkMT9kGqtIjTbAyoA41eOgPz9IwzTe3jFafHl&base_currency`)
    const result = await res.json()
    const x = result.data;
    const y = Object.keys(result.data)
    return y;
}

firstSelect.addEventListener("change", () => {
    updateExchangeRate();
});

secondSelect.addEventListener("change", () => {
    updateExchangeRate();
});

const updateExchangeRate = () => {
    const amountValue = Number(amount.value.trim());
    const firstSelectValue = firstSelect.value
    const secondSelectValue = secondSelect.value

    exchange(amountValue, firstSelectValue, secondSelectValue)
        .then((res) => {
            graphic.innerText = res.toFixed(3);
            result.value = res.toFixed(3);
        });
}

amount.addEventListener("input", () => {
    updateExchangeRate();
})


document.addEventListener("DOMContentLoaded", () => {
    graphics().then((res) => {
        graphic.innerText = res.toFixed(3)
        result.value = res.toFixed(3)
    })
    country().then((countries) => {
        let html = "";
        countries.forEach((country) => {
            const flag = countryFlags[country];
            if (flag) {
                html += `<option value="${country}">${flag}&nbsp;${country}</option>`;
            } else {
                html += `<option value="${country}">${country}</option>`;
            }
        });
        firstSelect.innerHTML = html;
        firstSelect.value = "USD";
    });

    country().then((countries) => {
        let html = "";
        countries.forEach((country) => {
            const flag = countryFlags[country];
            if (flag) {
                html += `<option value="${country}">${flag}&nbsp;${country}</option>`;
            } else {
                html += `<option value="${country}">${country}</option>`;
            }
        });
        secondSelect.innerHTML = html;
        secondSelect.value = "TRY";
    });
})


