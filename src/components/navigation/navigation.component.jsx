import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

export const Navigation = () => {
  return (
    <div>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>

                 <Link className="nav-link" to="/sign-in">
                    Sign In
                </Link>
            </div>
        </div>
        <Outlet />
    </div>
  )
}
