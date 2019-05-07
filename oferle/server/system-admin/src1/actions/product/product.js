import React from "react";
export var fetch_product=(dipatch,state)=>
{

    console.log("dispatch",dipatch)
    console.log("state",state)
     fetch("/products/ProductList/");
    //console.log(res)
    console.log("Successfully done")
}