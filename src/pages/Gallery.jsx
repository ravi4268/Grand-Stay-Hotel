import React, { useEffect, useState } from "react";
import "./Gallery.css";

const API_URL = "http://localhost:3001/api/gallery";
const IMAGE_URL = "http://localhost:3001/";


function Gallery() {

  const [galleryData, setGalleryData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);


  // Demo Images (agar backend me image nahi hai)
  const demoImages = [
    {
      _id: 1,
      title: "Luxury Room",
      category: "Rooms",
      imgUrl:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
    },
    {
      _id: 2,
      title: "Hotel Dining",
      category: "Dining",
      imgUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    {
      _id: 3,
      title: "Swimming Pool",
      category: "Amenities",
      imgUrl:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
    },
    {
      _id: 4,
      title: "Beautiful View",
      category: "Views",
      imgUrl:
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6"
    },
    {
      _id: 5,
      title: "Spa Wellness",
      category: "Wellness",
      imgUrl:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
    }
  ];



  useEffect(() => {
    fetchGallery();
  }, []);



  const fetchGallery = async () => {

    try {

      const res = await fetch(API_URL);

      const result = await res.json();


      if(result.success){

        setGalleryData(result.data);

      }


    } catch(error){

      console.log(error);

    }

  };




  const deleteImage = async(id)=>{


    if(!window.confirm("Delete Image?")) return;


    try{

      const res = await fetch(
        `${API_URL}/${id}`,
        {
          method:"DELETE"
        }
      );


      const result = await res.json();


      if(result.success){

        fetchGallery();

      }


    }
    catch(error){

      console.log(error);

    }

  };




  const images =
    galleryData.length > 0
    ? galleryData
    : demoImages;




  const filteredImages =
    activeFilter === "All"
    ? images
    :
    images.filter(
      item =>
      item.category === activeFilter
    );





  // Image URL Function

  const getImageUrl=(image)=>{

    if(image.startsWith("http")){

      return image;

    }

    return IMAGE_URL + image;

  };





return (

<div className="gallery-page">


<h1>Hotel Gallery</h1>



<div className="filter-buttons">


{
[
"All",
"Rooms",
"Dining",
"Amenities",
"Views",
"Wellness"

].map(item=>(


<button

key={item}

onClick={()=>setActiveFilter(item)}

>

{item}

</button>


))

}


</div>





<div className="gallery-grid">


{

filteredImages.map(item=>(


<div
className="gallery-card"
key={item._id}
>



<img

src={getImageUrl(item.imgUrl)}

alt={item.title}

onClick={()=>
setLightboxImage(item)
}

/>



<div className="gallery-content">


<h3>

{item.title}

</h3>


<p>

{item.category}

</p>



{
galleryData.length > 0 &&

<button

onClick={()=>deleteImage(item._id)}

>

Delete

</button>

}



</div>


</div>



))

}



</div>






{
lightboxImage &&


<div

className="lightbox"

onClick={()=>
setLightboxImage(null)
}

>


<img

src={
getImageUrl(
lightboxImage.imgUrl
)
}

alt={lightboxImage.title}

/>


</div>


}



</div>

);


}


export default Gallery;