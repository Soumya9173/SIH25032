import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import {
  FaHome,
  FaMap,
  FaComments,
  FaShoppingBag,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Itinerary', href: '/itinerary', icon: FaMap },
    { name: 'Chatbot', href: '/chatbot', icon: FaComments },
    { name: 'Marketplace', href: '/marketplace', icon: FaShoppingBag },
    ...(user?.role === 'ADMIN' ? [{ name: 'Analytics', href: '/admin/analytics', icon: FaChartBar }] : []),
  ];

  return (
    <Navbar color="light" light expand="md" className="shadow-sm">
      <Container>
        <NavbarBrand href="/" className="d-flex align-items-center">
          <div className="bg-gradient-primary rounded p-2 me-2 d-flex align-items-center justify-content-center">
            <span className="text-white fw-bold fs-5">J</span>
          </div>
          <span className="text-gradient fw-bold fs-4">Jharkhand Tourism</span>
        </NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {navigation.map((item) => (
              <NavItem key={item.name}>
                <NavLink href={item.href} className="d-flex align-items-center">
                  <item.icon className="me-1" />
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          
          <Nav navbar>
            {isAuthenticated ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  {user?.name}
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="/profile">
                    <FaUser className="me-2" />
                    Profile
                  </DropdownItem>
                  <DropdownItem href="/settings">
                    <FaCog className="me-2" />
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/login">Sign in</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register" className="btn btn-primary">
                    Sign up
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
