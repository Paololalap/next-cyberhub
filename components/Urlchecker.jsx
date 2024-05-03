"use client";
import { useState } from "react";


export default function Home() {
  const [url, setUrl] = useState("");
  const [riskScore, setRiskScore] = useState(null); // State variable for risk score
  const [result, setResult] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGSafeBrowsing = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/google-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Pass the URL in the request body
      });

      const data = await response.json();
      setResult(data); // Set the risk score in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIPQuality = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ipquality-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Pass the URL in the request body
      });

      const data = await response.json();
      const { risk_score } = data; // Extract the risk_score from the response data
      setRiskScore(risk_score); // Set the risk score in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-full max-w-md p-6 border-solid border-2 border-black bg-white rounded-lg shadow-md">
        <h2 className="text-xl text-center font-semibold mb-4">URL Checker</h2>
        <div className="mb-4">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Paste URL"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={() => {
              handleGSafeBrowsing();
              handleIPQuality();
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:border-black"
          >
            Check URL
          </button>
        </div>
        {/* Display the risk score if available */}
        <table className="w-full">
          <thead>
            <tr className="flex">
              <th className="flex-1">Security Analysis</th>
              <th className="flex-1">Status</th>
            </tr>
          </thead>
          <tbody className="flex items-center flex-col">
            {/* IP Quality */}
            <tr className="flex justify-around items-center w-full">
              <td className="flex-1 text-center">
                {riskScore !== null && "IPQuality"}
              </td>
              <td
                className={`flex-1 text-center text-lg font-semibold ${
                  riskScore !== null &&
                  (riskScore >= 75 ? "text-red-500" : "text-green-500")
                }`}
              >
                {riskScore !== null && (riskScore >= 75 ? "Suspicious" : "Safe")}
              </td>
            </tr>

            {/* Google Safe Browsing */}
            {result && (
              <>
                {result.matches && result.matches.length > 0 ? (
                  result.matches.map((match, index) => (
                    <tr
                      key={index}
                      className="flex items-center w-full justify-around"
                    >
                      <td className="text-center flex-1">
                        Google Safe Browsing
                      </td>
                      <td className="flex-1 text-center text-green-500 text-lg">
                        {match.threatType ? (
                          <span className="text-red-500 font-semibold">
                            Phishing
                          </span>
                        ) : (
                          "Safe"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="flex items-center w-full justify-around">
                    <td className="text-center flex-1">Google Safe Browsing</td>
                    <td className="text-center flex-1 text-green-500 font-semibold text-lg">
                      Safe
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
