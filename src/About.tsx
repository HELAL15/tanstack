import { Link } from 'react-router';
import TableCrud from './TableCrud';

const About = () => {
  return (
    <>
      <h2>about</h2>
      <br />
      <Link to={'/'}>home</Link>
      <TableCrud />
    </>
  );
};

export default About;
