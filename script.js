const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
let count = 5
let apiKey = "Ls1nVcYk1SUIFTmdmk_-TL-rgB-Ed-cof-m2IC5A1tM"
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//set api key

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true

    count = 30
  }
}

//helper function to set attributes on dom elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create elements for links & photos, Add to DOM

function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length

  // run function for each obj in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a")

    setAttributes(item, { href: photo.links.html, target: "_blank" })

    // create <img> for photo
    const img = document.createElement("img")

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded)

    // put img inside <a>, then put both inside imageContainer element
    item.appendChild(img)
    imageContainer.appendChild(item)
    if (img.getAttribute("alt") != null && img.getAttribute("alt") != "null") {
      imageContainer.insertAdjacentHTML(
        "beforeend",
        `<span class="img-description">${img.getAttribute("title")}<span>`
      )
    }
  })
}

// get photos from unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()

    displayPhotos()
  } catch (error) {
    //catch error here
  }
}

// check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

//on load

getPhotos()
