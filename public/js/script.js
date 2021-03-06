const main = document.querySelector('.main');

fetch('/news').then((response) => {
    response.json().then((data) => {
        data.articles.forEach(article => {

            let title = article.title;
            let description = article.description === null || article.description.length < 75 ? article.description : `${article.description.slice(0, 75).trim()}...`;
            let descriptionTitle = article.description != null ? article.description : article.content;

            if (description === null || description.length === 0) {
                description = article.content === null || article.content.length < 75 ? article.content : `${article.content.slice(0, 75).trim()}...`;
            } else {
                description = description.charAt(description.length - 1) != '.' ? description += '.' : description;
            }

            const element = newsCard(title, article.urlToImage, description, descriptionTitle);

            element.addEventListener('click', () => {
                window.location.href = article.url;
            });

            main.appendChild(element);
        });
    })
}).catch((error) => {

});

const newsCard = (titleText, imageUrl, descriptionText, descriptionTitle) => {
    // Create Elements
    const card = document.createElement('div');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const article = document.createElement('article');
    const description = document.createElement('div');
    const background = document.createElement('div');

    // Add Classes
    card.classList.add('news-card');
    header.classList.add('news-header');
    h1.classList.add('news-title');
    article.classList.add('news-article');
    description.classList.add('news-description');
    background.classList.add('news-image')

    // Add Texts and Image Source
    h1.innerText = titleText;
    description.innerText = descriptionText;
    description.setAttribute('attr-title', descriptionTitle);
    //img.src = imageUrl;
    background.style.background = imageUrl === null ? `#cccccc` : `#cccccc url('${imageUrl}')`;

    // Append Elements
    card.appendChild(background);

    header.appendChild(h1);

    article.appendChild(header);
    article.appendChild(description);
    card.appendChild(article);

    return card;
}