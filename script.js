function initialize(){
    let arrayCounter = 0;
    document.querySelector('#bm').classList.add('hidden');
    for(const element of essenceSheet){
        const addBox = document.createElement('div');
        addBox.className = 'pImgBox'

        const addP = document.createElement('p');
        addP.textContent = element.name;
        
        const addSample = document.createElement('img');
        addSample.src = element.sample;

        const addInfo = document.createElement('p');
        addInfo.className = 'textInfo';
        addInfo.classList.add('hidden');
        addInfo.textContent = element.info;

        essence[arrayCounter].appendChild(addBox);
        essence[arrayCounter].appendChild(addInfo);
        essence[arrayCounter].querySelector('div').appendChild(addP);
        essence[arrayCounter].querySelector('div').appendChild(addSample);
        
        const addClickB = document.createElement('div');
        addClickB.className = 'essenceClickBox';
        essence[arrayCounter].appendChild(addClickB);
        
        const addA = document.createElement('a');
        const addA2 = document.createElement('a');
        addA.className = 'details';
        addA2.className = 'bmStar';
        essence[arrayCounter].querySelectorAll('div')[1].appendChild(addA);
        essence[arrayCounter].querySelectorAll('div')[1].appendChild(addA2);
        
        const addChevronCircle = document.createElement('img');
        const addStar = document.createElement('img');
        addStar.className = ('noBm');
        addChevronCircle.src = chevronLinkDown;
        addStar.src = bookmarkStarLinkAdd;
        addClickB.querySelectorAll('a')[0].appendChild(addChevronCircle);
        addClickB.querySelectorAll('a')[1].appendChild(addStar);
        arrayCounter++;
    }
}


function toggleInfo(event){
    
    const text = event.currentTarget.parentNode.parentNode.querySelector('.textInfo');
    console.log(text.classList);
    
    if(text.classList[1] === 'hidden'){
        text.classList.remove('hidden');
        const image = event.currentTarget.parentNode.parentNode.querySelector('.essenceClickBox').querySelector('.details').querySelector('img');
        image.src = chevronLinkUp;
        
    }
    else{
        const image = event.currentTarget.parentNode.parentNode.querySelector('.essenceClickBox').querySelector('.details').querySelector('img');
        image.src = chevronLinkDown;
        text.classList.add('hidden');
    }
}

function isEmpty(){
    if (document.querySelector('#preferiti').querySelectorAll('.essence').length !== 0){
        document.querySelector('#bm').classList.remove('hidden');
    }
    if (document.querySelector('#preferiti').querySelectorAll('.essence').length === 0){
        document.querySelector('#bm').classList.add('hidden');
    }
}

function toggleInBookMarks(event){
    
    
    const checkImg = event.currentTarget.querySelector('img');

    if(checkImg.className === 'noBm'){
        checkImg.src = bookmarkStarLinkRemove;
        checkImg.className = 'yesBm';
        const addBm = document.createElement('div');
        const addPImgBox = document.createElement('div');
        const addP = document.createElement('p');
        const addImg = document.createElement('img');
        const addDivBm = document.createElement('div');
        const addABm = document.createElement('a');
        const addClickImg = document.createElement('img')
        
        addBm.className = 'essence';
        addPImgBox.className = 'pImgBox';
        addDivBm.className = 'essenceClickBox';
        addABm.className = 'bmStar'

        addBm.appendChild(addPImgBox);
        addPImgBox.appendChild(addP);
        addPImgBox.appendChild(addImg);

        addBm.appendChild(addDivBm);
        addDivBm.appendChild(addABm);
        addABm.appendChild(addClickImg);

        addP.textContent = event.currentTarget.parentNode.parentNode.querySelector('p').textContent;

        addImg.src = event.currentTarget.parentNode.parentNode.querySelector('img').src;
        addClickImg.src = bookmarkStarLinkRemove;
        document.querySelector('#preferiti').appendChild(addBm);
        isEmpty();
    }
    else{
        const bookMarksList = document.querySelector('#preferiti').querySelectorAll('.essence');
        for(const which of bookMarksList){
            if (which.querySelector('p').textContent === event.currentTarget.parentNode.parentNode.querySelector('p').textContent){
                which.remove();
            }
        }
        checkImg.src = bookmarkStarLinkAdd;
        checkImg.className = 'noBm';
        isEmpty();
    }
    
    toRemove = document.querySelector('#preferiti').querySelectorAll('.bmStar');
    console.log(toRemove);

    for(const alredyIn of toRemove){
        alredyIn.addEventListener('click',removeFromBookMark);
    }   

}

function removeFromBookMark (event){
    const mainBoxStars = document.querySelector('#mainBox').querySelectorAll('.bmStar');

    for(const reset of mainBoxStars){
        if (reset.parentNode.parentNode.querySelector('p').textContent === event.currentTarget.parentNode.parentNode.querySelector('p').textContent){
            reset.querySelector('img').src = bookmarkStarLinkAdd;
            reset.querySelector('img').className = 'noBm';
        }
    }
    event.currentTarget.parentNode.parentNode.remove();
    isEmpty();
}


function essenceManager(){
    mainEssences = document.getElementById('mainBox').querySelectorAll('.essence');
    const target = textInput.value;
    
    
    for(const check of mainEssences){
        console.log(check.querySelector('p').textContent);
        console.log(target);
        if (!check.querySelector('p').textContent.indexOf(target)){
            check.classList.remove('hidden');
        }
        if(check.querySelector('p').textContent.indexOf(target)){
            
            check.classList.add('hidden');
        }
        if(target.indexOf('')){
            check.classList.remove('hidden');
        }
        }
}

const essence = document.querySelectorAll('.essence');

initialize();

let mainEssences;
let toRemove = document.querySelector('#preferiti').querySelectorAll('.bmStar');

const details = document.querySelectorAll('.details');
for (const detail of details){
    detail.addEventListener('click', toggleInfo);
}

const toToggle = document.querySelectorAll('.bmStar');
for(const bookmark of toToggle){
    bookmark.addEventListener('click', toggleInBookMarks );
}

const textInput = document.getElementById('searchBar');
textInput.addEventListener('keyup', essenceManager);

