import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = '/placeholder-hotel.jpg';

function BookHotel() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('recommended');
  const [page, setPage] = useState(1);
  const perPage = 9;

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const ctrl = new AbortController();

    const fetchHotels = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/getHotels', { signal: ctrl.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) setHotels(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError('Unable to load hotels. Please try again.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHotels();
    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  const locations = useMemo(() => {
    const setLoc = new Set();
    hotels.forEach(h => h.location && setLoc.add(h.location));
    return Array.from(setLoc).sort();
  }, [hotels]);

  const handleBooking = (hotel) => {
    navigate('/booking', {
      state: {
        hotelId: hotel._id,
        hotelName: hotel.hotelName,
        title: hotel.hotelName,
        description: hotel.description,
        price: hotel.price,
        imageUrl: hotel.imageUrl,
      },
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setMinPrice('');
    setMaxPrice('');
    setSort('recommended');
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = hotels.slice();
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(h => (h.hotelName || '').toLowerCase().includes(q) || (h.location || '').toLowerCase().includes(q));
    }
    if (locationFilter) list = list.filter(h => h.location === locationFilter);
    if (minPrice) list = list.filter(h => Number(h.price) >= Number(minPrice));
    if (maxPrice) list = list.filter(h => Number(h.price) <= Number(maxPrice));

    if (sort === 'price-asc') list.sort((a,b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') list.sort((a,b) => Number(b.price) - Number(a.price));

    return list;
  }, [hotels, searchTerm, locationFilter, minPrice, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">Browse Hotels</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Find and book hotels that fit your needs.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-2 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            aria-label="Search hotels"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="Search by name or location"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={locationFilter}
            onChange={e => { setLocationFilter(e.target.value); setPage(1); }}
            className="w-full px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <option value="">All locations</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-1/2 px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-1/2 px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">{filtered.length} hotels found</div>
        <div className="flex items-center gap-3">
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Clear</button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-red-700">{error}</div>
            <div>
              <button onClick={() => { setPage(1); setLoading(true); setError(''); /* refetch */ fetch('https://main--chating-app-3558.asia-southeast1.hosted.app/api/hotels/getHotels').then(r=>r.json()).then(d=>setHotels(d)).catch(()=>setError('Unable to load hotels.')).finally(()=>setLoading(false)); }} className="px-3 py-1 bg-red-600 text-white rounded">Retry</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length: perPage}).map((_, i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : pageItems.length === 0 ? (
        <div className="py-12 text-center text-gray-600 dark:text-gray-400">No hotels match your filters.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map(hotel => (
              <article key={hotel._id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="relative h-44 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={hotel.imageUrl || DEFAULT_IMAGE}
                    loading="lazy"
                    alt={hotel.hotelName || 'Hotel image'}
                    onError={(e)=>{ e.target.onerror=null; e.target.src=DEFAULT_IMAGE }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{hotel.hotelName}</h3>
                  {hotel.location && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{hotel.location}</p>}
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{hotel.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">From</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">₹{hotel.price} <span className="text-sm font-normal text-gray-500">/night</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>handleBooking(hotel)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">Book</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1 rounded border bg-white dark:bg-gray-800">Prev</button>
            <div className="text-sm text-gray-600 dark:text-gray-300">Page {page} of {totalPages}</div>
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 py-1 rounded border bg-white dark:bg-gray-800">Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookHotel;
