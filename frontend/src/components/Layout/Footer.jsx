import React from 'react';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#764ba2', color: 'white', marginTop: '2rem' }}>
      <p>© {new Date().getFullYear()} Electrokart. All rights reserved.</p>
    </footer>
  );
}