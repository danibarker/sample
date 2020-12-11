let overallStress = 0;
let questionValue = 0;
let width = 0;
let stressColor = '';
let resourceResults=[];

let questions = [
    'Have you eaten in the last three hours?',
    'Have you showered in the past day?',
    'Have you stretched your legs in the past day?',
    'Have you said something nice to someone in the past day?',
    'Have you moved your body to music in the past day?',
    'Have you cuddled a living being in the past two days?',
    'Have you seen a therapist in the past few days?',
    'Have you changed any of your medications in the past couple of weeks, including skipped doses or a change in generic prescription brand?',
    'If daytime, are you dressed?',
    'If nighttime: are you sleepy and fatigued but resisting going to sleep?',
    'Do you feel ineffective?',
    'Do you feel unattractive?',
    'Do you feel paralyzed by indecision?',
    'Have you over-exerted yourself lately- physically, emotionally, socially, or intellectually?',
    'Have you waited a week?'
];


function nextQuestion(answerValue) {
    let questionText = document.getElementById('questionText');
    let question = document.getElementById('question');
    let progress = document.getElementById('progressFill');

    overallStress += answerValue;
    questionValue++;
    width += 7;
    progress.style.width = width + '%';
    question.classList.add('fade-out-bottom');
    setTimeout(next, 100)
    function next() {
        if (questionValue >= questions.length) {
            results();
        }
        else {
            questionText.textContent = questions[questionValue - 1];
            question.classList.remove('fade-out-bottom')
            if(questionValue==11){
                document.getElementById('answer1').setAttribute('onclick', 'nextQuestion(1)')
                document.getElementById('answer2').setAttribute('onclick', 'nextQuestion(0)')
            }
        }
    }
}

function results() {
    let input = document.getElementsByTagName('input');
    let color = document.getElementById('colorText');
    let progress = document.getElementById('progressFill');

    progress.textContent = 'Done!';
    questionText.style.display='none'
    progress.style.width = '100%';
    for (y = 0; y < input.length; y++) {
        input[y].classList.add('d-none');
    }
    question.classList.remove('fade-out-bottom')
    document.getElementById('stressBar').classList.remove('d-none')
    document.getElementById('recommendDiv').classList.remove('d-none');
    switch (overallStress) {
        case 0:
        case 0.5:
        case 1:
        case 1.5:
        case 2:
            color.textContent = 'minimal';
            color.style.color = 'violet';
            stressColor = 'Violet';
            break;
        case 2.5:
        case 3:
        case 3.5:
            color.textContent = 'minor';
            color.style.color = 'indigo';
            stressColor = 'Indigo';
            break;
        case 4:
        case 4.5:
        case 5:
        case 5.5:
        case 6:
            color.textContent = 'low';
            color.style.color = 'blue';
            stressColor = 'Blue';
            break;
        case 6.5:
        case 7:
        case 7.5:
        case 8:
        case 8.5:
        case 9:
            color.textContent = 'moderate';
            color.style.color = 'green';
            stressColor = 'Green';
            break;
        case 9.5:
        case 10:
        case 10.5:
        case 11:
            color.textContent = 'higher than average';
            color.style.color = 'yellow';
            stressColor = 'Yellow';
            break;
        case 11.5:
        case 12:
        case 12.5:
        case 13:
        case 13.5:
            color.textContent = 'moderately high';
            color.style.color = 'orange';
            stressColor = 'Orange';
            break;
        case 14:
        case 14.5:
        case 15:
            color.textContent = 'high';
            color.style.color = 'red';
            stressColor = 'Red';
            break;
    }
    overallStress /= 15
    overallStress *= 100
    document.getElementById('indicator').style.width = overallStress + '%'
    fetch('/api/resources')
        .then(response => response.json())
        .then(resources => {
            console.log(resources);
            buildResources(resources);
        })
}

function buildResources(resources) {
    for (resource of Object.keys(resources)) {
        searchResource(resources[resource])
    }
    console.log(resourceResults);
    let randomNumber1=Math.floor(Math.random()*resourceResults.length+1)
    console.log(randomNumber1)
    let chosenResult1=resourceResults.slice(randomNumber1-1,randomNumber1);
    console.log(chosenResult1);
    resourceResults.splice(randomNumber1-1,randomNumber1);
    console.log(resourceResults);
    let randomNumber2=Math.floor(Math.random()*resourceResults.length+1)
    console.log(randomNumber2)
    let chosenResult2=resourceResults.slice(randomNumber2-1,randomNumber2);
    console.log(chosenResult2);
    let resourceList1 = document.getElementById('resource1')
    let resourceList2 = document.getElementById('resource2')
    let resourceDiv1 = makeResource(chosenResult1[0])
    let resourceDiv2 = makeResource(chosenResult2[0])
    resourceList1.appendChild(resourceDiv1)
    resourceList2.appendChild(resourceDiv2)
}

function searchResource(resourceChoice) {
    resourceChoice.filter(function (resource) {
        let resourceTest = Object.values(resource)
        if (resourceTest.includes(stressColor)) {
            resourceResults.push(resource);
        }
    })
}

function makeResource(resource) {
    let resourceDiv = document.createElement('div')

    let resourceName = document.createElement('h3')
    resourceName.textContent = resource.name

    let description = document.createElement('p')
    description.textContent = resource.description

    let link = document.createElement('a')
    link.setAttribute('href', resource.link)
    link.textContent = resource.link

    let phone= document.createElement('a')
    phone.setAttribute('href', 'tel:'+resource.phone)
    phone.textContent = resource.phone

    resourceDiv.appendChild(resourceName)
    resourceDiv.appendChild(description)
    resourceDiv.appendChild(link)
    resourceDiv.appendChild(document.createElement('br'))
    resourceDiv.appendChild(phone)

    return resourceDiv
}




