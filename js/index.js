'use strict';

/*------------------- CONSTANTS -------------------*/

const optArticleSelector = '.post',
  	optTitleSelector = '.post-title',
  	optTitleListSelector = '.titles',
  	optArticleTagsSelector = '.post-tags .list',
	optArticleAuthorSelector = '.post-author';



/*----------------- LEFT COLUMN -------------------*/

function generateTitleLinks(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for(let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        titleList.insertAdjacentHTML("beforeend", linkHTML);
    }

	const links = document.querySelectorAll('.titles a');

	for (let link of links)	{
		link.addEventListener('click', titleClickHandler);
	}
}
generateTitleLinks();


/*----------- Articles CENTER column -----------------*/

const links = document.querySelectorAll('.titles a');

function titleClickHandler (event) {
    console.log('Klikanie działa.');
	event.preventDefault();
	const clickedElement = this;

	const activeLinks = document.querySelectorAll('.titles a.active');

	for(let activeLink of activeLinks){
		activeLink.classList.remove('active');
	}

	clickedElement.classList.add('active');
	const activeArticles = document.querySelectorAll('.posts .active');

	for(let activeArticle of activeArticles){
		activeArticle.classList.remove('active');
	}
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
}

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}


/*---------------------- TAGS UNDER ARTICLE --------------------*/

function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        let html = '';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');

		for(let tag of articleTagsArray){
            let html = `<li><a href="#tag-${tag}">${tag}&nbsp;&nbsp;</a></li>`;
			tagsWrapper.insertAdjacentHTML("beforeend", html);
		}
    }
}
    
generateTags();


/*--------- DISPLAYING left-SIDE ARTICLES AFTER CLICKING ON TAG -----------*/

function tagClickHandler(event){
	event.preventDefault();
	const clickedElement = this;
	const href = clickedElement.getAttribute('href');
	const tag = href.replace('#tag-', '');
	const activeLinks = document.querySelectorAll('a[href="' + href + '"]');

	for (let link of activeLinks) {
		link.classList.remove('active');
	}

	const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

	for (let tagLink of tagLinks){
		tagLink.classList.add('active');
	}

	generateTitleLinks('[data-tags~="' + tag + '"]');
	console.log(generateTitleLinks);
}

/* ------------ADD LISTENERS TO TAGS UNDER ARTICLE ----------------------------*/

function addClickListenersToTags(){
	const links = document.querySelectorAll('[href^="#tag-"]');

	for (let link of links) {
		link.addEventListener('click', tagClickHandler);
	}
}

addClickListenersToTags();

/*---------------------------- GENEROWANIE AUTORÓW --------------------------*/

function generateAuthors() {
	const articles = document.querySelectorAll(optArticleSelector);

	for(let article of articles) {
		const authorsWrapper = article.querySelector(optArticleAuthorSelector);
		let html = '';
		authorsWrapper.innerHTML = '';
		const articleAuthor = authorsWrapper.getAttribute('data-author');
		const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
		console.log(linkHTML)
		html = html + linkHTML;
		authorsWrapper.innerHTML = html;
	}
}

generateAuthors();

function authorClickHandler(event){

	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');

	/* make a new constant "authors" and extract author from the "href" constant */
	const authors = href.replace('#author-', '');

	/* find all author links with class active */
	const authorLinks = document.querySelectorAll('.active[href^="#author-"]');
	console.log(authorLinks)
	/* START LOOP: for each active author link */
	for (let activeAuthorLink of authorLinks){

		/* remove class active */
		activeAuthorLink.classList.remove('active');

		/* END LOOP: for each active author link */
	}

	/* find all autor links with "href" attribute equal to the "href" constant */
	const equalLinks = document.querySelectorAll('a[href="' + href + '"]');

	for (let equalLink of equalLinks){
		equalLink.classList.add('active');
	}

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-author="' + authors + '"]');
}


// eslint-disable-next-line no-inner-declarations
function addClickListenersToAuthor(){

	/* find all links to author */
	const links = document.querySelectorAll('a[href^="#author-"]');

	/* START LOOP: for each link */
	for (let link of links) {
		console.log(link);
		/* add tagClickHandler as event listener for that link */
		link.addEventListener('click', authorClickHandler);

		/* END LOOP: for each link */
	}
}

addClickListenersToAuthor();

//
// function generateTags(){
// 	/* [NEW] create a new variable allTags with an empty array */
// 	let allTags = {};
// 	/* find all articles */
// 	const articles = document.querySelectorAll(optArticleSelector);
// 	/* START LOOP: for every article: */
// 	for(let article of articles) {
// 		/* find tags wrapper */
// 		const tagsWrapper = article.querySelector(optArticleTagsSelector);
// 		/* make html variable with empty string */
// 		let html = '';
// 		/* get tags from data-tags attribute */
// 		const articleTags = article.getAttribute('data-tags');
// 		/* split tags into array */
// 		const articleTagsArray = articleTags.split(' ');
// 		/* START LOOP: for each tag */
// 		for (let tag of articleTagsArray) {
// 			/* generate HTML of the link */
// 			const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
// 			/* add generated code to html variable */
// 			html = html + linkHTML;
// 			/* [NEW] check if this link is NOT already in allTags */
// 			if(!allTags[tag]) {
// 				/* [NEW] add tag to allTags object */
// 				allTags[tag] = 1;
// 			} else {
// 				allTags[tag]++;
// 			}
// 		}
// 		/* insert HTML of all the links into the tags wrapper */
// 		tagsWrapper.innerHTML = html;
// 		/* END LOOP: for every article: */
// 	}
// 	/* [NEW] find list of tags in right column */
// 	const tagList = document.querySelector('.tags');
// 	const tagsParams = calculateTagsParams(allTags);
// 	console.log('tagsParams:', tagsParams)
// 	/* [NEW] create variable for all links HTML code */
// 	let allTagsHTML = '';
//
// 	/* [NEW] START LOOP: for each tag in allTags: */
// 	for(let tag in allTags){
// 		const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
// 		console.log('tagLinkHTML:', tagLinkHTML);
// 		/* [NEW] generate code of a link and add it to allTagsHTML */
// 		allTagsHTML += tagLinkHTML;
// 	}
// 	/* [NEW] END LOOP: for each tag in allTags: */
// 	console.log(allTags)
// 	/*[NEW] add HTML from allTagsHTML to tagList */
// 	tagList.innerHTML = allTagsHTML;
// }
//
// generateTags();
