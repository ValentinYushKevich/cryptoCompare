const apiKey =
  "9015ad54e1ea6489b876a19678e440b51f588182cf84ab8f8b574eddddab77b7";

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`
);

console.log("process.env.VUE_APP_WS_KEY", apiKey);

socket.addEventListener("message", (e) => {
  console.log("soketevent", e);
});

export const sendOnSocket = (value) => {
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
};
