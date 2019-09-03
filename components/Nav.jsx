import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/tour', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/origin', label: 'Origin AGM' }
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
          <ul className='menu align-right'>
            {links.map(link => (
              <li className='nav-item active' key={link.label}>
                <Link prefetch href={{ pathname: link.href, query }}>
                  <a className='nav-link'>{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
