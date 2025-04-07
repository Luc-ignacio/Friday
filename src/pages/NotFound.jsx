import React from "react";
import { Button } from "../components/button";

export const NotFound = () => {
  return (
    <div className="flex flex-col w-[95vw] md:w-[500px]">
      <img src="/not-found.png" alt="Page Not Found" />
      <Button
        text={"Back to Login"}
        customStyle={"w-fit px-4 mx-auto"}
        clicked={() => {
          window.location.href = "/login";
        }}
      />
    </div>
  );
};
