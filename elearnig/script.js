// Function to search books using Google Books API
async function searchBooks() {
    const searchValue = document.getElementById('search-input').value.trim();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (searchValue.length === 0) {
        return;
    }

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchValue)}&maxResults=10`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
            data.items.forEach(item => {
                const book = item.volumeInfo;
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';
                bookItem.onclick = () => redirectToBookDetails(book);  // Add click handler

                const bookImage = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/100';
                const bookTitle = book.title || 'No Title Available';
                const bookAuthor = book.authors ? book.authors.join(', ') : 'No Author Available';

                bookItem.innerHTML = `
                    <img src="${bookImage}" alt="${bookTitle}">
                    <div class="book-info">
                        <div class="book-title">${bookTitle}</div>
                        <div class="book-author">by ${bookAuthor}</div>
                    </div>
                `;
                searchResults.appendChild(bookItem);
            });
        } else {
            searchResults.innerHTML = '<p class="text-center">No books found.</p>';
        }
    } catch (error) {
        searchResults.innerHTML = '<p class="text-center">An error occurred while fetching data. Please try again later.</p>';
        console.error('Error fetching books:', error);
    }
}

// Function to redirect to the book details page
function redirectToBookDetails(book) {
    const queryParams = new URLSearchParams({
        title: book.title || 'No Title Available',
        description: book.description || 'No description available for this book.',
        buyLink: book.canonicalVolumeLink || '#'
    }).toString();

    window.location.href = `book-details.html?${queryParams}`;
}
