document.addEventListener('DOMContentLoaded', function() {
    // Alert method for Final Test sub-section
    function isValid() {
        let password = document.getElementById("password").value;
        if (password == "jellybean") {
            window.location.href = "congrats.html";
        } else {
            alert("Oops! Goodbye, friend.");
        }
    }

    // Ensure dark mode is enabled on page load
    document.body.classList.add("dark-mode");

    // News API configuration
    const apiKey = '5d0e1e6c46714929bfa16e7619b3343f';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    const newsContainer = document.getElementById('news-container');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('News API response:', data);
            const articles = data.articles;

            if (articles.length > 0) {
                articles.forEach(article => {
                    const newsLink = document.createElement('a');
                    newsLink.href = article.url;
                    newsLink.target = '_blank';

                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');

                    const newsImage = document.createElement('img');
                    newsImage.src = article.urlToImage || 'assets/images/Red Badge Security Logo.png'; // Placeholder image if no news image available
                    newsImage.alt = article.title;

                    const newsTitle = document.createElement('p');
                    newsTitle.textContent = article.title;

                    newsLink.appendChild(newsImage);
                    newsLink.appendChild(newsTitle);
                    newsItem.appendChild(newsLink);
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>No news available at the moment.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        });
});
