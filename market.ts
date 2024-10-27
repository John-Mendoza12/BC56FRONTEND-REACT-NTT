import { ICategory, IProduct, IProductList } from "./interfaces";

let products:IProduct[] = [];
let filtered:IProduct[] = [];
let categories:ICategory[]=[];
let count:number=0
const countHTML = document.getElementById("count") as HTMLParagraphElement;
const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const productContainer = document.getElementById("containerCard") as HTMLDivElement;
async function Categories() {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        categories = await response.json();
        populateCategoryDropdown(categories);
    } catch (error) {
        console.error("Error al cargar categorías:",error);
    }
}
function populateCategoryDropdown(categories:ICategory[]) {
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
function displayProducts(products:IProduct[]) {
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
            countHTML.textContent=count.toString()
        }
        buttonDiv.appendChild(button);
        card.appendChild(buttonDiv);

        productContainer.appendChild(card);
       
    });
}
async function Content() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data:IProductList= await response.json();
        products = data.products;
        filtered = products;
        displayProducts(filtered);
    } catch (error) {
        console.error("Error al cargar productos",error);
    }
}
function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    filtered = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    displayProducts(filtered);
}
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
Categories()
Content()

