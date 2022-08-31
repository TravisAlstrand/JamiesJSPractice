/* *****************************************************
  Variables
***************************************************** */
// Alert Notification Banner
const alertMessage = document.getElementById('notification');
const closeIcon = document.querySelector('.close-icon');

// Projects list UL
const projectList = document.getElementById('projectList');

// Project form elements
const projectNameInput = document.getElementById('projectName');
const projectHTMLCheckbox = document.getElementById('html');
const projectCSSCheckbox = document.getElementById('css');
const projectJSCheckbox = document.getElementById('js');
const projectDetailsInput = document.getElementById('projectDetails');
const addProjectButton = document.getElementById('addProjectButton');
const resetProjectButton = document.getElementById('resetProjectButton');

// Student Invite form elements
const studentNameInput = document.getElementById('studentName');
const studentProjectSelect = document.getElementById('projectSelect');
const inviteStudentButton = document.getElementById('inviteStudentButton');
const resetInviteButton = document.getElementById('resetInviteButton');

// variable to store validation errors
let notificationText = "";

/* =======================CREATE NEW PROJECT==================================================== */

// Event Listeners
addProjectButton.addEventListener('click', e => {
  // prevent page reload
  e.preventDefault();

  // store the project name
  const projectName = projectNameInput.value;

  // store the checkbox states
  const htmlIsChecked = projectHTMLCheckbox.checked;
  const cssIsChecked = projectCSSCheckbox.checked;
  const jsIsChecked = projectJSCheckbox.checked;

  // store the project details
  const projectDetails = projectDetailsInput.value;

  // variable to store new project's html
  let projectHTML = `
    <li class="project">
      <div class="project-header flex">
        <h3 class="project-name">${projectName}</h3>
        <img class="plus-icon pointer" src="icons/plus-icon.svg" alt="Plus Icon Expand Details">
        <ul class="project-langs flex">
  `;

  // check checkbox states
  if (htmlIsChecked) {
    projectHTML += `<li class="project-lang"><img class="html" src="icons/html5.svg" alt="HTML5 Logo"></li>`;
  }
  if (cssIsChecked) {
    projectHTML += `<li class="project-lang"><img class="css" src="icons/css3.svg" alt="CSS3 Logo"></li>`;
  }
  if (jsIsChecked) {
    projectHTML += `<li class="project-lang"><img class="js" src="icons/javascript.svg" alt="JavaScript Logo"></li>`;
  }

  // finish off html & add project details
  projectHTML += `
        </ul>
      </div>
      <p class="project-info hidden">${projectDetails}</p>
    </li>
  `;

  // check if any checkboxes were selected
  let anyChecked;

  if (htmlIsChecked === false && cssIsChecked === false && jsIsChecked === false) {
    anyChecked = false;
  } else {
    anyChecked = true;
  }

  // validate form before creating project card
  const isValid = isProjectFormValid(projectName, anyChecked, projectDetails);

  // if form is invalid and message is not currently visible
  if (!isValid && alertMessage.classList.contains('hidden')) {
    // add error html to alert <p>
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
    // give the alert message the warning class
    alertMessage.classList.add('warning');
    // make alert message visible
    alertMessage.classList.remove('hidden');
  } else if (!isValid && alertMessage.getAttribute('display') !== 'none') {
    // give the alert message the warning class
    alertMessage.classList.add('warning');
    // reset alert message text to nothing
    alertMessage.firstElementChild.firstElementChild.innerHTML = "";
    // set alert message text
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
  } else if (isValid) {
    alertMessage.setAttribute('display', 'inherit');
    // remove warning class
    alertMessage.classList.remove('warning');
    // add success class
    alertMessage.classList.add('success');
    // reset alertMessage text
    notificationText = "Project added successfully!";
    // add alertMessage text
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
    // remove warning class
    alertMessage.classList.remove('hidden');
    // if form is valid append new li to project list ul
    projectList.insertAdjacentHTML('beforeend', projectHTML);

    // add new project to select list
    addProjectToSelect(projectName);
  }
});

/* ==============================TOGGLE PROJECT INFO VISIBILITY============================================= */

projectList.addEventListener('click', e => {

  // check if + button was clicked 
  if (e.target.classList.contains('plus-icon')) {
    // target the parent div
    const parent = e.target.parentNode;
    // target the project info p 
    const infoP = parent.nextElementSibling;
    // toggle visibility of project info
    infoP.classList.toggle('hidden');
  }
});

/* =========================================================================== */

inviteStudentButton.addEventListener('click', (e) => {

  e.preventDefault();

  const studentName = studentNameInput.value;
  const projectSelected = studentProjectSelect.value;

  // check if form fields are valid
  const isValid = isInviteFormValid(studentName, projectSelected);
  
  // if form is invalid and message is not currently visible
  if (!isValid && alertMessage.classList.contains('hidden')) {
    // add error html to alert <p>
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
    // give the alert message the warning class
    alertMessage.classList.add('warning');
    // make alert message visible
    alertMessage.classList.remove('hidden');
  } else if (!isValid && alertMessage.getAttribute('display') !== 'none') {
    // give the alert message the warning class
    alertMessage.classList.add('warning');
    // reset alert message text to nothing
    alertMessage.firstElementChild.firstElementChild.innerHTML = "";
    // set alert message text
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
  } else if (isValid) {
    alertMessage.setAttribute('display', 'inherit');
    // remove warning class
    alertMessage.classList.remove('warning');
    // add success class
    alertMessage.classList.add('success');
    // reset alertMessage text
    notificationText = `${projectSelected} invitation successfully sent to ${studentName}!`;
    // add alertMessage text
    alertMessage.firstElementChild.firstElementChild.innerHTML = notificationText;
    // remove warning class
    alertMessage.classList.remove('hidden');
  }

  // scroll window to top of page
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

/* ==============================CLOSE ALERT MESSAGE============================================= */

closeIcon.addEventListener('click', () => {
  alertMessage.classList.add('hidden');
});

/* ==============================ADD NEW PROJECT TO SELECT FORM============================================= */

// function to add projects to select menu
const addProjectToSelect = (projectTitle) => {

  // target select options
  // creating this array each time to not double existing select options
  let projects = Array.from(studentProjectSelect.children);

  // create html for new option
  const option = `<option value="${projectTitle}">${projectTitle}</option>`;

  // push new option to array
  projects.push(option);
  
  // create options
  for (let i = 0; i < projects.length; i++) {
    studentProjectSelect.insertAdjacentHTML('beforeend', projects[i]);
  }
};

/* ==============================CHECK PROJECT FORM VALIDATION============================================= */



const isProjectFormValid = (title, anyChecked, description) => {

  // reset to empty string everytime to avoid duplicates
  notificationText = "";

  // every combination of error scenarios 
  if (title === "" && anyChecked === true && description !== "") {
    notificationText = "Please provide a title."
  }
  else if (anyChecked === false && title !== "" && description !== "") {
    notificationText = " Please choose atleast one project language."
  }
  else if (description === "" && title !== "" && anyChecked === true) {
    notificationText = " Please provide a description."
  }
  else if (title === "" && anyChecked === false && description !== "") {
    notificationText = "Please provide a title and choose at least one project language."
  } 
  else if (title === "" && description === "" && anyChecked === true) {
    notificationText = "Please provide a title and description."
  }
  else if (anyChecked === false && description === "" && title !== "") {
    notificationText = "Please choose at least one project language and provide a description."
  }
  else if (title === "" && anyChecked === false && description === "") {
    notificationText = "Please provide a title, description and choose at least one project language."
  }

  // if no error return true, false if one occured
  if (notificationText === "") {
    return true;
  } else {
    return false;
  }
};

/* ==============================CHECK INVITE FORM VALIDATION============================================= */
const isInviteFormValid = (name, project) => {

  // reset to empty string everytime to avoid duplicates
  notificationText = "";

  // every combination of error scenarios 
  if (name === "" && project === "") {
    notificationText = "Please provide a student name and select a project."
  }
  else if (name === "" && project !== "") {
    notificationText = "Please provide a student name."
  }
  else if (name !== "" && project === "") {
    notificationText = "Please select a project."
  }

  // if no error return true, false if one occured
  if (notificationText === "") {
    return true;
  } else {
    return false;
  }

};

/* ==============================RESET PROJECT FORM============================================= */

resetProjectButton.addEventListener('click', (e) => {

  e.preventDefault();

  // reset all input fields in project form
  projectNameInput.value = "";

  if (projectHTMLCheckbox.checked === true) {
    projectHTMLCheckbox.checked = false;
  }

  if (projectCSSCheckbox.checked === true) {
    projectCSSCheckbox.checked = false;
  }

  if (projectJSCheckbox.checked === true) {
    projectJSCheckbox.checked = false;
  }

  projectDetails.value = "";
});

/* ==============================RESET INVITE FORM============================================= */

resetInviteButton.addEventListener('click', (e) => {

  e.preventDefault();

  // reset both input fields in invite form
  studentNameInput.value = "";

  studentProjectSelect.value = "";
});