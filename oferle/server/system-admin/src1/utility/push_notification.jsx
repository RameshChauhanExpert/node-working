import React from "react"

export var pushNotification=()=>{

    Notification.requestPermission((status) => {
        // status is "granted", if accepted by user
        var n = new Notification('Wooh mama', {
          body: 'Hello I am  Jhonny bravo',
          icon: 'https://cdn.shopify.com/s/files/1/1325/3287/products/cn407-btw1_8e81203e-ecba-44ec-9721-7465651eba96.jpg?v=1536176359' // optional
        })
      })     
}