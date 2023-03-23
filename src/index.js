let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


/*

1) Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
2) Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
3) Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM


*/

// Creating rederToy function
function renderToy(toy) {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  toyCollection.append(toyCard)
}




// 1) Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
const toyCollection = document.querySelector('#toy-collection')
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(toys => { 
  toys.forEach(toy => {
    renderToy(toy)
  })
})


// 2) Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM
const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => {
    renderToy(toy)
  })
})



// 3) Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM
toyCollection.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
    const toyCard = e.target.closest('.card')
    const likes = toyCard.querySelector('p')
    const likesNum = parseInt(likes.textContent) + 1
    const id = toyCard.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likesNum
      })
    })
    .then(res => res.json())
    .then(toy => {
      likes.textContent = `${toy.likes} Likes`
    })
  }
})

