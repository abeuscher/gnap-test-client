'use client';

import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { useState } from 'react';

dotenv.config();

const secretKey = process.env.GNAP_SECRET_KEY;

if (!secretKey) {
  throw new Error('GNAP_SECRET_KEY environment variable is not set');
}

export default function Home() {
  const [gnapResponse, setGnapResponse] = useState<string | null>(null);

  const testGnapEndpoint = async () => {
    try {
      const accessToken = jwt.sign(
        { grant_type: 'authorization_code', client_id: 'my-client-id' },
        secretKey,
        { expiresIn: '1h' }
      );

      const response = await axios.post('https://main--gnap-test-server.netlify.app/api/gnap', {
        grant_type: 'authorization_code',
        client_id: 'my-client-id',
        access_token: `Bearer ${accessToken}`,
      });
      setGnapResponse(response.data.status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setGnapResponse(error.response?.data.error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div>
      <h1>GNAP Test Client</h1>
      <button onClick={testGnapEndpoint}>Test GNAP Endpoint</button>
      {gnapResponse && <p>Response: {gnapResponse}</p>}
    </div>
  );
}