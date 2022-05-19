const toggleSpinner=DisplayStyle=>{
  document.getElementById('spinner').style.display=DisplayStyle;
}

 const searchFood=() =>{
   //previous search  result clear content
    const result=document.getElementById('search-result')
    result.textContent='';
    toggleSpinner('block')
    //previous food details clear text content
     const ContainerID=document.getElementById('result-Details');
     ContainerID.textContent='';
     //input field variables store
     const searchText=document.getElementById('search-field');
     const searchField=searchText.value;
    
    //  empty search text content stor and clear
     const emptySearch=document.getElementById('empty');
     const missFind=document.getElementById('findMiss');
     missFind.textContent='';
     emptySearch.textContent='';

     if(searchField==''){
        const createH1=document.createElement('h1');
        createH1.innerText='write something man.....';
        emptySearch.appendChild(createH1);
     }else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField}`)
        .then(res => res.json())
        .then(data => loadDisplay(data.meals))   
     }
    

    searchText.value='';
 }

 //load display Search Result 

 const loadDisplay= (meal) =>{
    //no result text clear 
     const missFind=document.getElementById('findMiss');
     missFind.textContent='';

    if(meal==null){
        const h1=document.createElement('h1');
        h1.innerText="Search Result is not finding ......";
        missFind.appendChild(h1);
    }else{
        const containerDiv=document.getElementById('search-result');
        meal.forEach(mes => {
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`<div onclick="loadDetails(${mes.idMeal})" class="card">
            <img src="${mes.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${mes.strMeal}</h5>
              <p class="card-text">${mes.strInstructions.slice(0,200)}</p>
            </div>
          </div>`
          containerDiv.appendChild(div);
        
        })

    toggleSpinner('none')

    }
   
 }


const loadDetails=(ID) =>                                                                               {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
    .then(res => res.json())
    .then(data => DisplayLoadDetails(data.meals[0]))
}                                                                                                          
//load Display food details Call Details API          
const DisplayLoadDetails=(mel) =>{
     const ContainerID=document.getElementById('result-Details');
     ContainerID.textContent='';

     const div=document.createElement('div');
     div.classList.add('div');
     div.innerHTML=`  
     <img height="300px" width="250px" src="${mel.strMealThumb}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${mel.strMeal}</h5>
       <p class="card-text">${mel.strInstructions.slice(0,250)}</p>
       <a href="${mel.strYoutube}" class="btn btn-primary">Go somewhere</a>
     </div>
   `
    ContainerID.appendChild(div);
   
}