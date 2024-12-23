import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import useauth from "../hooks/useauth";

export default function Home() {
  const {loading, user} = useauth();
  return (
    <>
      <Helmet>
        <title>Legal Ease | Home</title>
      </Helmet>
      <div className="">
        <div className= 'py-10 bg-[#F26724] text-center mt-5' >
        <h1 className="text-[#09053D] text-3xl font-extrabold" >
          Over a Thousand People Helped in Verdicts and Settlements
        </h1>
        <h2 className= 'text-xl font-bold text-white mt-4' >Delivering Justice and Maximizing Results for Our Clients</h2>
        </div>
        <Banner />
        <h2>hello</h2>
      </div>
    </>
  );
}
