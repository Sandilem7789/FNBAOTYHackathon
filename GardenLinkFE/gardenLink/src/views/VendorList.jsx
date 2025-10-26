import { useEffect, useState } from 'react';
import api from '../api';

function VendorList() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get('vendors/')
      .then(res => setVendors(res.data))
      .catch(err => console.error('Vendor fetch error:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registered Vendors</h1>
      <ul className="space-y-2">
        {vendors.map(v => (
          <li key={v.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{v.name}</h2>
            <p className="text-sm text-gray-600">{v.business_type} — {v.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VendorList;
