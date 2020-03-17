const main = document.querySelector('.main');

fetch('/news').then((response) => {
    response.json().then((data) => {
        console.log(data.articles);
        data.articles.forEach(article => {

            let title = article.title;
            let description = article.description.length > 75 ? `${article.description.slice(0, 75).trim()}...` : article.description;

            if (description.length === 0)
            description = article.content.length > 75 ? `${article.content.slice(0, 75).trim()}...` : article.content;
            

            description = description.charAt(description.length - 1) != '.' ? description += '.' : description;

            const element = newsCard(title, article.urlToImage, description);

            element.addEventListener('click', () => {
                window.location.href = article.url;
            });

            main.appendChild(element);
        });
    })
}).catch((error) => {

});

const newsCard = (titleText, imageUrl, descriptionText) => {
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
    //img.src = imageUrl;
    background.style.background = `#cccccc url('${imageUrl}')`

    // Append Elements
    card.appendChild(background);

    header.appendChild(h1);

    article.appendChild(header);
    article.appendChild(description);
    card.appendChild(article);

    return card;
}