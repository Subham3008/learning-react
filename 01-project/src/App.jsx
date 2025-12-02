import React from "react";
import Card from "./components/card";

const team = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1694425773163-d8d730608767?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    name: "SOPHIE BENNETT",
    role: "PRODUCT DESIGNER",
    description: "Product Designer who focus on simplicity & usability",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Avantika Sen",
    role: "UI/UX Designer",
    description:
      "Designs modern interfaces with a strong focus on user experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1679217125041-6f81624038d4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Rohan Gupta",
    role: "Backend Developer",
    description:
      "Handles server-side logic using Node.js, Express and MongoDB.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1612536295020-34428662e57d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    name: "Diya Verma",
    role: "Full Stack Developer",
    description:
      "Works on both frontend and backend for complete web solutions.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543764477-646365e11da3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbGUlMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Kabir Sing",
    role: "Mobile App Developer",
    description: "Builds high-performance apps using React Native and Flutter.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517945577684-acd9255116a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Naina Khan",
    role: "QA Engineer",
    description:
      "Ensures bug-free delivery through manual and automated testing.",
  },
];

function App() {
  return (
    <div className="parent">
      {team.map(function (elem, idx) {
        return (
          <div key={idx}>
            <Card
              image={elem.image}
              name={elem.name}
              job={elem.role}
              description={elem.description}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
