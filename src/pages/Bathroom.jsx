import React,{useEffect,useState} from "react";
import "./Bathroom.css";


function Bathroom(){


const [bathrooms,setBathrooms]=useState([]);



useEffect(()=>{


fetch("http://localhost:3001/api/bathroom-suites")

.then(response=>response.json())

.then(result=>{

console.log(result);

setBathrooms(result.data);

})


.catch(error=>{

console.log(error);

});


},[]);



return(

<div className="bathroom-page">


<h2>
🛁 Bathroom Suite
</h2>



<div className="bathroom-container">


{

bathrooms.map((item)=>(


<div className="bathroom-card" key={item._id}>


<img
src={item.image}
alt={item.suite_name}
/>



<h3>
{item.suite_name}
</h3>



<p>
{
item.bathtub 
? "🛁 Bathtub Available"
:
"❌ No Bathtub"
}
</p>



<p>
{
item.shower
?
"🚿 Luxury Shower Available"
:
"❌ No Shower"
}
</p>



<h4>
Luxury Items
</h4>


<ul>

{
item.luxury_items.map((luxury,index)=>(

<li key={index}>
{luxury}
</li>

))
}


</ul>



</div>


))


}



</div>



</div>

)


}


export default Bathroom;