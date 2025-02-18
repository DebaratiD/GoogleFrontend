import Link from "next/link";
import Navbar from "./components/navbar";
import Dashboard from "./dashboard/page";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
    </div>
  
  );
}
