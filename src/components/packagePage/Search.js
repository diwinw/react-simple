import { useEffect, useState } from 'react';


function Search() {
    const [searchCriteria, setSearchCriteria] = useState({
        name: null,
        minPrice: null,
        maxPrice: null,
        startDate: null,
        endDate: null
      });
      const [packages, setPackages] = useState([]);
    
      const handleSearch = async (event) => {
        const token = localStorage.getItem('token');
        event.preventDefault();
        const response = await fetch('http://localhost:8081/packages/search/true', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: JSON.stringify({
            name: searchCriteria.name,
            min_price: searchCriteria.minPrice,
            max_price: searchCriteria.maxPrice,
            start_date: searchCriteria.startDate,
            end_date: searchCriteria.endDate
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
      return (
        <>
         <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Name" value={searchCriteria.name} onChange={(event) => setSearchCriteria({...searchCriteria, name: event.target.value})} />
        <input type="number" placeholder="Min Price" value={searchCriteria.minPrice} onChange={(event) => setSearchCriteria({...searchCriteria, minPrice: event.target.value})} />
        <input type="number" placeholder="Max Price" value={searchCriteria.maxPrice} onChange={(event) => setSearchCriteria({...searchCriteria, maxPrice: event.target.value})} />
        <input type="date" placeholder="Start Date" value={searchCriteria.startDate} onChange={(event) => setSearchCriteria({...searchCriteria, startDate: event.target.value})} />
        <input type="date" placeholder="End Date" value={searchCriteria.endDate} onChange={(event) => setSearchCriteria({...searchCriteria, endDate: event.target.value})} />
        <button type="submit">Search</button>
      </form>
    </div>

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
              {/* <td><button onClick={() => handleRemove(pkg.package_id)}>Delete</button></td> */}
              {/* <td> <button onClick={handleToggle}>{isOn ? 'cancel' : 'update'}</button></td>
                {isOn && <td> <UpdatePackagePage pkg={pkg} /> </td>}
           */}
           {/* <td>
              <button onClick={() => handleToggle(pkg.package_id)}>
                {showUpdateFormFor === pkg.package_id ? 'Cancel' : 'Update'}
              </button>
            </td>
            {showUpdateFormFor === pkg.package_id && (
              <td>
                <UpdatePackagePage pkg={pkg} />
              </td>
            )} */}
            </tr>
          ))}
        </tbody>
      </table>

</>
      )
}

export default Search