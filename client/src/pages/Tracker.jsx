import React, {useState, useEffect} from "react";
import {FaShower, FaMinusCircle} from "react-icons/fa";

function Tracker() {
  const initialUsages = JSON.parse(localStorage.getItem("waterUsages")) || [];
  const [waterUsages, setWaterUsages] = useState(initialUsages);

  const handleAddUsage = (gallons) => {
    const newUsage = {gallons};
    setWaterUsages([...waterUsages, newUsage]);
  };

  const handleRemoveUsage = (gallons) => {
    const updatedUsages = waterUsages.filter(
      (usage) => usage.gallons !== gallons
    );
    setWaterUsages(updatedUsages);
  };

  // Save the waterUsages state to local storage whenever it is updated
  useEffect(() => {
    localStorage.setItem("waterUsages", JSON.stringify(waterUsages));
  }, [waterUsages]);

  // Clear the waterUsages state in local storage at midnight
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timer = setTimeout(() => {
      localStorage.removeItem("waterUsages");
    }, midnight.getTime() - Date.now());
    return () => clearTimeout(timer);
  }, []);

  // Calculate total gallons of water used
  const totalGallons = waterUsages.reduce(
    (acc, usage) => acc + usage.gallons,
    0
  );

  // Convert gallons to liters
  const totalLiters = Math.round(totalGallons * 3.78541);

  return (
    <div>
      <h2>Water Usage Calculator</h2>
      <h6>
        Select your daily activities to track how your daily water usage fares!
      </h6>
      {waterUsages.some((usage) => usage.gallons === 10) ? (
        <button onClick={() => handleRemoveUsage(10)}>
          <FaMinusCircle />
        </button>
      ) : (
        <button onClick={() => handleAddUsage(10)}>
          {" "}
          <FaShower />
        </button>
      )}
      {waterUsages.some((usage) => usage.gallons === 20) ? (
        <button onClick={() => handleRemoveUsage(20)}>-20</button>
      ) : (
        <button onClick={() => handleAddUsage(20)}>+20</button>
      )}
      {waterUsages.some((usage) => usage.gallons === 30) ? (
        <button onClick={() => handleRemoveUsage(30)}>-30</button>
      ) : (
        <button onClick={() => handleAddUsage(30)}>+30</button>
      )}

      <br />

      <p>Total gallons of water used: {totalGallons}</p>
      <p>Total liters of water used: {totalLiters}</p>
    </div>
  );
}

export default Tracker;
