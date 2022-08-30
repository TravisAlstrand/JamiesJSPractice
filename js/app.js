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

// Student Invite form elements
const studentNameInput = document.getElementById('studentName');
const studentProjectSelect = document.getElementById('projectSelect');
const inviteStudentButton = document.getElementById('inviteStudentButton');

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
  let anyChecked = true;

  if (htmlIsChecked === false && cssIsChecked === false && jsIsChecked === false) {
    anyChecked = false;
  }

  // validate form before creating project card
  validateForm();

  // append new li to project list ul
  projectList.insertAdjacentHTML('beforeend', projectHTML);

  // add new project to select list
  addProjectToSelect(projectName);
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

inviteStudentButton.addEventListener('click', e => {});

closeIcon.addEventListener('click', () => {});

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
const validateForm = (title, anyChecked, description) => {

};