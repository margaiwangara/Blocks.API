import Link from 'next/link';

function Route() {
  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/register">
        <a>Register</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  );
}

export default Route;
