import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (!token || token =='undefined') {
        router.push('/');
      }
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}

export default Admin;