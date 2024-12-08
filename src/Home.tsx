import { Link } from 'react-router';
import Setting from './Setting';
import Table from './Table';
import Basic from './Fotm';

const Home = () => {
  return (
    <>
      <h1>home</h1>

      <Setting />

      <Table />

      <Basic />

      <br />
      <Link to={'/about'}>about</Link>
    </>
  );
};

export default Home;
