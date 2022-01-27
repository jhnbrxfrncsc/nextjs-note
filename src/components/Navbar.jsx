import React from 'react';

// next
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link href="/">
                <a className='navbar-brand'>Note App</a>
            </Link>
            <Link href="/add-note">
                <a className='nav-link'>Add Note</a>
            </Link>
        </nav>
    )
}

export default Navbar;
