import React, { useState } from "react";

function CreatePackagePage() {
  const [packageId, setPackageId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [createDate, setCreateDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:8081/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify({
        package_id: packageId,
        package_name: packageName,
        price_per_unit: pricePerUnit,
        create_date: createDate
      })
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/package";
      })
      .catch((error) => {
        console.error("There was a problem creating the package: ", error);
        alert("Failed to create package");
      });
  };

  return (
    <div>
      <h1>Create Package</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Package ID:
          <input type="text" value={packageId} onChange={(e) => setPackageId(e.target.value)} />
        </label>
        <label>
          Package Name:
          <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} />
        </label>
        <label>
          Price Per Unit:
          <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} />
        </label>
        <label>
          Create Date:
          <input type="text" value={createDate} onChange={(e) => setCreateDate(e.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePackagePage;
