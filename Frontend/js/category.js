document.addEventListener('DOMContentLoaded', function () {
    // Simulated product data for categories
    const categoryProducts = {
      books: [
        { name: "Science Book", description: "A detailed science book.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true", link: "#" },
        { name: "Math Book", description: "A comprehensive math book.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true", link: "#" }
      ],
      records: [
        { name: "Record Book 1", description: "Record book for notes.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true", link: "#" },
        { name: "Record Book 2", description: "Another record book.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/books.png?raw=true", link: "#" }
      ],
      calculators: [
        { name: "Scientific Calculator", description: "Advanced scientific calculator.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/calculator.png?raw=true", link: "#" },
        { name: "Basic Calculator", description: "Simple calculator for daily use.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/calculator.png?raw=true", link: "#" }
      ],
      stationery: [
        { name: "Pen", description: "Blue ink pen.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/pen.png?raw=true", link: "#" },
        { name: "Pencil", description: "HB pencil.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/pen.png?raw=true", link: "#" }
      ],
      others: [
        { name: "Ruler", description: "Plastic ruler.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/others.png?raw=true", link: "#" },
        { name: "Eraser", description: "Rubber eraser.", image: "https://github.com/Akhilva4871/Campus-Store-Website/blob/main/others.png?raw=true", link: "#" }
      ]
    };
  
    // Get the category from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
  
    // Display category name
    document.getElementById('category-name').textContent = category.charAt(0).toUpperCase() + category.slice(1);
  
    // Get the products for the category
    const products = categoryProducts[category] || [];
  
    // Render products for the selected category
    const productsContainer = document.getElementById('category-products');
    products.forEach(product => {
      const productCard = `
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <a href="${product.link}" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
  });
  