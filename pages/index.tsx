import Link from "next/link";
import Navbar from "../app/components/navbar";
import Dashboard from "./dashboard";
import dynamic from "next/dynamic";
import Loading from "../app/components/loading";

const CardDashboard = dynamic(()=>import("../app/components/CardComponent"),{
  ssr:false,
  loading:()=><Loading/>
})

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
    </div>
  
  );
}
