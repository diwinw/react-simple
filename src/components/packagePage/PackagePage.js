import { useEffect, useState } from 'react';
import CreatePackagePage from './CreatePackagePage';
import UpdatePackagePage from './UpdatePackagePage';
function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: null,
    minPrice: null,
    maxPrice: null,
    startDate: null,
    endDate: null
  });
  const [selectedValue, setSelectedValue] = useState(true);
const [showUpdateFormFor, setShowUpdateFormFor] = useState(null);

const handleToggle = (pkgId) => {
  if (showUpdateFormFor === pkgId) {
    setShowUpdateFormFor(null);
  } else {
    setShowUpdateFormFor(pkgId);
  }
};
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8081/packages', {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPackages(data);
      })
      .catch(error => {
        console.error('Error:', error);
        window.location.href = "/";
      });
    } else {
        window.location.href = "/";
    }
  }, []);

  const handleRemove = (id) =>{
    const token = localStorage.getItem('token');
    fetch('http://localhost:8081/packages/'+id, {
    method: 'DELETE',
    headers: {
      'accept': '*/*',
      'token': token
    }
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('Package deleted:', data);
    window.location.href = "/package";
  })
  .catch(error => {
    console.error('There was a problem deleting the package:', error);
    window.location.href = "/package";
  });
  }
  
  const handleSearch = async (event) => {
    const token = localStorage.getItem('token');
    event.preventDefault();
    console.log(searchCriteria)
    const response = await fetch('http://localhost:8081/packages/search/'+selectedValue, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        name: searchCriteria.name === '' ? null : searchCriteria.name,
        min_price: searchCriteria.minPrice <1 ? -1 : searchCriteria.minPrice,
        max_price: searchCriteria.maxPrice <1 ? -1 : searchCriteria.maxPrice,
        start_date: searchCriteria.startDate=== '' ? null :searchCriteria.startDate ,
        end_date: searchCriteria.endDate=== '' ? null :searchCriteria.endDate
      })
    });

    const result = await response.json();
    console.log(result);
    setPackages(result);
    // setPackages(result.packages);
  }

  useEffect(() => {
    handleSearch();
  }, []);
  


  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    const newValue = selectedOption === 'true' ? true : false;
    console.log(selectedValue)
    setSelectedValue(newValue);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Name" value={searchCriteria.name} onChange={(event) => setSearchCriteria({...searchCriteria, name: event.target.value})} />
        <input type="number" placeholder="Min Price" value={searchCriteria.minPrice} onChange={(event) => setSearchCriteria({...searchCriteria, minPrice: event.target.value})} />
        <input type="number" placeholder="Max Price" value={searchCriteria.maxPrice} onChange={(event) => setSearchCriteria({...searchCriteria, maxPrice: event.target.value})} />
        <input type="date" placeholder="Start Date" value={searchCriteria.startDate} onChange={(event) => setSearchCriteria({...searchCriteria, startDate: event.target.value})} />
        <input type="date" placeholder="End Date" value={searchCriteria.endDate} onChange={(event) => setSearchCriteria({...searchCriteria, endDate: event.target.value})} />
        <label htmlFor="my-dropdown">Sort:</label>
      <select id="my-dropdown" value={selectedValue ? 'true' : 'false'} onChange={handleDropdownChange}>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Package Name</th>
            <th>Price per Unit</th>
            <th>Create Date</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.package_id}>
              <td>{pkg.package_id}</td>
              <td>{pkg.package_name}</td>
              <td>{pkg.price_per_unit}</td>
              <td>{pkg.create_date}</td>
              <td><button onClick={() => handleRemove(pkg.package_id)}>Delete</button></td>
              {/* <td> <button onClick={handleToggle}>{isOn ? 'cancel' : 'update'}</button></td>
                {isOn && <td> <UpdatePackagePage pkg={pkg} /> </td>}
           */}
           <td>
              <button onClick={() => handleToggle(pkg.package_id)}>
                {showUpdateFormFor === pkg.package_id ? 'Cancel' : 'Update'}
              </button>
            </td>
            {showUpdateFormFor === pkg.package_id && (
              <td>
                <UpdatePackagePage pkg={pkg} />
              </td>
            )}
            </tr>
          ))}
        </tbody>
      </table>
      <CreatePackagePage/>

    </div>
  );
}

export default PackagesPage;