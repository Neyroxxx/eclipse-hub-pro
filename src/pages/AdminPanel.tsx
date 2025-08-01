import React, { useState } from "react";

const AdminPanel = () => {
  const [code, setCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = () => {
    if (code === "hokaistaff") {
      setIsAuthorized(true);
    } else {
      alert("Code admin incorrect !");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="password"
          placeholder="Entrez le code admin"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Panel Admin</h1>
      {/* Ici tu peux afficher tes données, stats, liste, etc. */}
    </div>
  );
};

export default AdminPanel;
