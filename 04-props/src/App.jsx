import React from "react";
import Card from "./components/Card";

const App = () => {
  const posts = [
    {
      name: "Iron Man",
      image:
        "https://i.pinimg.com/736x/d8/9d/ee/d89deed5b149094e9f97a02a6fc19764.jpg",
      likes: "12.5k",
      post: 45,
      views: 25000,
      description: "Genius, billionaire, philanthropist.",
    },
    {
      name: "Captain America",
      image:
        "https://i.pinimg.com/736x/64/68/1c/64681c27076f1163c2e50c68de351c5d.jpg",
      likes: "9k",
      post: 38,
      views: 21000,
      description: "The first Avenger.",
    },
    {
      name: "Thor",
      image:
        "https://i.pinimg.com/736x/70/14/e0/7014e01471b17ccd33fe2dd4d195c776.jpg",
      likes: "15.2k",
      post: 50,
      views: 30000,
      description: "God of Thunder.",
    },
    {
      name: "Hulk",
      image:
        "https://i.pinimg.com/736x/38/5d/c7/385dc7243e7d637d54a1be7ea216bb43.jpg",
      likes: "11.5k",
      post: 32,
      views: 22000,
      description: "Smash everything.",
    },
    {
      name: "Spider-Man",
      image:
        "https://i.pinimg.com/736x/dc/ff/cb/dcffcb5d8c5080275e83796f264e35c6.jpg",
      likes: "30k",
      post: 60,
      views: 40000,
      description: "Friendly neighborhood hero.",
    },
    {
      name: "Batman",
      image:
        "https://i.pinimg.com/736x/ce/05/64/ce0564c18feb9344f0d0636498214beb.jpg",
      likes: "20k",
      post: 55,
      views: 35000,
      description: "The Dark Knight.",
    },
    {
      name: "Superman",
      image:
        "https://i.pinimg.com/736x/09/ac/e3/09ace37fb8460ded9b4f186f4890b594.jpg",
      likes: "16.2k",
      post: 48,
      views: 33000,
      description: "Man of Steel.",
    },
    {
      name: "Wonder Woman",
      image:
        "https://i.pinimg.com/1200x/29/bd/52/29bd522f97d4a609af59d500085a0f5f.jpg",
      likes: "14k",
      post: 42,
      views: 28000,
      description: "Amazon warrior.",
    },
    {
      name: "Black Panther",
      image:
        "https://i.pinimg.com/1200x/42/00/a8/4200a84e5de842e1bcd36ce95a05f57d.jpg",
      likes: "9k",
      post: 40,
      views: 26000,
      description: "King of Wakanda.",
    },
    {
      name: "Flash",
      image:
        "https://i.pinimg.com/1200x/c8/8b/03/c88b03ab8df06781b8cde0d7378fa5bc.jpg",
      likes: 900,
      post: 28,
      views: 19000,
      description: "Fastest man alive.",
    },
  ];

  return (
    <div className="h-fit bg-gray-400 text-white p-4 flex gap-4 flex-wrap items-center justify-center">
      {posts.map(function (elem, idx) {
        return (
          <Card
            key={idx}
            image={elem.image}
            name={elem.name}
            description={elem.description}
            posts={elem.post}
            likes={elem.likes}
            views={elem.views}
          />
        );
      })}
    </div>
  );
};

export default App;
