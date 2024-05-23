import React from 'react'
import { FaTruckMoving, FaUser } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { useAuth0 } from '@auth0/auth0-react';
import { CiLogout, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom"
import './nav.css'

const Nav = ({ search, setSearch, searchproduct }) => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return (
        <>
            <div className='header'>
                <div className="top_header">
                    <div className='icon'>
                        <FaTruckMoving />
                    </div>
                    <div className='info'>
                        <p>FREE Shipping when shopping upto $1000</p>
                    </div>
                </div>

                <div className='mid_header'>
                    <div className='logo'>
                        <img src='./images/logo.webp' alt='logo'></img>
                    </div>

                    <div className='search_box'>
                        <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
                        <button onClick={searchproduct}><AiOutlineSearch /></button>
                    </div>

                    {
                        isAuthenticated
                            ?
                            <div className='user'>
                                <div className='icon'><CiLogout /></div>
                                <div className='btn'>
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                        <FaUser />
                                    </button>
                                </div>
                            </div>
                            :
                            <div className='user'>
                                <div className='icon'><FiLogIn /></div>
                                <div className='btn'>
                                    <button onClick={() => loginWithRedirect()}><FaUser /></button>
                                </div>
                            </div>
                    }
                </div>

                <div className='last_header'>
                    <div className='user_profile'>
                        {
                            isAuthenticated
                                ?
                                <>
                                    <div className='icon'>
                                        <CiUser />
                                    </div>
                                    <div className='info'>
                                        <h2>{user.name}</h2>
                                        <p>{user.email}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='icon'>
                                        <CiUser />
                                    </div>
                                    <div className='info'>
                                        <p>Please Login</p>
                                    </div>
                                </>
                        }
                    </div>

                    <div className='nav'>
                        <ul>
                            <li><Link to='/' className='link'>Home</Link></li>
                            <li><Link to='/shop' className='link'>Shop</Link></li>
                            <li><Link to='/cart' className='link'>Collection</Link></li>
                            <li><Link to='/about' className='link'>About</Link></li>
                            <li><Link to='/contact' className='link'>Contact</Link></li>
                        </ul>
                    </div>

                    <div className='offer'>
                        <p>flat 10% over all iphone</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav