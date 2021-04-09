// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", writeBtn);

// Function to create buttons with the value of whatever was typed in the search bar
function writeBtn(){
const inputBoxEl = document.getElementById("inputBox"); //Selectors
const searchListEl = document.getElementById("searchList"); 

const newButtonText = inputBoxEl.value; // New variable based on the string typed into the input box

searchListEl.insertAdjacentHTML('afterend', '<button class="searchres">'+ newButtonText +'</button>'); // Creates button elements under the search list element and gives them newButtonText
}






