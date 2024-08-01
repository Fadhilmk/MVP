'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const HomePage = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Fetch the list of received numbers from the server
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('/api/numbers');
        setNumbers(response.data);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h1>Received Numbers</h1>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>
            <Link href={`/inbox?number=${number}`}>
              <a>{number}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
