import React from "react";
import GetNavBar from "../components/NavBars/GetNavBar";

const layout = async ({ children }) => {
  return (
    <div className="px-2 poppins-regular">
      <GetNavBar />
      {children}
    </div>
  );
};

export default layout;
