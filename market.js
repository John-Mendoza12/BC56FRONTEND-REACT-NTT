let products = [];
let filtered = [];
let categories=[];
let count=0
const countHTML = document.getElementById("count");

const productContainer = document.getElementById("containerCard");
async function Content() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data= await response.json();
        products = data.products;
        filteredProducts = products;
        console.log(filteredProducts)
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error al cargar productos",error);
    }
}
async function Categories() {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const categories = await response.json();
        populateCategoryDropdown(categories);
    } catch (error) {
        console.error("Error al cargar categorías:",error);
    }
}
function populateCategoryDropdown(categories) {
    const allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = "all";
    allCategoriesOption.textContent = "Todas las categorías";
    categorySelect.appendChild(allCategoriesOption);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.slug;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}
function displayProducts(products) {
    productContainer.innerHTML = "";
 
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

       
        const img = document.createElement("img");
        img.classList.add("img");
        img.src = product.thumbnail;
        img.alt = product.title;
        card.appendChild(img);

       
        const title = document.createElement("h1");
        title.textContent = product.title;
        card.appendChild(title);

        const description = document.createElement("p");
        description.textContent = product.description;
        card.appendChild(description);

       
        const categoryBox = document.createElement("div");
        categoryBox.classList.add("box");
        const category = document.createElement("span");
        category.classList.add("category");
        category.textContent = product.category;
        categoryBox.appendChild(category);
        card.appendChild(categoryBox);

       
        const price = document.createElement("h2");
        price.textContent = `Precio: S/${product.price}`;
        card.appendChild(price);

        
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonDiv");
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = "Agregar al carrito";
        button.onclick= () => {
            count++;
            countHTML.textContent=count
        }
        buttonDiv.appendChild(button);
        card.appendChild(buttonDiv);

        productContainer.appendChild(card);
       
    });
}
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("categorySelect");
function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);


Content()
Categories()