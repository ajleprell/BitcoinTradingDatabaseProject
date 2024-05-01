export const convertToBitcoin = async (amount) => {
  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
  );
  const data = await response.json();

  const bitcoinPrice = data.bpi.USD.rate_float;

  return (amount / bitcoinPrice).toFixed(8);
};

export const convertFromBitcoin = async (amount) => {
  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
  );
  const data = await response.json();

  const bitcoinPrice = data.bpi.USD.rate_float;

  console.log("Bitcoin Price:", bitcoinPrice);

  return (amount * bitcoinPrice).toFixed(8);
};
