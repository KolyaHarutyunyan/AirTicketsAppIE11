"use strict";
var ETicketCurrency;
(function (ETicketCurrency) {
    ETicketCurrency["RUB"] = "RUB";
    ETicketCurrency["USD"] = "USD";
    ETicketCurrency["EUR"] = "EUR";
})(ETicketCurrency || (ETicketCurrency = {}));
var ETicketTransfers;
(function (ETicketTransfers) {
    ETicketTransfers["NO_TRANSFERS"] = "\u0411\u0435\u0437 \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043E\u043A";
    ETicketTransfers["ONE_TRANSFER"] = "1 \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043A\u0430";
    ETicketTransfers["TWO_TRANSFERS"] = "2 \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043A\u0438";
    ETicketTransfers["THREE_TRANSFERS"] = "3 \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043A\u0438";
    ETicketTransfers["NA"] = "NA";
})(ETicketTransfers || (ETicketTransfers = {}));
const tickets = [
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "16:20",
        arrival_date: "12.05.18",
        arrival_time: "22:10",
        carrier: "TK",
        stops: 3,
        price: 12400,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "17:20",
        arrival_date: "12.05.18",
        arrival_time: "23:50",
        carrier: "S7",
        stops: 1,
        price: 13100,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "12:10",
        arrival_date: "12.05.18",
        arrival_time: "18:10",
        carrier: "SU",
        stops: 0,
        price: 15300,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "17:00",
        arrival_date: "12.05.18",
        arrival_time: "23:30",
        carrier: "TK",
        stops: 2,
        price: 11000,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "12:10",
        arrival_date: "12.05.18",
        arrival_time: "20:15",
        carrier: "BA",
        stops: 3,
        price: 13400,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "9:40",
        arrival_date: "12.05.18",
        arrival_time: "19:25",
        carrier: "SU",
        stops: 3,
        price: 12450,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "17:10",
        arrival_date: "12.05.18",
        arrival_time: "23:45",
        carrier: "TK",
        stops: 1,
        price: 13600,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "UFA",
        destination_name: "Уфа",
        departure_date: "12.05.18",
        departure_time: "15:15",
        arrival_date: "12.05.18",
        arrival_time: "17:45",
        carrier: "TK",
        stops: 1,
        price: 33400,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "6:10",
        arrival_date: "12.05.18",
        arrival_time: "15:25",
        carrier: "TK",
        stops: 0,
        price: 14250,
    },
    {
        origin: "LRN",
        origin_name: "Ларнака",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "12:50",
        arrival_date: "12.05.18",
        arrival_time: "14:30",
        carrier: "SU",
        stops: 1,
        price: 7000,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "16:50",
        arrival_date: "12.05.18",
        arrival_time: "23:35",
        carrier: "SU",
        stops: 1,
        price: 16700,
    },
    {
        origin: "VVO",
        origin_name: "Владивосток",
        destination: "TLV",
        destination_name: "Тель-Авив",
        departure_date: "12.05.18",
        departure_time: "6:10",
        arrival_date: "12.05.18",
        arrival_time: "16:15",
        carrier: "S7",
        stops: 0,
        price: 17400,
    },
];
const transfersList = [
    ETicketTransfers.NO_TRANSFERS,
    ETicketTransfers.ONE_TRANSFER,
    ETicketTransfers.TWO_TRANSFERS,
    ETicketTransfers.THREE_TRANSFERS,
];
let checkedTransfers = [
    ETicketTransfers.NO_TRANSFERS,
    ETicketTransfers.ONE_TRANSFER,
    ETicketTransfers.TWO_TRANSFERS,
];
const calculatePriceByCurrency = (price, toCurrency) => {
    const exchangeRates = {
        RUB: 1.0,
        USD: 0.011,
        EUR: 0.01,
    };
    if (exchangeRates[toCurrency]) {
        return price * exchangeRates[toCurrency];
    }
    else {
        console.log("Conversion not supported for the provided currency.");
        return price;
    }
};
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
    };
    const formattedDate = date
        .toLocaleDateString("ru-RU", options)
        .substring(0, 15)
        .split(",")
        .reverse()
        .join(", ");
    return formattedDate;
};
const getSymbolFromCurrency = (currency) => {
    switch (currency) {
        case ETicketCurrency.RUB:
            return "₽";
        case ETicketCurrency.USD:
            return "$";
        case ETicketCurrency.EUR:
            return "€";
        default:
            return "";
    }
};
const makeTransferFromStop = (stop) => {
    switch (stop) {
        case 0:
            return ETicketTransfers.NO_TRANSFERS;
        case 1:
            return ETicketTransfers.ONE_TRANSFER;
        case 2:
            return ETicketTransfers.TWO_TRANSFERS;
        case 3:
            return ETicketTransfers.THREE_TRANSFERS;
        default:
            return ETicketTransfers.NA;
    }
};
const updateTickets = (tickets) => tickets
    .sort((ta, tb) => ta.price - tb.price)
    .filter((t) => checkedTransfers.indexOf(makeTransferFromStop(t.stops)) !== -1);
const updateTicketPricesToCurrency = (toCurrency) => {
    return updateTickets(tickets).map((ticket) => {
        const updatedPrice = calculatePriceByCurrency(ticket.price, toCurrency);
        return Object.assign(Object.assign({}, ticket), { price: updatedPrice, currency_symbol: getSymbolFromCurrency(toCurrency) });
    });
};
const getCurrencyRadioElements = () => {
    const wrapper = document.querySelector(".currency-radio-wrapper");
    const inputs = wrapper.querySelectorAll(".radio-input");
    const labels = wrapper.querySelectorAll("label.currency-radio-label");
    const currencyRadioElements = [];
    inputs.forEach((input, index) => {
        currencyRadioElements.push({ input, label: labels[index] });
    });
    return currencyRadioElements;
};
const handleRadioButtonChange = (event) => {
    const target = event.target;
    const updatedTickets = updateTicketPricesToCurrency(target.value.toUpperCase());
    clearTickets();
    renderTickets(updatedTickets);
};
const addRadioButtonEventListeners = () => {
    const currencyRadioElements = getCurrencyRadioElements();
    currencyRadioElements.forEach((element) => {
        element.input.addEventListener("change", handleRadioButtonChange);
    });
};
addRadioButtonEventListeners();
const renderTransfersCheckboxes = () => {
    let html = `<ul class="transfers-checkbox-group">`;
    html += `<li class="checkbox-list-item">
              <input type="checkbox" id="checkAll" class="checkbox-input" />
              <label for="checkAll" class="transfers-checkbox-label">Все</label>
            </li>`;
    transfersList.forEach((transfer) => {
        const checkboxId = transfer;
        html += `<li class="checkbox-list-item">
                <label for="${checkboxId}" class="transfers-checkbox-label">
                ${checkedTransfers.indexOf(checkboxId) !== -1
            ? `<input type="checkbox" id="${checkboxId}" class="checkbox-input" checked />`
            : `<input type="checkbox" id="${checkboxId}" class="checkbox-input" />`}
                  ${transfer}
                </label>
                <button type="button" class="checked-only-btn" data-checkbox="${checkboxId}">ТОЛЬКО</button>
              </li>`;
    });
    html += `</ul>`;
    return html;
};
const handleCheckboxChange = (event) => {
    const target = event.target;
    if (target.id !== "checkAll" && !target.checked) {
        const checkAllCheckbox = document.getElementById("checkAll");
        checkAllCheckbox.checked = false;
    }
    if (target.id === "checkAll") {
        const checkboxes = document.querySelectorAll(".checkbox-input");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = target.checked;
        });
    }
    const checkboxes = document.querySelectorAll(".checkbox-input");
    const checkedCheckboxes = [...checkboxes].filter((checkbox) => checkbox.checked);
    if (checkedCheckboxes.length === 0) {
        checkedTransfers = [];
    }
    else if (checkedCheckboxes.length === transfersList.length) {
        checkedTransfers = transfersList;
    }
    else {
        checkedTransfers = checkedCheckboxes.map((cc) => cc.id);
    }
    clearTickets();
    renderTickets(updateTickets(tickets));
};
const handleButtonClick = (event) => {
    const target = event.target;
    const checkboxId = target.getAttribute("data-checkbox");
    const checkbox = document.getElementById(checkboxId);
    const checkboxes = document.querySelectorAll(".checkbox-input");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    });
    checkbox.checked = true;
    handleCheckboxChange(event);
};
const addCheckboxEventListeners = () => {
    const checkboxes = document.querySelectorAll(".checkbox-input");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleCheckboxChange);
    });
};
const addButtonClickEventListeners = () => {
    const buttons = document.querySelectorAll(".checked-only-btn");
    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
};
const renderCheckboxes = () => {
    const container = document.getElementById("checkbox-container");
    if (container) {
        container.innerHTML = renderTransfersCheckboxes();
        addCheckboxEventListeners();
        addButtonClickEventListeners();
    }
};
renderCheckboxes();
function renderTickets(tickets) {
    const ticketsContainer = document.getElementById("tickets-container");
    if (tickets.length) {
        const ul = document.createElement("ul");
        ul.classList.add("tickets-list-group");
        tickets.forEach((ticket) => {
            var _a;
            const li = document.createElement("li");
            li.classList.add("tickets-list-item");
            const { departure_time, origin, origin_name, stops, arrival_time, destination, destination_name, departure_date, } = ticket;
            li.innerHTML = `
          <div class="card content-card">
            <div class="content-wrapper">
              <div class="left-content">
                <div class="img-wrapper">
                  <img src="/src/assets/images/turkish-airlines-old-logo.png" alt="TurkishAirlines" class="left-content-img" />
                </div>
                <button type="button" class="buy-ticket-btn">
                  Купить за ${Math.round(ticket.price)} ${(_a = ticket.currency_symbol) !== null && _a !== void 0 ? _a : "₽"}
                </button>
              </div>
              <div class="right-content">
                <div class="departure-block">
                  <h2 class="time-text">${departure_time}</h2>
                  <p class="place-text">${origin}, ${origin_name}</p>
                  <p class="date-text">${formatDate(departure_date)}</p>
                </div>
                <div class="stops-block">
                  <p>${makeTransferFromStop(stops)}</p>
                  <div class="stops-img-wrapper">
                    <img src="/src/assets/images/departure-arrival-plane.png" alt="DepartureArrivalPlane" class="stops-img" />
                  </div>
                </div>
                <div class="arrival-block">
                  <h2 class="time-text">${arrival_time}</h2>
                  <p class="place-text">${destination}, ${destination_name}</p>
                  <p class="date-text">${formatDate(departure_date)}</p>
                </div>
              </div>
            </div>
          </div>
        `;
            ul.appendChild(li);
        });
        if (ticketsContainer) {
            ticketsContainer.appendChild(ul);
        }
    }
    else {
        const p = document.createElement("p");
        p.classList.add("empty-text");
        p.innerText = "Билеты не найдены";
        if (ticketsContainer) {
            ticketsContainer.appendChild(p);
        }
    }
}
renderTickets(updateTickets(tickets));
function clearTickets() {
    const ticketsContainer = document.getElementById("tickets-container");
    if (ticketsContainer) {
        const ul = ticketsContainer.querySelector(".tickets-list-group");
        const p = ticketsContainer.querySelector(".empty-text");
        if (ul)
            ticketsContainer.removeChild(ul);
        if (p)
            ticketsContainer.removeChild(p);
    }
}
