const apiKey =
  "9015ad54e1ea6489b876a19678e440b51f588182cf84ab8f8b574eddddab77b7";

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
);

const coinPricesHandlers = new Map();

socket.addEventListener("message", (e) => {
  const { FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data);

  if (newPrice === undefined) return;

  const priceHandler = coinPricesHandlers.get(currency);
  priceHandler(newPrice);
});

function sendOnSocket(value) {
  const stringifiMessage = JSON.stringify(value);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiMessage);
    },
    { once: true }
  );
}

export const subscribeToCurrency = (currencyTitle, priceHandler) => {
  coinPricesHandlers.set(currencyTitle, priceHandler);

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
