const apiKey =
  "9015ad54e1ea6489b876a19678e440b51f588182cf84ab8f8b574eddddab77b7";

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
);

const coinPricesHandlers = new Map();

console.log("process.env.VUE_APP_WS_KEY", apiKey);

socket.addEventListener("message", (e) => {
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
  } = JSON.parse(e.data);

  console.log("soketevent", e);

  console.log("type currency newPrice", type, currency, newPrice);

  if (newPrice === undefined) return;

  const priceHandler = coinPricesHandlers.get(currency);
  console.log("priceHandler", priceHandler);
  priceHandler(newPrice);
});

function sendOnSocket(value) {
  const stringifiMessage = JSON.stringify(value);
  console.log("socket.readyState", socket.readyState);
  console.log("WebSocket.OPEN", WebSocket.OPEN);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiMessage);
      console.log("Отправлено");
    },
    { once: true }
  );
}

export const subscribeToCurrency = (currencyTitle, priceHandler) => {
  coinPricesHandlers.set(currencyTitle, priceHandler);
  console.log("coinPricesHandlers", coinPricesHandlers);
  const message = {
    action: "SubAdd",
    subs: [`5~CCCAGG~${currencyTitle}~USD`],
  };

  sendOnSocket(message);
};

export const unsubscribeFromCurrency = (currency) => {
  coinPricesHandlers.delete(currency);

  const message = {
    action: "SubRemove",
    subs: [`5~CCCAGG~${currency}~USD`],
  };

  sendOnSocket(message);
};
