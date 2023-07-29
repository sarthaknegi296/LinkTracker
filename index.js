let myLinks = [];

const inputEl = document.getElementById("input-el");
const ulEL = document.getElementById("ul-el");

const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if(linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    render(myLinks);
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLinks.push(tabs[0].url);
        localStorage.setItem("myLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
   
})

function render(links) {
    let listItems = ""; 
    for(let i = 0;i < links.length;i++) {
        listItems += 
            `<li>
                <a target='_blank' href="${links[i]}">
                    ${links[i]}
                </a>
            </li>`;
    }
    ulEL.innerHTML = listItems;
}


deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
})


inputBtn.addEventListener("click", () => {
    myLinks.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);    
});
