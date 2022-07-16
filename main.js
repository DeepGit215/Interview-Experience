const navigationBar = document.querySelectorAll('[data-nav-list]');
const addCompanyButton = document.querySelector('.Company-list__add-Company');
const CompanyModal = document.querySelector('.Company__modal-box');
const closeCompanyModal = document.querySelector('.close');
//Adding Company into the list
const addCompanyToList = document.querySelector('#add-Company');
const CompanyList = document.querySelector('.Company-system__Company-list');
const selectGenre = document.querySelector('#Company-genre');
const genreLogo = document.querySelector('.add-Company__genre-image');
//Removing the empty message display
const emptyMessage = document.querySelector('.Company-list__empty-item');

//Add Company into the list
const addCompany = () => {
    //Create a new item
    const newCompanyItem = document.createElement('div');
    newCompanyItem.className = 'Company-list__Company-item';

    //Place of Company description container
    const newCompanyDescriptionContainer = document.createElement('div');
    newCompanyDescriptionContainer.className = 'Company-description';

    //Place of trash bin for delete
    const trashBin = document.createElement('div');
    trashBin.className = 'trash-icon';
    trashBin.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
    trashBin.addEventListener('click', () => {
       CompanyList.removeChild(newCompanyItem);
       //Display empty message
       displayEmptyMessage();
    }); 

    //Place of logo
    const newCompanyLogo = document.createElement('div');
    newCompanyLogo.className = 'Company-logo';
    newCompanyLogo.innerHTML = changeCompanyLogo();
    
    //Company title
    const newCompanyTitle = document.createElement('h2');
    newCompanyTitle.textContent = document.querySelector('#Company-name').value;

    //Company genre
    const newCompanyGenre = document.createElement('div');
    newCompanyGenre.classList = 'Company-genre';
    newCompanyGenre.textContent = document.querySelector('#Company-genre').value;

    //Company rating
    const newCompanyRating = document.createElement('div');
    newCompanyRating.className = 'Company-rating';
    newCompanyRating.innerHTML = changeCompanyRating();
    //Company Status
    const newCompanyStatus=document.createElement('div');
    newCompanyStatus.className='Company-status';
    newCompanyStatus.innerHTML=changeCompanyStatus();

    //Company description
    const newCompanyDescription = document.createElement('p');
    newCompanyDescription.textContent = document.querySelector('#Company-description').value;

    //Validation in the add Company form
    if(validation(
        document.querySelector('#Company-name'), 
        document.querySelector('#Company-genre'), 
        document.querySelector('#Company-rating'),
        document.querySelector('#Company-status') ,
        document.querySelector('#Company-description')
    )) {
        CompanyModal.style.display = 'block';
        return;
    }

    //Append the description information inside the container
    newCompanyDescriptionContainer.appendChild(newCompanyTitle);
    newCompanyDescriptionContainer.appendChild(newCompanyGenre);
    newCompanyDescriptionContainer.appendChild(newCompanyRating);
    newCompanyDescriptionContainer.appendChild(newCompanyStatus);
    newCompanyDescriptionContainer.appendChild(newCompanyDescription);

    //Append the container
    newCompanyItem.appendChild(trashBin);
    newCompanyItem.appendChild(newCompanyLogo);
    newCompanyItem.appendChild(newCompanyDescriptionContainer)

    //Add the Company list into the container
    CompanyList.appendChild(newCompanyItem);

    //Close modal as the item is listed
    CompanyModal.style.display = 'none';
    clearFormat(document.querySelector('#Company-name'), 
        document.querySelector('#Company-genre'), 
        document.querySelector('#Company-rating'),
        document.querySelector('#Company-status') ,
        document.querySelector('#Company-description')
    );

    //Remove empty message
    displayEmptyMessage();
}

//Change the logo of Company according to genre
const changeCompanyLogo = () => {
    const genreLogo = document.querySelector('#Company-genre').value;
    switch(genreLogo) {
        case '4-5Lpa':
            return '<i class="fas fa-fighter-jet fa-7x"></i>';
        case '5-7Lpa':
            return '<i class="far fa-laugh fa-7x"></i>';
        case '8-10Lpa':
            return '<i class="fas fa-theater-masks fa-7x"></i>';
        case '10-15Lpa':
            return '<i class="fas fa-ghost fa-7x"></i>';
        case 'Dream Company':
            return '<i class="fas fa-heart fa-7x"></i>';
        default:
            return '';
    }
}

//Change the Company ratings
const changeCompanyRating = () => {
    const rating = document.querySelector('#Company-rating').value;
    
    return rating;
}
const changeCompanyStatus=()=>
{
    const Placed_status=document.querySelector('#Company-status').value;
    return  Placed_status;
}

//Validation of forms
const validation = (title, genre, rating, description) => {
    let hasErrors = false; 
    //Naming validation
    if(title.value === undefined || title.value === '') {
        title.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        title.style.borderColor = 'white';
    }

    //Genre validation
    if(genre.options[genre.selectedIndex].value === 'None') {
        genre.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        genre.style.borderColor = 'white';
    }

    //Rating validation
    if(rating.options[rating.selectedIndex].value === 'None') {
        rating.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        rating.style.borderColor = 'white';
    }

    //Description validation
    if(description.value === undefined || description.value === '') {
        description.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        description.style.borderColor = 'white';
    }

    //Return if it has errors
    return hasErrors;
}

//Clear error formatting as the Company item is sent
const clearFormat = (title, genre, rating, description) => {
    //Remove image 
    genreLogo.innerHTML ='';

    //Default border colors
    title.style.borderColor = 'white';
    genre.style.borderColor = 'white';
    rating.style.borderColor = 'white';
    description.style.borderColor = 'white';

    //Clear all values
    title.value = '';
    genre.value = 'None';
    rating.value = 'None';
    status.value ='None';
    description.value = '';
}

//Whether to display the empty message or not depending on the number of Companys
const displayEmptyMessage = () => CompanyList.childElementCount <= 2 ? emptyMessage.style.display = 'block' : emptyMessage.style.display = 'none';


//Filter out all Companys by genre
const filterCompanys = chosenGenre => {
    const CompanyItem = Array.from(document.querySelectorAll('.Company-list__Company-item'));
    let selectedGenre = [];

    CompanyItem.forEach(Company => Company.style.display = 'flex');
    switch(chosenGenre) {
        case '4-5Lpa':
            selectedGenre = CompanyItem.filter(Company => Company.children[2].children[1].textContent !== '4-5Lpa');
            break;
        case '5-7Lpa':
            selectedGenre = CompanyItem.filter(Company => Company.children[2].children[1].textContent !== '5-7Lpa');
            break;
        case '8-10Lpa':
            selectedGenre = CompanyItem.filter(Company => Company.children[2].children[1].textContent !== '8-10Lpa');
            break;
        case '10-15Lpa':
            selectedGenre = CompanyItem.filter(Company => Company.children[2].children[1].textContent !== '10-15Lpa');
            break;
        case 'Dream Company':
            selectedGenre = CompanyItem.filter(Company => Company.children[2].children[1].textContent !== 'Dream Company');
            break;
        default:
            break;
    }
    selectedGenre.forEach(Company => Company.style.display = 'none');
}

//Navigation bar setting to active whenever clicked
navigationBar.forEach(navigation => {
    navigation.addEventListener('click', e => {
        filterCompanys(navigation.textContent);
        const active = document.querySelector('.active');
        active.classList.remove('active');
        navigation.classList.add('active');
    });
});

//For opening of modal box
addCompanyButton.addEventListener('click', () => {
    CompanyModal.style.display = 'block';
});

//When closing of modal box through x icon
closeCompanyModal.addEventListener('click', () => {
    CompanyModal.style.display = 'none';
});

//Add Company modal submit button
addCompanyToList.addEventListener('click', e => {
    addCompany(); //Add Companys
});

//Selecting genre and changing its logo in modal 
selectGenre.addEventListener('change', e => {
    genreLogo.innerHTML = changeCompanyLogo();
});

//Whenever the user clicks outside the modal
window.addEventListener('click', e => {
    if(e.target === CompanyModal) { //If the user clicks outside the modal content
        CompanyModal.style.display = 'none';
    }
});