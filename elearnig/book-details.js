// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: params.get('title'),
        description: params.get('description'),
        buyLink: params.get('buyLink')
    };
}

// Function to display book details
function displayBookDetails() {
    const { title, description, buyLink } = getQueryParams();
    const bookTitle = document.getElementById('book-title');
    const bookDetails = document.getElementById('book-details');

    bookTitle.innerText = title || 'No Title Available';
    bookDetails.innerHTML = `
        <p>${description || 'No description available for this book.'}</p>
        
             <a href="./thankyoucart.html" class="btn btn-success" target="_blank">Buy Now</a>

    `;
}
function hello(){
    alert({title}+"WOW GREATE CHOICE WE WILL SEND YOU PAYMENT OPTION IN YOUR EMAIN SOON ..HAVE A GOOD DAY  :)")
}

// Call the function to display the book details when the page loads
displayBookDetails();
