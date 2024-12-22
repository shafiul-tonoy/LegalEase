import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Legal Ease | Home</title>
      </Helmet>
      <div className='w-full md:w-10/12 mx-auto md:p-7'>
        <h1>Home</h1>
      </div>
    </>
  );
}
