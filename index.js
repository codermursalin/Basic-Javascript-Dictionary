const input=document.querySelector('#input');
const search=document.querySelector('#search');
const notfound=document.querySelector('.not__found');
const audioBox=document.querySelector('.audio');
const loading =document.querySelector('.loading');
const def=document.querySelector('.def');
search.addEventListener('click',(e)=>{
    e.preventDefault();
    audioBox.innerHTML = '';
    notfound.innerText = '';
    def.innerText = '';
  let word=input.value;
    getData(word);
})
const getData=async(word)=>{
    const API_KEY=config.MY_API_TOKEN;
    loading.style.display='block';
    const apiData=await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);
    const realData=await apiData.json();
    if(realData.length===0){
        loading.style.display='none';
        notfound.innerHTML='No result found..';
        return;
    }
    if(typeof(realData[0])==='string'){
        loading.style.display='none';
        const heading=document.createElement('h3');
        heading.innerHTML='Did you mean?'
        notfound.appendChild(heading);
        realData.forEach(element => {
            const suggestion=document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notfound.appendChild(suggestion);

        });
        return;
    }

    loading.style.display='none';
    let defination=realData[0].shortdef[0];
    def.innerText=defination;
    let soundName=realData[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }
    
}
const renderSound=(soundName)=>{
    const API_KEY=config.MY_API_TOKEN;
  let subfolder = soundName.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${API_KEY}`;

  let aud = document.createElement('audio');
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);
}