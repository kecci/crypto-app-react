import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // This API is deprecated and will be disabled by Oct 31 2023, to use the new version please go to https://openapi.coinstats.app .
    // Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
    //   (response) => {
    //     setListOfCoins(response.data.coins);
    //   }
    // );
    //
    // This is a new one from openapi.coinstats.app, this have a monthly API Credit limit 1,000,000/month
    // To see the credit limit, please checkout this: https://openapi.coinstats.app/
    Axios.get("https://openapiv1.coinstats.app/coins", {
      headers: {
        "X-API-KEY": "jnNuzZKueK5/PuI6oKXLXZOzJpSkO7K1F1t3RPVjMv4=",
        accept: "application/json",
      },
    }).then((response) => {
      // Deprecated response of field "coins"
      // setListOfCoins(response.data.coins);
      //
      // Instead use the new response by field "result"
      setListOfCoins(response.data.result);
    });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin.."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
