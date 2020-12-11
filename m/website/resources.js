let category = [
    'depression',
    'anxiety',
    'stress',
    'mindfulness',
    'substanceuse',
    'trauma',
    'chronicpain',
    'loneliness',
    'eatingdisorders',
    'suicide'
]

function filterResources() {
    let selection1 = document.getElementById("resourceDropDown1");
    let selection2 = document.getElementById("resourceDropDown2");
    let resources = document.getElementsByClassName("resource");
    let resourceTitles = document.getElementsByClassName('resourceTitle')

    for (element of resourceTitles) {
        if (element.id !== selection1.value+'t' && element.id !== selection2.value+"t" && selection1.value !== "all") {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden");
        }
        
    }
    for (element of resources) {
        if (element.id !== selection1.value && element.id !== selection2.value && selection1.value !== "all") {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden");
        }
        
    }
}
// Self-Management, Cognitive Modification, Skills Training, Illness Management, Passive-Symptom Tracking

function fetchResources() {
    fetch('/api/resources')
        .then(response => response.json())
        .then(resources => {
            console.log(resources);
            for (resource of  Object.keys(resources)) {
                console.log(resources)
                buildResources(resources[resource],resource)
            }
        })
}

function buildResources(resources, category) {
    let resourceList = document.getElementById(category)
    for (i = 0; i < resources.length; i++) {
        let resourceChild = makeResource(resources[i])
        resourceList.appendChild(resourceChild)
    }
}

function makeResource(resource) {
//     <div class="card">
//     <img class="card-img-top" src="..." alt="Card image cap">
//     <div class="card-body">
//       <h5 class="card-title">Card title</h5>
//       <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//     </div>
//   </div>
    let resourceDiv = document.createElement('div')
    resourceDiv.classList.add('card')
    let cardImage = document.createElement('img')
    cardImage.classList.add('card-image')
    cardImage.setAttribute('src','/Pictures/'+resource.image)
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    let resourceName = document.createElement('h3')
    resourceName.classList.add('card-title')
    resourceName.textContent = resource.name

    let description = document.createElement('p')
    description.classList.add('card-text')
    description.textContent = resource.description

    let link = document.createElement('a')
    link.setAttribute('href', resource.link)
    link.textContent = resource.link

    let phone = document.createElement('a')
    phone.setAttribute('href', 'tel:' + resource.phone)
    phone.textContent = resource.phone
    resourceDiv.appendChild(cardBody)
    cardBody.appendChild(cardImage)
    cardBody.appendChild(resourceName)
    cardBody.appendChild(description)
    cardBody.appendChild(link)
    // cardBody.appendChild(document.createElement('br'))
    cardBody.appendChild(phone)

    return resourceDiv
}


function goback() {
    window.location = "../Resources.html"
}
