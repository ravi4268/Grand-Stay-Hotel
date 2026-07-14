import React, { useEffect, useState } from "react";
import "./GamePlace.css";

const API_URL="http://localhost:3001/api/gameplace";

function GamePalace(){

const[games,setGames]=useState([]);

useEffect(()=>{
fetchGames();
},[]);

const fetchGames=async()=>{

const res=await fetch(API_URL);

const result=await res.json();

if(result.success){
setGames(result.data);
}

};

return(

<div className="game-palace">

<div className="game-header">
<h1>🎮 Game Palace</h1>
<p>Located on the 8th Floor of Our Luxury Hotel</p>
</div>

<div className="games-grid">

{games.map((game)=>(

<div className="game-card" key={game._id}>

<img src={game.image} alt={game.title}/>

<div className="game-content">

<h3>{game.title}</h3>

<p>{game.desc}</p>

</div>

</div>

))}

</div>

</div>

);

}

export default GamePalace;