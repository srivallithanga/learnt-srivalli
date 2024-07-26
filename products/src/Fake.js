import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Fake(){
    // let fakeInitial=[{title:"Default name",price:"default status",description:"default",category:"default",image:"default",rating:"default"}];
    let [details,setDetails]=useState([]);
    // let [getTitle,setTitle]=useState("Default title");
    // let [getOrice,setPrice]=useState("Default price");
    // let [getDescription,setDescription]=useState("Default Description");
    useEffect(function(){
        console.log("function is called on load");
        getDetails();
    },[]);
    function getDetails(){
        axios
        .get("https://fakestoreapi.com/products")
            .then(function (response){
                console.log(response.data);
                setDetails(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    // function ProductDetailsComponent() {
    //     const { id } = useParams();
    //     const [details, setDetails] = useState(null);
      
    //     useEffect(() => {
    //       axios.get(`https://fakestoreapi.com/products/${id}`).then(response => {
    //         setDetails(response.data);
    //       });
    //     }, [id]);
    // }
    return (
        <div className="fake">
            <h1>Fake Store Details</h1>
            {details.map(function(val, index) {
                return (
                    <div key={index} className="product-card">
                        <b>Title:</b> {val.title}
                        <div>
                            <b>Price:</b> ${val.price}
                        </div>
                        <div>
                            <b>Description:</b> {val.description}
                        </div>
                        <div>
                            <b>Category:</b> {val.category}
                        </div>
                        <div>
                            <b>Image:</b> <img src={val.image} alt={val.title} className="product-image" />
                        </div>
                        <div>
                            <b>Rating:</b> {val.rating.rate}
                            <b>Count:</b> {val.rating.count}
                        </div>
                        {/* <button onClick={() => window.location.href = `/AllProducts/${val.id}`}>Details</button> */}
                        <Link to={`/product/${val.id}`}><button>Details</button></Link>
                    </div>
                );
            })}
        </div>
    )
}

export default Fake;