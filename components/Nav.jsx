import React from 'react'
import Link from 'next/link'
import Logo from '../components/Logo'
import { useRouter } from 'next/router'

const links = [
  { href: '/mptracker', label: 'MP Tracker' },
  { href: '/fraudstop', label: 'Fraudstop' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => {
  const router = useRouter()
  const query = router.query

  return (
    <nav>
      <div className='grid-container'>
        <div className='cell small-12'>
          <div className='nav-bar'>
            <ul className='align-left'>
              <li className='nav-item active'>
                <Link prefetch href='/'>
                  <a className='logo align-left'>
                    <Logo />
                  </a>
                </Link>
              </li>
            </ul>
            <ul className='menu align-right'>
              {links.map(link => (
                <li className='nav-item' key={link.label}>
                  <Link
                    activeClassName='active'
                    prefetch
                    href={{ pathname: link.href, query }}>
                    <a className='nav-link'>{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
