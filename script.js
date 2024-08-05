// Clear value on reset button
function reset()
{
document.getElementById("search").value="";
let clearAll=document.getElementById("get");
while (clearAll.firstChild) {
    clearAll.removeChild(clearAll.firstChild);
}
}

// fetch data based on user input
async function search()
{
   let searchText= document.getElementById("search").value;

   if(searchText!="")
   {

try{

let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
let dictData = await data.json();


let listItems=document.getElementById("get");
while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
}

let titleCase = "";
let searchWord= dictData[0].word;
searchWord.split(" ").forEach(word => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    titleCase += capitalizedWord + " ";
});

// populating api data in list items
let ul1=document.getElementById("get");
let li1 = document.createElement('li');
li1.className="list-group-item";
li1.innerHTML = `<b>Word:</b> ${titleCase}`;
ul1.appendChild(li1);

for(let i=0; i<dictData[0].meanings.length;i++)
{
let ul2=document.getElementById("get");
let li2 = document.createElement('li');
li2.className="list-group-item";
li2.innerHTML =`<b>Part of Speech:</b> "${dictData[0].meanings[i].partOfSpeech}"`;
ul2.appendChild(li2);
let li3 = document.createElement('li');
li3.className="list-group-item";
li3.innerHTML=`<b>Definition:</b> ${dictData[0].meanings[i].definitions[0].definition}`;
ul2.appendChild(li3);

}

let ul3=document.getElementById("get");
let li4 = document.createElement('li');
li4.className="list-group-item";
li4.innerHTML =`<b>Source URL:</b> ${dictData[0].sourceUrls[0]}`;
ul3.appendChild(li4);
}

//catch block for api
catch (error) {
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
let dictData = await data.json();
    let listClear=document.getElementById("get");
    while (listClear.firstChild) {
        listClear.removeChild(listClear.firstChild);
    }
let li5 = document.createElement('li');
li5.className="list-group-item";
li5.innerHTML = `<b>Word:</b> ${dictData.title}`;
listClear.appendChild(li5);
}
}
else{
    let clearList=document.getElementById("get");
    while (clearList.firstChild) {
        clearList.removeChild(clearList.firstChild);
    }
}
}


