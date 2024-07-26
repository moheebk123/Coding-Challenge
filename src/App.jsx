import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import {TabContext} from "./context/TabContext"
import Heading from "./components/Heading";

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/otp-form")
  }, [navigate])

  const [curTab, setTab] = useState("OTP Form")
  const [colorClass, setColorClass] = useState("text-white")

  const changeLink = (newTab) => {
    setTab(newTab)
    setColorClass(() => {
      if (newTab === "OTP Form") {
        return "text-white"
      } else if (newTab === "Course List") {
        return "text-green-900 opacity-85"
      } else if (newTab === "Batches") {
        return "text-indigo-900 opacity-85"
      }
    })
  }

  return (
    <TabContext.Provider value={{ curTab, changeLink }}>
      <Navbar />
      <Heading colorClass={colorClass} />
      <Outlet />
      <Logo />
    </TabContext.Provider>
  );
}

export default App;
