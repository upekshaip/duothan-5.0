"use client";

import React, { useEffect, useState } from "react";
import { RegisterTeam } from "@/app/actions/TeamRegistrations";

const Registration = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    nic: "",
    teamName: "",
    teamDesc: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("api/teams/get-teams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "getTeams" }),
        });
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const value = e.target.value;
    setSelectedTeam(value);
    if (value === "create_new") {
      setShowTeamForm(true);
    } else {
      setShowTeamForm(false);
    }
  };

  // Validate form
  useEffect(() => {
    const { gender, nic, teamName, teamDesc } = formData;
    const baseValid = gender && nic && (selectedTeam || showTeamForm);
    const teamValid = showTeamForm ? teamName && teamDesc : true;
    setIsFormValid(baseValid && teamValid);
  }, [formData, selectedTeam, showTeamForm]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <form
        action={RegisterTeam}
        className="p-8 rounded-xl max-w-xl mx-auto shadow-lg space-y-6 border border-gray-300 dark:border-white/20 bg-white dark:bg-zinc-900"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Team Registration
        </h2>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-white text-black"
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* NIC */}
        <div>
          <label htmlFor="nic" className="block text-sm font-medium mb-1">
            National Identity Card (NIC)
          </label>
          <input
            id="nic"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter NIC number"
            className="w-full p-2 rounded bg-gray-100 dark:bg-white text-black placeholder-gray-500"
            required
          />
        </div>

        {/* Team Selection */}
        <div>
          <label htmlFor="team" className="block text-sm font-medium mb-1">
            Select Team
          </label>
          <select
            id="team"
            name="team"
            className="w-full p-2 rounded bg-gray-100 dark:bg-white text-black"
            value={selectedTeam}
            onChange={handleTeamChange}
            required
          >
            <option value="">-- Select an existing team --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
            <option value="create_new">+ Create a new team</option>
          </select>
        </div>

        {/* Create Team Fields */}
        {showTeamForm && (
          <div className="border border-gray-400 dark:border-white/30 p-4 rounded bg-gray-50 dark:bg-zinc-800 mt-4 space-y-4">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium mb-1"
              >
                Team Name
              </label>
              <input
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter new team name"
                className="w-full p-2 rounded bg-white text-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="teamDesc"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="teamDesc"
                name="teamDesc"
                value={formData.teamDesc}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your team"
                className="w-full p-2 rounded bg-white text-black"
                required
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-6 py-2 rounded font-semibold transition ${
              isFormValid
                ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                : "bg-gray-500 cursor-not-allowed text-white"
            }`}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
