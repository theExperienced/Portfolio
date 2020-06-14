
const vh = (window.innerHeight || document.documentElement.clientHeight);
const currentlyVisibleSectionIndex = -1;

const fold = document.querySelector('.fold');
const header = document.querySelector('header.header');
const headerNav = document.querySelector('.header__nav');
const headerInput = document.querySelector('.header__input');
const headerItems = document.querySelectorAll('.header__nav-item');
const headerLinks = document.querySelectorAll('.header__nav-link');
const sections = document.querySelectorAll('.section');
const messageTextAreaGroup = document.querySelector('.contact-form__group--message');
const contactFormInputs = document.querySelectorAll('.contact-form__input');
const skillBoxes = document.querySelectorAll('.skills-section__skill-box');
const projectItems = document.querySelectorAll('.projects-section__item');
const projectItemsOverlays = document.querySelectorAll('.projects-section__item-overlay');

let sectionRects;
let scrollTop;
let previousY;

document.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('scroll', function() {
        sections.forEach(function(section, index) {
            let top = section.getBoundingClientRect().top;
            let bottom = section.getBoundingClientRect().bottom;
            let height = section.getBoundingClientRect().height;

            if ((top<=75 && top >= 75-height) && (bottom > 75 && bottom <= 75 + height)) {
                headerItems[index].classList.add('current-visible-section');
            }else {
                headerItems[index].classList.remove('current-visible-section');
            }
        })
    }); 
})

if (!!window.IntersectionObserver) {
    let stuckHeaderObserver = new IntersectionObserver(function(entries, observer) {
        if (screen.width > 500) {
            if (entries[0].isIntersecting) {
                header.classList.remove('header-stuck');
                headerNav.classList.remove('header-stuck__nav');
                headerLinks.forEach(function(headerLink) {
                    headerLink.classList.remove('header-stuck__nav-link');
                });
            }else {
                header.classList.add('header-stuck');
                headerNav.classList.add('header-stuck__nav');
                headerLinks.forEach(function(headerLink) {
                    headerLink.classList.add('header-stuck__nav-link');
                });
            }
        }
        
    }, {threshold: 0.35});
    stuckHeaderObserver.observe(fold);

    let skillsSectionVisibleObserver = new IntersectionObserver(function(entries, observer) {
        if (entries[0].isIntersecting) {
            console.log(entries[0].target);
            skillBoxes.forEach(function(skillBox) {
                skillBox.classList.add('skill-box-appear');
            });
            skillsSectionVisibleObserver.unobserve(entries[0].target);
        }else {
            return;
            console.log('sectio not intersecting');
        }
    }, {threshold: 0.4});
    skillsSectionVisibleObserver.observe(sections[1]);
}

contactFormInputs.forEach(function(input) {
    input.addEventListener('blur', function() {
        console.log('left input');
        if (!isEmpty(input)) {
            input.classList.add('input-has-value');
        }else {
            input.classList.remove('input-has-value');
        }
    });
});

projectItems.forEach(function(projectItem, index) {
    projectItem.addEventListener('mouseenter', function(){
        projectItemsOverlays[index].classList.add('project-item-overlay-visible');
    });
    projectItem.addEventListener('mouseleave', function(){
        projectItemsOverlays[index].classList.remove('project-item-overlay-visible');
    });
});

headerLinks.forEach(function(headerLink, index) {
    const sectionOriginY = sections[index].getBoundingClientRect().y;
    headerLink.addEventListener('click', function() {
        window.scrollTo({top: sectionOriginY + 75});

        if (screen.width <= 500) {
            headerInput.checked = false;
        }
    });
});

projectItems.forEach(function(projectItem) {
    projectItem.addEventListener('click', function() {
        window.open(this.dataset.dest, "_blank");
    });
});

function renderHeaderLinksStuck() {
    headerLinks.forEach(function(headerLink) {
        headerLink.classList.add('stuck-header-link');
    });
}

function renderHeaderLinksUnstuck() {
    headerLinks.forEach(function(headerLink) {
        headerLink.classList.remove('stuck-header-link');
    });
}

function isEmpty(input) {
    return input.value.trim().length == 0;
}
