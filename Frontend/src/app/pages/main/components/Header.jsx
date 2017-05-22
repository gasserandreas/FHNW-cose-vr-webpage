import React, { PropTypes } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';

import { Link } from 'react-router';

import {
  PATH_INDEX,
  PATH_MAP,
  PATH_SEARCH_ITEM,
  PATH_ABOUT,
  PATH_STATISTICS,
} from '../../../paths';

const navigationItems = [
  {
    id: 1,
    name: 'Map',
    path: PATH_MAP,
  },
  {
    id: 2,
    name: 'Search Items',
    path: PATH_SEARCH_ITEM,
  },
  {
    id: 3,
    name: 'About',
    path: PATH_ABOUT,
  },
  {
    id: 4,
    name: 'Statistics',
    path: PATH_STATISTICS,
  },
];

const Header = props => {
  const items = navigationItems.map((item) => {
    const { id, name, path } = item;
    return (
      <li key={id} className="presentation"><Link to={path}>{name}</Link></li>
      // <NavItem key={id} eventKey={id}><Link to={PATH_MAP}>{name}</Link></NavItem>
    );
  });
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={PATH_INDEX}>React-Bootstrap</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {items}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  navigateToPath: PropTypes.func.isRequired,
};

export default Header;
