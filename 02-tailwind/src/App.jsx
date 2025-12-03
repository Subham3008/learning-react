import React from "react";
import Section1 from "./components/section1/Section1";
import Section2 from "./components/section2/Section2";

function App() {
  const users = [
    {
      img: "https://plus.unsplash.com/premium_photo-1661592908061-93c25cf248ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      intro: "",
      tag: "Satisfied",
      color: "blue",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661504571994-c43e6eaacbf7?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      intro: "",
      tag: "Underserved",
      color: "#8da832",
    },
    {
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      intro: "",
      tag: "Underbanked",
      color: "#7d32a8",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661775190861-2dc4e2c223fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      intro: "",
      tag: "Qualified",
      color: "#a8328c",
    },
  ];
  return (
    <div>
      <Section1 users={users} />
      <Section2 />
    </div>
  );
}

export default App;
