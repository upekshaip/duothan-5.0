"use client";

import React, { useState } from "react";

export default function ChallengePortal() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [flag, setFlag] = useState("");
  const [isFlagCorrect, setIsFlagCorrect] = useState(false);
  const [buildathonLink, setBuildathonLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dummyAlgorithmicProblem = {
    title: "Find the Sum",
    description:
      "Write a program that takes two integers and outputs their sum.",
    constraints: "1 <= a, b <= 1000",
  };

  const dummyBuildathonTask =
    "Build a mini blog platform using Next.js and Prisma. Deploy on Vercel and upload the GitHub link below.";

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code first.");
      return;
    }

    setIsLoading(true);
    setOutput("Running...");

    try {
      const res = await fetch(
        "http://47.128.245.74:2358/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "ZHVvdGhhbjUuMA==",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: language === "cpp" ? 54 : 71,
            stdin: "2 3",
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.status?.description === "Accepted") {
        setOutput(data.stdout || "No output");
      } else {
        const errorMessage =
          data.stderr ||
          data.compile_output ||
          data.message ||
          `Error: ${data.status?.description}` ||
          "Unknown error occurred";
        setOutput(errorMessage);
      }
    } catch (err) {
      console.error("Error running code:", err);
      setOutput(`Error running code: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const submitFlag = () => {
    if (flag.trim() === "5") {
      setIsFlagCorrect(true);
      setFlag(""); // Clear the flag input
    } else {
      alert("Incorrect flag. Try again.");
    }
  };

  const submitBuildathonLink = () => {
    if (!buildathonLink.trim()) {
      alert("Please enter a GitHub link.");
      return;
    }

    // Basic URL validation
    try {
      new URL(buildathonLink);
      if (!buildathonLink.includes("github.com")) {
        alert("Please enter a valid GitHub link.");
        return;
      }
    } catch {
      alert("Please enter a valid URL.");
      return;
    }

    alert("Buildathon submission received! Thank you for participating.");
    setBuildathonLink("");
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 font-mono">
      <h1 className="text-3xl mb-6">🚀 OASIS Challenge Portal</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">🧠 Algorithmic Challenge</h2>
        <p className="text-lg font-bold">{dummyAlgorithmicProblem.title}</p>
        <p className="mb-2">{dummyAlgorithmicProblem.description}</p>
        <p className="text-sm text-gray-400 mb-4">
          Constraints: {dummyAlgorithmicProblem.constraints}
        </p>

        <textarea
          className="w-full h-40 mt-4 bg-gray-900 p-2 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          disabled={isLoading}
        ></textarea>

        <div className="flex gap-4 items-center my-4">
          <label>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white p-2 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
          <button
            onClick={runCode}
            disabled={isLoading}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>

        <div className="mb-4">
          <p className="text-green-400 mb-2">Output:</p>
          <pre className="bg-gray-800 p-4 border border-gray-600 rounded whitespace-pre-wrap min-h-[100px] overflow-auto">
            {output || "No output yet. Run your code to see results."}
          </pre>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter FLAG"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="bg-gray-900 border border-gray-600 p-2 text-white rounded focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === "Enter" && submitFlag()}
          />
          <button
            onClick={submitFlag}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Submit Flag
          </button>
        </div>
      </div>

      {isFlagCorrect && (
        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-2xl mb-2">🏗️ Buildathon Challenge</h2>
          <p className="mb-4">{dummyBuildathonTask}</p>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="GitHub link to your solution"
              value={buildathonLink}
              onChange={(e) => setBuildathonLink(e.target.value)}
              className="bg-gray-900 border border-gray-600 p-2 text-white rounded focus:outline-none focus:border-blue-500 flex-1"
              onKeyPress={(e) => e.key === "Enter" && submitBuildathonLink()}
            />
            <button
              onClick={submitBuildathonLink}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Submit Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
