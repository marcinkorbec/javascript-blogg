'use strict';
/*------------------- CONSTANTS -------------------*/
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';


/*----------------- LEFT COLUMN -------------------*/

const generateTitleLinks = () => {
    console.log('Generate title links działa.');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
        /* get the title from the title element */

        /* create HTML of the link */
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        console.log(linkHTML);

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

