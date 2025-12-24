import React from "react";
import Card from "./components/Card";

const App = () => {
  const posts = [
    {
      name: "Iron Man",
      image:
        "https://cdn.dribbble.com/users/1162077/screenshots/3848914/ironman.png",
      likes: 1200,
      post: 45,
      views: 25000,
      description: "Genius, billionaire, playboy, philanthropist.",
    },
    {
      name: "Captain America",
      image:
        "https://cdn.dribbble.com/users/113499/screenshots/1538734/captain-america.png",
      likes: 980,
      post: 38,
      views: 21000,
      description: "The first Avenger.",
    },
    {
      name: "Thor",
      image:
        "https://cdn.dribbble.com/users/1022485/screenshots/2758039/thor.png",
      likes: 1500,
      post: 50,
      views: 30000,
      description: "God of Thunder.",
    },
    {
      name: "Hulk",
      image:
        "https://cdn.dribbble.com/users/119254/screenshots/1462451/hulk.png",
      likes: 1100,
      post: 32,
      views: 22000,
      description: "Smash everything.",
    },
    {
      name: "Spider-Man",
      image:
        "https://cdn.dribbble.com/users/1787323/screenshots/3897368/spiderman.png",
      likes: 2000,
      post: 60,
      views: 40000,
      description: "Friendly neighborhood hero.",
    },
    {
      name: "Batman",
      image:
        "https://cdn.dribbble.com/users/1186261/screenshots/3718681/batman.png",
      likes: 1750,
      post: 55,
      views: 35000,
      description: "The Dark Knight.",
    },
    {
      name: "Superman",
      image:
        "https://cdn.dribbble.com/users/1751799/screenshots/3686077/superman.png",
      likes: 1600,
      post: 48,
      views: 33000,
      description: "Man of Steel.",
    },
    {
      name: "Wonder Woman",
      image:
        "https://cdn.dribbble.com/users/143058/screenshots/1449443/wonder_woman.png",
      likes: 1400,
      post: 42,
      views: 28000,
      description: "Amazon warrior.",
    },
    {
      name: "Black Panther",
      image:
        "https://cdn.dribbble.com/users/181704/screenshots/2552197/black-panther.png",
      likes: 1300,
      post: 40,
      views: 26000,
      description: "King of Wakanda.",
    },
    {
      name: "Flash",
      image:
        "https://cdn.dribbble.com/users/1126935/screenshots/2814427/flash.png",
      likes: 900,
      post: 28,
      views: 19000,
      description: "Fastest man alive.",
    },
  ];

  return <div className="h-screen bg-black text-white p-4 flex gap-4 flex-wrap">
      {/* <Card/>
      <Card/> */}
      {posts.map(function(){
        return <Card/>
      })}
  </div>;
};

export default App;
