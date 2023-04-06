import React from "react";
import Link from 'next/link';

function Navbar() {
  return (
      <nav>
        <ul>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a>About</a>
            </Link>
        </ul>
      </nav>
  );
}

export default Navbar;