import Head from "next/head";
import React, { useState } from "react";
export default function Home() {
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [buyAmount, setBuyAmount] = useState(1);
  const [profitLoss, setProfitLoss] = useState(0);
  const [isLoss, setIsLoss] = useState(null);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const calculateProfitLoss = (buyPrice, sellPrice, buyAmount) => {
    const profitLoss = (sellPrice - buyPrice) * buyAmount;
    setIsLoss(profitLoss < 0 ? true : false);
    return profitLoss;
  };

  const calculateProfitPercentage = (buyPrice, sellPrice, buyAmount) => {
    const profitPercentage = ((sellPrice - buyPrice) / buyPrice) * 100;
    setProfitPercentage(profitPercentage.toPrecision(2));
    return profitPercentage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfitLoss(calculateProfitLoss(buyPrice, sellPrice, buyAmount));
    calculateProfitPercentage(buyPrice, sellPrice, buyAmount);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setBuyPrice(0);
    setSellPrice(0);
    setBuyAmount(1);
    setProfitLoss(0);
    setIsLoss(null);
  };
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen py-2 ${
        isLoss !== null
          ? isLoss == true
            ? "bg-red-300"
            : "bg-green-300"
          : "bg-blue-50"
      }`}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Stonks!</span>
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <form
            onReset={handleReset}
            onSubmit={handleSubmit}
            className=" bg-white shadow-md rounded-xl px-20 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="buyPrice"
              >
                Buying Price per stock
              </label>
              <input
                required
                id="buyPrice"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Quantity
              </label>
              <input
                id="buyAmount"
                required
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sellPrice"
              >
                Current Price per stock
              </label>
              <input
                id="sellPrice"
                required
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
              />
            </div>
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Calculate
            </button>

            <div>
              {isLoss !== null ? (
                <span>
                  {isLoss ? `Loss = $${profitLoss}` : `Profit = $${profitLoss}`}
                </span>
              ) : null}
              {isLoss !== null ? (
                <div
                  className={`mt-2 
                ${
                  isLoss !== null
                    ? isLoss == true
                      ? "text-red-700 text-2xl font-bold"
                      : "text-green-600 text-2xl font-bold"
                    : "text-blue-50"
                }
                `}
                >
                  {isLoss
                    ? `⬇️ ${profitPercentage}% `
                    : `⬆ +${profitPercentage}% `}
                </div>
              ) : null}
            </div>

            <button
              type="reset"
              className="mt-5 text-blue-400 hover:text-blue-600"
            >
              Reset
            </button>
          </form>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-blue-100">
        <a
          className="flex items-center justify-center"
          href="https://kishans.in"
          rel="noopener noreferrer"
        >
          Built by Kishan
        </a>
      </footer>
    </div>
  );
}
