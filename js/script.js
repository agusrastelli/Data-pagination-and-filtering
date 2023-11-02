/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const itemsPerPage = 9;
const students = data

/** 
 *    `showPage` function displays a page of student elements based on user's selection.
 *    @param {array} list - List of student objects.
 *    @param {number} page - Page number selected by user.
 *    @returns None.
 **/

function showPage(list, page) {
 // Calculate the start and end indices for the current page.
  const startIndex = (page  * itemsPerPage) - itemsPerPage
  const endIndex = page  * itemsPerPage

// Select the student list container and clear its content.
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

// Loop through the list and display students within the specified range.
   for (let i = 0; i < list.length; i++) {
   if (i  >= startIndex && i < endIndex) {
     const student = list[i];
     const studentItem = document.createElement('li');
     studentItem.className = `student-item cf`;
     studentItem.innerHTML = `
      <div class="student-details">
          <img class="avatar" src="${student.picture.medium}" alt="Profile Picture">
          <h3>${student.name.first} ${student.name.last}</h3>
          <span class="email">${student.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${student.registered.date}</span>
        </div>
      `;
      
     studentList.appendChild(studentItem);
     }
   }       
}

/**
 * `addPagination` function creates and appends pagination buttons to navigate through student data.
 * Calls the `showPage` function when a button is clicked.
 * @param {array} list - List of student objects.
 * @returns None.
 */

function addPagination(list) {
 // Calculate the number of pages needed to display all students.  
const numOfPages =  Math.ceil(list.length / itemsPerPage);

// Select the pagination button container and clear its content.
const linkList = document.querySelector('.link-list');
linkList.innerHTML = '';

// Create pagination buttons and add them to the container.
  for (let i = 1; i <= numOfPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    const listItem = document.createElement('li');
    listItem.appendChild(button);
    linkList.appendChild(listItem);

// Add 'active' class to the first button for initial selection.
   if (i === 1) {
    button.classList.add('active');
   }
  }

// Add an event listener to handle button clicks and update the displayed page.
  linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const activeButton = linkList.querySelector('.active');
      activeButton.classList.remove('active');
      e.target.classList.add('active');
      showPage(list, parseInt(e.target.textContent));
   }
});
}

/** 
 *    `showAndEnableSearch` function displays a search bar and filters results based on user input.
 *    @param {array} list - Array of student objects.
 *    @returns None.
 **/

function showAndEnableSearch(list){
 // Select necessary elements for search functionality.
   const header = document.querySelector('header')
   const ul = document.querySelector('.student-list')
   const ulPagination = document.querySelector('.link-list')

 // Create and insert the search bar into the header.
   const html = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`
   header.insertAdjacentHTML('beforeend', html)

 // Add a keyup event listener to filter the student list based on user input.
   header.addEventListener('keyup', (e)=> {
      const filteredList = []
      const input = e.target.value.toLowerCase()

      for (let i = 0; i < list.length; i++){
         const fullName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
         if (fullName.includes(input)){
            filteredList.push(list[i])
         }
      }
      if (filteredList.length > 0){
         addPagination(filteredList)
         showPage(filteredList, 1)
      } else {
         ul.innerHTML = `<h3>No results found.</h3>`
         ulPagination.innerHTML = ''
      }
   })
}
   // Call functions to initialize the page.
   showPage(students, 1);
   addPagination(students);
   showAndEnableSearch(students);
