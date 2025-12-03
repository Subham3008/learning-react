import React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function Center(props) {
  return (
    <div className="flex h-[86vh] w-full pb-16 pt-6 px-15">
      <LeftContent />
      <RightContent users={props.users} />
    </div>
  );
}

export default Center;
