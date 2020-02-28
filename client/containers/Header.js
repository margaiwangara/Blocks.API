import Link from 'next/link';
import styled from 'styled-components';

function Header() {
  return (
    <Navbar>
      <Link href="/">
        <NavbarBrand>Blocks</NavbarBrand>
      </Link>
      <NavbarRight>
        <Link href="/">
          <NavbarLink>Home</NavbarLink>
        </Link>
        <Link href="/register">
          <NavbarLink>Register</NavbarLink>
        </Link>
        <Link href="/login">
          <NavbarLink>Login</NavbarLink>
        </Link>
      </NavbarRight>
    </Navbar>
  );
}

const Navbar = styled.nav`
  width: 100%;
  background: var(--accent);
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLink = styled.a`
  font-weigth: 600;
  color: #fff;
  letter-spacing: 0.9;

  &:hover {
    color: var(--primary);
  }
`;

const NavbarRight = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  justify-items: start;
`;
const NavbarBrand = styled(NavbarLink)`
  font-size: 1.2rem;
`;

export default Header;
