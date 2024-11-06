document.addEventListener('DOMContentLoaded', function () {
    // Simulated product data (this would come from an API in a real app)
    const products = [
      {
        id: 1,
        name: "Note Books",
        image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true",
        description: "Various types of notebooks for your studies.",
        link: "#"
      },
      {
        id: 2,
        name: "Records",
        image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true",
        description: "Record books for keeping your notes organized.",
        link: "#"
      },
      {
        id: 3,
        name: "Calculators",
        image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/calculator.png?raw=true",
        description: "Mathematical calculators for all your needs.",
        link: "#"
      },
      {
        id: 4,
        name: "Pen & Pencil",
        image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/pen.png?raw=true",
        description: "Stationery for everyday use.",
        link: "#"
      },
      {
        id: 5,
        name: "Others",
        image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/others.png?raw=true",
        description: "Miscellaneous items for your needs.",
        link: "#"
      }
    ];
  
    // DOM Elements
    const productListContainer = document.querySelector('.row');
    const searchInput = document.querySelector('input[type="search"]');
  
    // Function to render product cards
    function renderProducts(products) {
      // Clear previous products
      productListContainer.innerHTML = '';
  
      // Loop through products and create HTML for each product
      products.forEach(product => {
        const productCard = `
          <div class="col-md-4">
            <div class="card h-100" style="width: 18rem;">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <a href="${product.link}" class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        `;
        productListContainer.innerHTML += productCard;
      });
    }
  
    // Initial render of all products
    renderProducts(products);
  
    // Function to handle search
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      );
      renderProducts(filteredProducts);
    });
  
    // Optional: Adding smooth scroll effect on anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });
  