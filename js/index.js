'use strict';

/*------------------- CONSTANTS -------------------*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


/*----------------- LEFT COLUMN -------------------*/

const generateTitleLinks = (customSelector = '') => {
    console.log('Generate title links działa.');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for(let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
        /* get the title from the title element */

        /* create HTML of the link */
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

        /* insert link into titleList */
        titleList.insertAdjacentHTML("beforeend", linkHTML);
    }
}
generateTitleLinks();


/*----------- Articles CENTER column -----------------*/

const links = document.querySelectorAll('.titles a');

const titleClickHandler = function(event) {
    console.log('Klikanie działa.');
	event.preventDefault();
	const clickedElement = this;

    /* remove class 'active' from all article links */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for(let activeLink of activeLinks){
		activeLink.classList.remove('active');
	}

    /* add class 'active' to the clicked link */
	clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.posts .active');

	for(let activeArticle of activeArticles){
		activeArticle.classList.remove('active');
	}
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}


/*---------------------- TAGS UNDER ARTICLE --------------------*/

function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');

		/* START LOOP: for each tag */
		for(let tag of articleTagsArray){

            /* generate HTML of the link */
            let html = `<li><a href="#tag-${tag}"><p>${tag}</p></a></li>`;

            /* add generated code to html variable */
			/* insert HTML of all the links into the tags wrapper */
			tagsWrapper.insertAdjacentHTML("beforeend", html);
			/* END LOOP: for each tag */
		}
        /* END LOOP: for every article: */
    }
}
    
generateTags();


/*--------- DISPLAYING left-SIDE ARTICLES AFTER CLICKING ON TAG -----------*/

function tagClickHandler(event){

	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');

	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-', '');

	/* find all tag links with class active */
	const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

	/* START LOOP: for each active tag link */
	for (let link of activeLinks) {

		/* remove class active */
		link.classList.remove('active');

		/* END LOOP: for each active tag link */
	}

	/* find all tag links with "href" attribute equal to the "href" constant */

	const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
	/* START LOOP: for each found tag link */

	for (let tagLink of tagLinks){

		/* add class active */
		tagLink.classList.add('active');

		/* END LOOP: for each found tag link */
	}

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
	console.log(generateTitleLinks);
}

function addClickListenersToTags(){
	/* find all links to tags */
	const links = document.querySelectorAll('[href^="#tag-"]');

	/* START LOOP: for each link */
	for (let link of links) {

		/* add tagClickHandler as event listener for that link */
		link.addEventListener('click', tagClickHandler);

		/* END LOOP: for each link */
	}
}

addClickListenersToTags();


// function generateTags(){
// 	/* [NEW] create a new variable allTags with an empty array */
// 	let allTags = [];
// 	/* find all articles */
// 	/* START LOOP: for every article: */
// 	/* find tags wrapper */
// 	/* make html variable with empty string */
// 	/* get tags from data-tags attribute */
// 	/* split tags into array */
// 	/* START LOOP: for each tag */
// 	/* generate HTML of the link */
// 	/* add generated code to html variable */
// 	/* [NEW] check if this link is NOT already in allTags */
// 	if(allTags.indexOf(linkHTML) == -1){
// 		/* [NEW] add generated code to allTags array */
// 		allTags.push(linkHTML);
// 	}
// 	/* END LOOP: for each tag */
// 	/* insert HTML of all the links into the tags wrapper */
// 	/* END LOOP: for every article: */
// 	/* [NEW] find list of tags in right column */
// 	const tagList = document.querySelector('.tags');
// 	/* [NEW] add html from allTags to tagList */
// 	tagList.innerHTML = allTags.join(' ');
// }
