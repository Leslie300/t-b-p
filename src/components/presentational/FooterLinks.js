import React from 'react';
import Flexbox from 'flexbox-react';
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
// import './FooterLinks.css'

const FooterLinks = () => {
  return (
    <Flexbox className="FooterLinks" justifyContent="flex-end">
      <Flexbox marginLeft="10px">
        <Link to="/privacy">
          <Translate content="pages.privacy" />
        </Link>
      </Flexbox>
      <Flexbox marginLeft="10px">
        <Link to="/impressum">
          <Translate content="pages.impressum" />
        </Link>
      </Flexbox>
    </Flexbox>
  )
}

export default FooterLinks;