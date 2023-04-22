import { useState } from 'react';

function UpdatePackagePage({ pkg }) {
  const [packageId, setPackageId] = useState(pkg.package_id);
  const [packageName, setPackageName] = useState(pkg.package_name);
  const [pricePerUnit, setPricePerUnit] = useState(pkg.price_per_unit);
  const [createDate, setCreateDate] = useState(pkg.create_date);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'token': token
        },
        body: JSON.stringify({
          package_id: packageId,
          package_name: packageName,
          price_per_unit: pricePerUnit,
          create_date: createDate
        })
      };
    
      fetch(`http://localhost:8081/packages/`+packageId, requestOptions)
        .then(response => {
          console.log('Package updated successfully!');
          window.location.href = "/package";
        })
        .catch(error => {
          console.error('There was an error updating the package:', error);
          window.location.href = "/package";
        });
  };

  return (
    <div>
      {/* <h1>Update Package {pkg.package_id}</h1> */}
      <form onSubmit={handleSubmit}>
        <label>
          Package ID:
          <input type="text" value={packageId} onChange={(e) => setPackageId(e.target.value)} />
        </label>
        <br />
        <label>
          Package Name:
          <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} />
        </label>
        <br />
        <label>
          Price per Unit:
          <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} />
        </label>
        <br />
        <label>
          Create Date:
          <input type="text" value={createDate} onChange={(e) => setCreateDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
}

export default UpdatePackagePage;