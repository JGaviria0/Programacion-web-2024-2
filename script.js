fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs"
    }
})
  //pasarlo a json
  .then(response => response.json())
  //procesar la info
  .then(data => {

    const list = document.getElementById("list");


    data.forEach( product => {
      const il = document.createElement("li");
      const images = JSON.parse(product.images)
      // const img = document.createElement("img");
      // img.src = images[0];
      const myhtml = ` 
        <div class="card" style="width: 18rem;">
          <img src="${images[0]}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.value}</p>
            <a class="btn btn-warning">Edit</a>
            <a onclick="deletePost(${product.id})" class="btn btn-danger">Delete</a>
          </div>
        </div>
      `; 
      il.innerHTML =  myhtml;
      list.appendChild(il); 
    })
  });


function sendForm(){
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const value = document.getElementById("value");
  const image = document.getElementById("image");
  const body ={
    title: title.value,
    description: description.value,
    value: value.value,
    images: [image.value] 
  }


  fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "POST", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    title.value = "";
    description.value = "";
    value.value = "";
    image.value = "";
    location.reload();
  })

}

function deletePost(id){
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
    },
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    location.reload();
  })
}