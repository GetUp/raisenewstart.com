import Head from './Head'
import Nav from './Nav'
import Footer from './Footer'

const Layout = props => (
  <>
    <Head title={props.title} />
    <Nav />
    {props.children}
    <Footer />
  </>
)

export default Layout
