import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://www.getup.org.au/about/privacy-policy', label: 'Privacy Policy' },
  {
    href:
      'https://www.getup.org.au/about/powering-getup?target=donations-policy#accordion-module-content-47871',
    label: 'Donations Policy'
  },
  {
    href:
      'https://www.getup.org.au/about/powering-getup?target=donations-disclosure#accordion-module-content-31719',
    label: 'Donations Disclosure'
  }
]

const Footer = () => {
  return (
    <footer>
      <div className='grid-container'>
        <div className='cell small-12'>
          <ul>
            {links.map(link => (
              <li key={link.label}>
                <Link href={link.href}>
                  <a target='_blank' rel='noopener'>
                    {link.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
