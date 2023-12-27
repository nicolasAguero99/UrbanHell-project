const LOCATION_URL = window.location.pathname;
const LOCATION_PARAM_URL = window.location.search.slice(4);
let productsArray = [];
let flagSize = false;
let flagColor = false;
const sizeAndColor = {
  size: '',
  color: '',
};
const BANNER_SRC_ARRAY = [
  { src: './imgs/banners/banner-clasico.jpg', idProduct: 11 },
  { src: './imgs/banners/banner-urbano.jpg', idProduct: 14 },
  { src: './imgs/banners/banner-deportivo.jpg', idProduct: 10 },
  { src: './imgs/banners/banner-vintage.jpg', idProduct: 15 },
];

if (LOCATION_URL == "/tienda-ropa-final-pwa/" || LOCATION_URL == "/UrbanHell-project/") {
  window.location.href = "./index.html";
}

class DOMGenerator {
  constructor(item, isTop, sizeLS, colorLS, quantityLS ) {
    this.item = item;
    this.isTop = isTop;
    this.sizeAndColor = sizeAndColor;
    this.sizeLS = sizeLS;
    this.colorLS = colorLS;
    this.quantityLS = quantityLS;

    this.element = this.DOMSwiperSlide();
    LOCATION_URL.includes('producto.html') 
    && (this.singleProduct = this.DOMSingleProduct());
    this.productsCatalogo = this.DOMProductsCatalogo();
    this.productsFavoritos = this.DOMProductsFavoritos();
    this.productsCart = this.DOMProductsCart();
    this.productsCartLS = this.DOMProductsCartLS();
  }

  DOMSwiperSlide() {
    const { id, name, description, image, price, category, discount } = this.item;
    const isTop = this.isTop + 1;

    const div = document.createElement("div");
    div.id = `card-${id}`;
    div.className = "swiper-slide";
    div.classList.add("card-product");

    const img = document.createElement("img");
    img.src = `./imgs/${category}/${image}-delante.jpg`;
    img.alt = name;

    const categoryText = document.createElement("small");
    categoryText.textContent = category;
    categoryText.classList = "category-label";

    const small = document.createElement("small");
    isTop > 0 &&
    (
      small.textContent = isTop,
      small.classList = 'number-top'
    )

    const h4 = document.createElement("h4");
    h4.textContent = name;

    const p = document.createElement("p");
    p.textContent = description;

    const span = document.createElement("span");
    !discount &&
    (span.textContent = `$${price}`)
    
    const containerBtns = document.createElement("div");
    containerBtns.className = "container-btns";
    
    const containerDiscount = document.createElement("div");
    const oldPrice = document.createElement("b");
    const newPrice = document.createElement("b");

    if (discount) {      
      containerDiscount.classList = 'container-discount'

      oldPrice.classList = 'old-price'
      oldPrice.textContent = `$${price}`;

      newPrice.classList = 'new-price'
      newPrice.textContent = `$${((price - (price * discount) / 100))}`;

      containerDiscount.appendChild(oldPrice);
      containerDiscount.appendChild(newPrice);
    }

    const btnVer = document.createElement("a");
    btnVer.textContent = "Ver";
    btnVer.classList = "see-product-btn";
    btnVer.href = `./producto.html?id=${id}`

    const btnFavoritos = document.createElement("button");
    btnFavoritos.classList = "favorite-btn"
    const imgFavoritos = document.createElement("img");
    imgFavoritos.src = "./imgs/icons/favoritos-icon.svg";

    readData().then((arrayRequest) => {
      arrayRequest.map(item => {
        item.id == id &&
          (
            imgFavoritos.src = "./imgs/icons/favoritos-lleno-icon.svg",
            imgFavoritos.alt = "quitar favoritos"
          );
      })
    })

    imgFavoritos.alt = "agregar favoritos";
    imgFavoritos.alt = "agregar favoritos";
    btnFavoritos.appendChild(imgFavoritos);

    containerBtns.appendChild(btnVer);
    containerBtns.appendChild(btnFavoritos);

    div.appendChild(img);
    div.appendChild(categoryText);
    isTop &&
    div.appendChild(small);
    div.appendChild(h4);
    div.appendChild(p);
    !discount &&
    div.appendChild(span);
    discount &&
    div.appendChild(containerDiscount);
    div.appendChild(containerBtns);

    return div;
  }

  // ----------
  // Catalogo
  // ----------

  DOMProductsCatalogo() {
    const { id, name, description, image, price, category, discount } = this.item;

    const cardProductCatalogo = document.createElement("div");
    cardProductCatalogo.id = `card-${id}`;
    cardProductCatalogo.classList.add("card-product-catalogo");
    cardProductCatalogo.classList.add("card-product");

    const img = document.createElement("img");
    img.src = `./imgs/${category}/${image}-delante.jpg`;
    img.alt = name;

    const h4 = document.createElement("h4");
    h4.textContent = name;

    const p = document.createElement("p");
    p.textContent = description;

    const span = document.createElement("span");
    !discount &&
    (span.textContent = `$${price}`)

    const containerDiscount = document.createElement("div");
    const oldPrice = document.createElement("b");
    const newPrice = document.createElement("b");


    if (discount) {
      containerDiscount.classList = 'container-discount'

      oldPrice.classList = 'old-price'
      oldPrice.textContent = `$${price}`;

      newPrice.classList = 'new-price'
      newPrice.textContent = `$${((price - (price * discount) / 100))}`;

      containerDiscount.appendChild(oldPrice);
      containerDiscount.appendChild(newPrice);
    }

    const containerBtns = document.createElement("div");
    containerBtns.classList.add("container-btns");

    const enlace = document.createElement("a");
    enlace.classList.add("see-product-btn");
    enlace.textContent = "Ver";
    enlace.href = `./producto.html?id=${id}`;

    const boton = document.createElement("button");
    boton.classList = "favorite-btn"

    const imgBoton = document.createElement("img");

    imgBoton.src = "./imgs/icons/favoritos-icon.svg";

    readData().then((arrayRequest) => {
      arrayRequest.map(item => {
        item.id == id && 
        (
          imgBoton.src = "./imgs/icons/favoritos-lleno-icon.svg",
          imgBoton.alt = "quitar favoritos"
        );
      })
    })

    imgBoton.alt = "agregar favoritos";
    boton.appendChild(imgBoton);

    cardProductCatalogo.appendChild(img);
    cardProductCatalogo.appendChild(h4);
    cardProductCatalogo.appendChild(p);
    !discount &&
      cardProductCatalogo.appendChild(span);
    discount &&
      cardProductCatalogo.appendChild(containerDiscount);

    containerBtns.appendChild(enlace);
    containerBtns.appendChild(boton);

    cardProductCatalogo.appendChild(containerBtns);
    
    return cardProductCatalogo

  }

  // ----------
  // Single product
  // ----------

  DOMSingleProduct() {
    const { name, price, category, description, sizes, colors, image, stock, discount, top } = this.item;

    const containerImgHeader = document.createElement('div');
    const containerInfoHeader = document.createElement('div');
    const containerCategoryStock = document.createElement('div');
    const smallCategoryProduct = document.createElement('small');
    const smallStockProduct = document.createElement('small');
    const h1 = document.createElement('h1');
    const spanPriceProduct = document.createElement('span');
    const p = document.createElement('p');
    const containerSizes = document.createElement('div');
    const spanTalle = document.createElement('span');
    const containerDotsSizes = document.createElement('div');
    const containerColors = document.createElement('div');
    const spanColor = document.createElement('span');
    const containerDotsColors = document.createElement('div');
    const containerBtnsProduct = document.createElement('div');
    const buttonAddCart = document.createElement('button');
    const topDiv = document.createElement('div');
    const topSpan = document.createElement('span');

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    const slide1 = document.createElement("div");
    slide1.className = "swiper-slide slide-img";
    const img1 = document.createElement("img");
    img1.src = `./imgs/${category}/${image}-delante.jpg`;
    img1.alt = `${name} delante`;
    slide1.appendChild(img1);

    const slide2 = document.createElement("div");
    if (category === "gorras") {  
      slide2.className = "swiper-slide slide-img";
      const img2 = document.createElement("img");
      img2.src = `./imgs/${category}/${image}-perfil.jpg`;
      img2.alt = `${name} perfil`;
      slide2.appendChild(img2);
    }

    const slide3 = document.createElement("div");
    slide3.className = "swiper-slide slide-img";
    const img3 = document.createElement("img");
    img3.src = `./imgs/${category}/${image}-detras.jpg`;
    img3.alt = `${name} detras`;
    slide3.appendChild(img3);

    swiperWrapper.appendChild(slide1);
    swiperWrapper.appendChild(slide2);
    swiperWrapper.appendChild(slide3);

    const swiperPagination = document.createElement("div");
    swiperPagination.className = "swiper-pagination";

    const mySwiperImg = document.createElement("div");
    mySwiperImg.id = "mySwiperImg";
    mySwiperImg.className = "mySwiperImg";
    mySwiperImg.appendChild(swiperWrapper);
    mySwiperImg.appendChild(swiperPagination);

    top && (
      topDiv.classList = "top-product",
      topSpan.textContent = "Top",
      topDiv.appendChild(topSpan)
    );

    top && mySwiperImg.appendChild(topDiv);

    smallCategoryProduct.classList.add('category-product');
    smallCategoryProduct.style.backgroundColor = `var(--category-${category})`;
    smallCategoryProduct.textContent = category;

    smallStockProduct.classList.add('stock-product');
    smallStockProduct.innerHTML = `Stock: <b>${stock}</b>`;

    h1.textContent = name;

    spanPriceProduct.classList.add('price-product');
    !discount &&
    (spanPriceProduct.textContent = `$ ${price}`);


    const containerDiscount = document.createElement("div");
    const oldPrice = document.createElement("b");
    const newPrice = document.createElement("b");


    if (discount) {
      containerDiscount.classList = 'container-discount'

      oldPrice.classList = 'old-price'
      oldPrice.textContent = `$${price}`;

      newPrice.classList = 'new-price'
      newPrice.textContent = `$${((price - (price * discount) / 100))}`;

      containerDiscount.appendChild(oldPrice);
      containerDiscount.appendChild(newPrice);
    }

    p.textContent = description;
    
    spanTalle.textContent = 'Talle:';
    
    containerDotsSizes.classList = 'container-dots-sizes';
    
    sizes.map(size => {
      const spanSizes = document.createElement('span');
      spanSizes.textContent = size;
      spanSizes.id = size;
      spanSizes.classList = 'span-sizes';
      size === 'xxl' &&
      (spanSizes.style.fontSize = '12px');
      containerDotsSizes.appendChild(spanSizes);
    })
    
    containerDotsColors.classList = 'container-dots-colors';
    
    spanColor.textContent = 'Color:';

    colors.map(color => {
      const spanColors = document.createElement('span');
      spanColors.id = color;
      spanColors.classList = 'span-colors';
      spanColors.style.backgroundColor = `var(--${color})`;
      containerDotsColors.appendChild(spanColors);
    })

    buttonAddCart.id = 'add-cart-btn';
    buttonAddCart.disabled = true;
    buttonAddCart.textContent = 'Añadir al carrito';

    containerImgHeader.classList.add('container-img-header');
    containerImgHeader.appendChild(mySwiperImg);

    containerCategoryStock.classList.add('container-category-stock');
    containerCategoryStock.appendChild(smallCategoryProduct);
    containerCategoryStock.appendChild(smallStockProduct);

    containerSizes.classList.add('container-sizes');
    containerSizes.appendChild(spanTalle);
    containerSizes.appendChild(containerDotsSizes);

    containerColors.classList.add('container-colors');
    containerColors.appendChild(spanColor);
    containerColors.appendChild(containerDotsColors);

    containerBtnsProduct.classList.add('container-btns-product');
    containerBtnsProduct.appendChild(buttonAddCart);

    containerInfoHeader.classList.add('container-info-header');
    containerInfoHeader.appendChild(containerCategoryStock);
    containerInfoHeader.appendChild(h1);
    !discount &&
      containerInfoHeader.appendChild(spanPriceProduct);
    discount &&
      containerInfoHeader.appendChild(containerDiscount);
    containerInfoHeader.appendChild(p);
    containerInfoHeader.appendChild(containerSizes);
    containerInfoHeader.appendChild(containerColors);
    containerInfoHeader.appendChild(containerBtnsProduct);

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    productContainer.appendChild(containerImgHeader);
    productContainer.appendChild(containerInfoHeader);

    return productContainer;
  }

  // ----------
  // Favoritos
  // ----------

  DOMProductsFavoritos() {
    const { id, name, description, image, price, category, discount } = this.item;

    const cardProductFavoritos = document.createElement("div");
    cardProductFavoritos.id = `card-${id}`;
    cardProductFavoritos.classList.add("card-product-catalogo");
    cardProductFavoritos.classList.add("card-product");

    const img = document.createElement("img");
    img.src = `./imgs/${category}/${image}-delante.jpg`;
    img.alt = name;

    const h4 = document.createElement("h4");
    h4.textContent = name;

    const p = document.createElement("p");
    p.textContent = description;

    const span = document.createElement("span");
    !discount &&
      (span.textContent = `$${price}`)

    const containerDiscount = document.createElement("div");
    const oldPrice = document.createElement("b");
    const newPrice = document.createElement("b");


    if (discount) {
      containerDiscount.classList = 'container-discount'

      oldPrice.classList = 'old-price'
      oldPrice.textContent = `$${price}`;

      newPrice.classList = 'new-price'
      newPrice.textContent = `$${((price - (price * discount) / 100))}`;

      containerDiscount.appendChild(oldPrice);
      containerDiscount.appendChild(newPrice);
    }

    const containerBtns = document.createElement("div");
    containerBtns.classList.add("container-btns");

    const enlace = document.createElement("a");
    enlace.classList.add("see-product-btn");
    enlace.textContent = "Ver";
    enlace.href = `./producto.html?id=${id}`;

    cardProductFavoritos.appendChild(img);
    cardProductFavoritos.appendChild(h4);
    cardProductFavoritos.appendChild(p);
    !discount &&
      cardProductFavoritos.appendChild(span);
    discount &&
      cardProductFavoritos.appendChild(containerDiscount);

    containerBtns.appendChild(enlace);

    cardProductFavoritos.appendChild(containerBtns);

    return cardProductFavoritos

  }


  // --------------
  // Cart
  // --------------

  DOMProductsCart() {
    const { id, name, price, category, image, discount } = this.item;
    const { size, color } = this.sizeAndColor;

    

    const cardProductCart = document.createElement('div');
    cardProductCart.classList.add('card-product-cart');
    cardProductCart.id = `cart-${id}`;

    const imgElement = document.createElement('img');
    imgElement.src = `./imgs/${category}/${image}-delante.jpg`;
    imgElement.alt = name;

    const cardProductCartInfo = document.createElement('div');
    cardProductCartInfo.classList.add('card-product-cart-info');

    const h4Element = document.createElement('h4');
    h4Element.textContent = name;

    const divDetailsProduct = document.createElement('div');

    const priceElement = document.createElement('small');
    priceElement.textContent = '$: ';
    
    const priceValue = document.createElement('b');
    priceValue.classList = "price-value-cart";
    !discount 
    ? priceValue.textContent = price
    : priceValue.textContent = ((price - (price * discount) / 100));


    const quantity = document.createElement('small');
    quantity.textContent = 'Cant: ';

    const quantityValue = document.createElement('b');
    quantityValue.textContent = '1';

    const sizeText = document.createElement('small');
    sizeText.textContent = 'Talle: ';

    const sizeValue = document.createElement('b');
    sizeValue.textContent = size;

    const colorText = document.createElement('small');
    colorText.textContent = 'Color: ';

    const colorValue = document.createElement('b');
    colorValue.textContent = color;


    priceElement.appendChild(priceValue);
    quantity.appendChild(quantityValue);
    sizeText.appendChild(sizeValue);
    colorText.appendChild(colorValue);

    divDetailsProduct.appendChild(priceElement);
    divDetailsProduct.appendChild(quantity);
    divDetailsProduct.appendChild(sizeText);
    divDetailsProduct.appendChild(colorText);

    cardProductCartInfo.appendChild(h4Element);
    cardProductCartInfo.appendChild(divDetailsProduct);
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete-product-cart');
    deleteButton.type = 'button';

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './imgs/icons/tacho-icon.svg';
    deleteButtonImg.alt = 'eliminar producto';

    deleteButton.appendChild(deleteButtonImg);
    cardProductCart.appendChild(imgElement);
    cardProductCart.appendChild(cardProductCartInfo);
    cardProductCart.appendChild(deleteButton);
    
    return cardProductCart
  }

  // --------------
  // CartLS
  // --------------

  DOMProductsCartLS() {
    let { id, name, price, category, image, discount } = this.item;
    const sizeLS = this.sizeLS;
    const colorLS = this.colorLS;
    const quantityLS = this.quantityLS;

    price = price * quantityLS;

    const cardProductCart = document.createElement('div');
    cardProductCart.classList.add('card-product-cart');
    cardProductCart.id = `cart-${id}`;


    const imgElement = document.createElement('img');
    imgElement.src = `./imgs/${category}/${image}-delante.jpg`;
    imgElement.alt = name;

    const cardProductCartInfo = document.createElement('div');
    cardProductCartInfo.classList.add('card-product-cart-info');

    const h4Element = document.createElement('h4');
    h4Element.textContent = name;

    const divDetailsProduct = document.createElement('div');

    const priceElement = document.createElement('small');
    priceElement.textContent = '$: ';
    
    const priceValue = document.createElement('b');
    priceValue.classList = "price-value-cart";
    !discount 
    ? priceValue.textContent = price
    : priceValue.textContent = ((price - (price * discount) / 100));


    const quantity = document.createElement('small');
    quantity.textContent = 'Cant: ';

    const quantityValue = document.createElement('b');
    quantityValue.textContent = quantityLS;

    const sizeText = document.createElement('small');
    sizeText.textContent = 'Talle: ';

    const sizeValue = document.createElement('b');
    sizeValue.textContent = sizeLS;

    const colorText = document.createElement('small');
    colorText.textContent = 'Color: ';

    const colorValue = document.createElement('b');
    colorValue.textContent = colorLS;


    priceElement.appendChild(priceValue);
    quantity.appendChild(quantityValue);
    sizeText.appendChild(sizeValue);
    colorText.appendChild(colorValue);

    divDetailsProduct.appendChild(priceElement);
    divDetailsProduct.appendChild(quantity);
    divDetailsProduct.appendChild(sizeText);
    divDetailsProduct.appendChild(colorText);

    cardProductCartInfo.appendChild(h4Element);
    cardProductCartInfo.appendChild(divDetailsProduct);
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete-product-cart');
    deleteButton.type = 'button';

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './imgs/icons/tacho-icon.svg';
    deleteButtonImg.alt = 'eliminar producto';
    
    deleteButton.appendChild(deleteButtonImg);

    cardProductCart.appendChild(imgElement);
    cardProductCart.appendChild(cardProductCartInfo);
    cardProductCart.appendChild(deleteButton);
    
    return cardProductCart
  }
}



async function getProducts() {
  const response = await fetch("./data/ropa.json");
  const data = await response.json();
  productsArray = data;
  if (LOCATION_URL.includes('index.html') || LOCATION_URL == '/' || LOCATION_URL == '/UrbanHell-project/') { 
    popularArticlesCarrousel();
    topMonthCarrousel();
    discountArticlesCarrousel();
  } else if (LOCATION_URL.includes('producto.html')) {
    singleProductView();
    addCart();
    selectSize();
    selectColor();
  } else if (LOCATION_URL.includes('catalogo.html')) {
    productsCatalogoView();
  } else if (LOCATION_URL.includes('favoritos.html')) {
    productsFavoritosView();
  }
  localStorage.getItem("cart-products") &&
  productsCartViewLS();
  clearCart();
  addRemoveFav();
  filterCategory();
  quantyCart();
  LOCATION_URL.includes("compras.html") && myPurchaces();
}

function popularArticlesCarrousel() {
  const productsWithOutDiscount = productsArray.filter(itemData => !itemData.discount);
  const shuffledArray = productsWithOutDiscount.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < 6; i++) {
    const itemData = shuffledArray[i];
    document.querySelector("#popular-articles-carrousel .swiper-wrapper")
      .appendChild(new DOMGenerator(itemData).element);
  }
}

function topMonthCarrousel() {
  let cont = -1
  productsArray.map(item => {
    item.top &&
    (
      cont++,
      document.querySelector("#top-month-carrousel .swiper-wrapper")
        .appendChild(new DOMGenerator(item, cont).element)
    )
  })
}

function discountArticlesCarrousel() {
  productsArray.map(item => {
    item.discount &&
    document.querySelector("#discount-articles-carrousel .swiper-wrapper")
      .appendChild(new DOMGenerator(item).element)
  })
}

function singleProductView() {
  productsArray.map(item => {
    item.id == LOCATION_PARAM_URL &&
    document.querySelector(".header-product")
      .appendChild(new DOMGenerator(item).singleProduct)
  })

  popularArticlesCarrousel();
}

function productsCatalogoView() {
  const filter = document.querySelector("#filter-category-salect").value != "no" 
  ? document.querySelector("#filter-category-salect").value 
  : false; 
  productsArray.map(item => {
    if (filter && item.category == filter || !filter) {
      document.querySelector(".container-cards-products-catalogo")
      .appendChild(new DOMGenerator(item).productsCatalogo)
    }
  })
}

function productsFavoritosView() {
  readData()
  .then((arrayRequest) => {
    arrayRequest.length != 0 
    ? (
      document.querySelector(".container-cards-products-favoritos").style.display = "flex",
      arrayRequest.map(item => {
      document.querySelector(".container-cards-products-favoritos")
        .appendChild(new DOMGenerator(item).productsFavoritos)
      })
    )
    : document.querySelector(".container-no-favs").style.display = "flex";
  })
}

function productsCartViewLS() {
  let arrayLS = JSON.parse(localStorage.getItem("cart-products"));
  
  arrayLS.map(itemLS => {
    productsArray.map(item => {
      if (item.id == itemLS.id) {
        document.querySelector("#container-cart")
        ?.appendChild(new DOMGenerator(item, "", itemLS.sizeLS, itemLS.colorLS, itemLS.quantityLS).productsCartLS);
      }
    });
  });

  totalPriceCart();
  deleteProductCart();
}

function productsCartView() {
  let cartProductsArray = [];
  cartProductsArray = JSON.parse(localStorage.getItem("cart-products"));
  let isExistProduct = cartProductsArray.find((product) => product.id === LOCATION_PARAM_URL && product.sizeLS == sizeAndColor.size && product.colorLS == sizeAndColor.color && product.quantityLS > 1);
  if (isExistProduct) {
    document.querySelectorAll(".card-product-cart").forEach(card => card.remove());
    productsCartViewLS();
  } else {
    productsArray.map(item => {
      item.id == LOCATION_PARAM_URL &&
      document.querySelector("#container-cart")
      .appendChild(new DOMGenerator(item, sizeAndColor).productsCart)
    })
  }
  totalPriceCart();
  deleteProductCart();
}

getProducts();


const closeCart = () => {
  document.querySelector("#close-cart-btn")?.addEventListener("click", () => {
    document.querySelector("#container-cart").style.display = "none";
  });
}

const openCart = () => {
  document.querySelector("#open-cart-btn")?.addEventListener("click", () => {
    document.querySelector("#container-cart").style.display = "block";
  });
}

closeCart();
openCart();

const addCart = () => {
  document.querySelector("#add-cart-btn").addEventListener("click", () => {
    let getItemLS = localStorage.getItem("cart-products") || [];
    const isMore10 = getItemLS.length > 0 && JSON.parse(getItemLS).find((product) => product.id == LOCATION_PARAM_URL && product.quantityLS >= 10)
    if (isMore10) {
      maxQtyCartAlert();
      return;
    }
    let priceTotal = 0
    document.querySelectorAll('.price-value-cart').forEach((productElement) => {
      priceTotal += parseFloat(productElement.textContent);
    })
    if (priceTotal >= 50000) {
      maxQtyCartAlert();
      return;
    }
    if (getItemLS.length <= 0) {
      localStorage.setItem("cart-products", JSON.stringify([{id: LOCATION_PARAM_URL, sizeLS: sizeAndColor.size, colorLS: sizeAndColor.color, quantityLS: 1}]))
    } else {
      let cartProductsArray = [];
      cartProductsArray = JSON.parse(localStorage.getItem("cart-products"));
      let isExistProduct = cartProductsArray.find((product) => product.id === LOCATION_PARAM_URL && product.sizeLS == sizeAndColor.size && product.colorLS == sizeAndColor.color);
      if (isExistProduct) {
        isExistProduct.quantityLS += 1;
        localStorage.setItem("cart-products", JSON.stringify(cartProductsArray));
      } else {
        cartProductsArray.push({ id: LOCATION_PARAM_URL, sizeLS: sizeAndColor.size, colorLS: sizeAndColor.color, quantityLS: 1 });
        localStorage.setItem("cart-products", JSON.stringify(cartProductsArray));
      } 
    }
    productsCartView();
    quantyCart();
    addCartAlert();
  })
}

const maxQtyCartAlert = () => {
  document.querySelector(".alert-unfav")?.remove();
  const alertAddCart = document.createElement("div");
  alertAddCart.classList = "alert-unfav",
  alertAddCart.textContent = `Máxima cantidad alcanzada`
  document.querySelector("body").appendChild(alertAddCart);
}

const addCartAlert = () => {
  document.querySelector(".alert-fav")?.remove();
  const alertAddCart = document.createElement("div");
  alertAddCart.classList = "alert-fav",
  alertAddCart.textContent = `¡Agregado al carrito!`
  document.querySelector("body").appendChild(alertAddCart);
}

const deleteProductCart = () => {
  document.querySelectorAll(".btn-delete-product-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const cardProductCart = e.target.closest(".card-product-cart");
      cardProductCart.remove();
      const cardProductCartId = cardProductCart.id.split('-')[1];
      const filteredArrayLS = JSON.parse(localStorage.getItem("cart-products")).filter(item => item.id != cardProductCartId)
      localStorage.setItem("cart-products", JSON.stringify(filteredArrayLS))
      totalPriceCart();
      quantyCart();
    })
  })
}

const clearCart = () => {
  document.querySelector("#btn-clear-cart")?.addEventListener("click", () => {
    document.querySelectorAll(".card-product-cart").forEach(card => 
      card.remove()
    );
    localStorage.removeItem("cart-products");
    quantyCart();
    totalPriceCart();
  })  
}

const quantyCart = () => {
  let items = 0;
  JSON.parse(localStorage.getItem("cart-products"))?.forEach(itemLS => {
    items += itemLS.quantityLS;
  });
  document.querySelector(".cart-qty").textContent = items;
}

const totalPriceCart = () => {
  const priceValueB = document.createElement("b");
  let priceValueTotal = 0;
  document.querySelectorAll('.price-value-cart').forEach((productElement) => {
    priceValueTotal += parseFloat(productElement.textContent);
  })
  
  priceValueB.textContent = `$${priceValueTotal}`;
  
  if (document.querySelector("#btn-pay-cart > b")) {
    document.querySelector("#btn-pay-cart > b").textContent = priceValueB.textContent;
  } else {
    document.querySelector("#btn-pay-cart")?.appendChild(priceValueB);
  }
}

const enableBtnAddCart = () => {
  if (flagSize && flagColor) {
    document.querySelector("#add-cart-btn").removeAttribute("disabled");
  }
}

const selectSize = () => {
  document.querySelectorAll(".span-sizes").forEach(size => {
    size.addEventListener("click", () => {
      size.classList.add("span-size-active");
      size.classList.contains("span-size-active") && (flagSize = true);
      enableBtnAddCart();
      sizeAndColor.size = size.id;
      document.querySelectorAll(".span-sizes").forEach(eachSize => {
        eachSize.id != size.id 
          && eachSize.classList.remove("span-size-active")
      })
    })
  })
}

const selectColor = () => {
  document.querySelectorAll(".span-colors").forEach(color => {
    color.addEventListener("click", () => {
      color.classList.add("span-color-active");
      color.classList.contains("span-color-active") && (flagColor = true);
      enableBtnAddCart();
      sizeAndColor.color = color.id;
      document.querySelectorAll(".span-colors").forEach(eachColor => {
        eachColor.id != color.id
          && eachColor.classList.remove("span-color-active")
      })
    })
  })
}

const addRemoveFav = () => {
  document.querySelectorAll(".favorite-btn").forEach(btnFav => {
    btnFav.addEventListener("click", (e) => {
      const idCard = LOCATION_URL !== "/producto.html"
      ? parseInt(e.target.closest(".card-product").id.split("-")[1])
      : LOCATION_PARAM_URL;

      document.querySelector(".alert-fav")?.remove();
      document.querySelector(".alert-unfav")?.remove();
            
      const alertFavDiv = document.createElement("div");
      readData().then((arrayRequest) => {
        arrayRequest.map(item => {
          item.id == idCard &&
          (
            removeData(idCard),
            alertFavDiv.classList = "alert-unfav",
            e.target.src = "./imgs/icons/favoritos-icon.svg",
            alertFavDiv.textContent = `¡${item.name} quitado de favoritos!` 
          )
        })
      })
      productsArray.map(item => {
        item.id == idCard &&
          (
            addData(item),
            alertFavDiv.classList = "alert-fav",
            e.target.src = "./imgs/icons/favoritos-lleno-icon.svg",
            alertFavDiv.textContent = `¡${item.name} agregado a favoritos!`
          );
      })

      alertFavDiv.textContent &&
      document.querySelector("body").appendChild(alertFavDiv);
    })
  })
}

const filterCategory = () => {
  document.querySelector("#filter-category-salect")?.addEventListener("change", (e) => {
    document.querySelectorAll(".card-product-catalogo")?.forEach(product =>
      product.remove()
    );
    productsCatalogoView();
    addRemoveFav();
    randomBanner();
  })
}

const exitProductWhitKey = () => {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      window.history.back();
    }
  });
}

LOCATION_URL.includes("producto.html") &&
  exitProductWhitKey();

const openFilterWithKey = () => {
  document.addEventListener("keydown", function (event) {
    if (event.key === "f" || event.key === "F")
      document.querySelector("#filter-category-salect")?.focus();
  });
}

LOCATION_URL.includes("catalogo.html") &&
openFilterWithKey();

let banner10s = null;
let bannerOpacity = null;

const randomBanner = () => {
  clearTimeout(banner10s);
  clearTimeout(bannerOpacity);
  document.querySelector(".banner-link").style.display = "block";
  document.querySelector(".banner-link").style.opacity = 1;
  const numRand = Math.floor(Math.random() * 4);
  document.querySelector(".banner").src = BANNER_SRC_ARRAY[numRand].src;
  document.querySelector(".banner-link").href = `producto.html?id=${BANNER_SRC_ARRAY[numRand].idProduct}`;
  bannerOpacity = setTimeout(() => {
    document.querySelector(".banner-link").style.opacity = 0;
  }, 9900);
  banner10s = setTimeout(() => {
    document.querySelector(".banner-link").style.display = "none";
  }, 10000);
}

const myPurchaces = () => {
  let totalPriceValue = 0;
  if (!JSON.parse(localStorage.getItem("purchases"))) {
    document.querySelector(".container-no-purchases").style.display = "flex";
  } else {
    JSON.parse(localStorage.getItem("purchases"))?.map(itemLS => {
      productsArray.map(product => {
        if (itemLS.id == product.id) {
          totalPriceValue += product.price * itemLS.quantityLS;

          const divProduct = document.createElement("div");
          divProduct.classList = "card-products-payment";

          const smallCant = document.createElement("small");
          smallCant.textContent = `x${itemLS.quantityLS}`;

          const imgProduct = document.createElement("img");
          imgProduct.src = `/imgs/${product.category}/${product.image}-delante.jpg`;

          const h5Name = document.createElement("h5");
          h5Name.textContent = product.name;

          const spanPrice = document.createElement("span");
          spanPrice.textContent = `${(product.price * itemLS.quantityLS).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`;

          divProduct.appendChild(smallCant);
          divProduct.appendChild(imgProduct);
          divProduct.appendChild(h5Name);
          divProduct.appendChild(spanPrice);
          document.querySelector(".container-my-purchases").appendChild(divProduct);
        }
      });
    });

    const priceTotalDiv = document.createElement("div");
    const priceTotalSpan = document.createElement("span");
    const priceTotalB = document.createElement("b");

    priceTotalDiv.classList = "total-my-purchases";
    priceTotalSpan.textContent = "Total:";
    priceTotalB.textContent = `${totalPriceValue.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`;
    priceTotalSpan.appendChild(priceTotalB);
    priceTotalDiv.appendChild(priceTotalSpan);
    document.querySelector(".container-my-purchases").appendChild(priceTotalDiv);
  }
};


const cardPaymentMethod = () => {
  document.querySelector("#select-method-payment").addEventListener("change", () => {
    if (document.querySelector("#select-method-payment").value === "card-payment") {
      document.querySelector("#card-input").style.display = "block";
      document.querySelector("#cvv-input").style.display = "block";
    } else {
      document.querySelector("#card-input").style.display = "none";
      document.querySelector("#cvv-input").style.display = "none";
    }
  })
}

const summaryPayment = () => {
  document.querySelector("#accept-payment").addEventListener("click", (event) => {
    event.preventDefault();
    if (
      document.querySelector("#name-input").value.trim() == "" ||
      document.querySelector("#surname-input").value.trim() == "" ||
      document.querySelector("#email-input").value.trim() == "" ||
      document.querySelector("#location-input").value.trim() == "" ||
      document.querySelector("#date-input").value.trim() == ""
    ) {
      document.querySelector(".error-alert-form").style.display = "flex";
    } else {
      if (!localStorage.getItem("cart-products") || localStorage.getItem("cart-products").length <= 0) {
        document.querySelector(".error-alert-form > p").textContent = "No tienes ningún producto en el carrito",
        document.querySelector(".error-alert-form").style.display = "flex"
        return
      };
      document.querySelector(".error-alert-form").style.display = "none";
      document.querySelector("#background-summary-alert").style.display = "block";
      document.querySelector("#summary-alert").style.display = "flex";
      document.querySelector(".container-alert-info > h3 > b").textContent = document.querySelector("#name-input")?.value;
      document.querySelector(".container-alert-info > p > b").textContent = document.querySelector("#location-input")?.value;
      document.querySelector(".container-alert-info > p > span").textContent = document.querySelector("#date-input")?.value;

      JSON.parse(localStorage.getItem("cart-products"))?.map(itemLS => {
        productsArray?.map(product => {
          if (itemLS.id == product.id) {
            const divProduct = document.createElement("div");
            divProduct.classList = "card-products-payment";
            
            const smallCant = document.createElement("small");
            smallCant.textContent = `x${itemLS.quantityLS}`;
            
            const imgProduct = document.createElement("img");
            imgProduct.src = `/imgs/${product.category}/${product.image}-delante.jpg`;
            
            const h5Name = document.createElement("h5");
            h5Name.textContent = product.name;
            
            const spanPrice = document.createElement("span");
            spanPrice.textContent = `${(product.price * itemLS.quantityLS).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`;

            divProduct.appendChild(smallCant);
            divProduct.appendChild(imgProduct);
            divProduct.appendChild(h5Name);
            divProduct.appendChild(spanPrice);

            document.querySelector(".container-products-payment").appendChild(divProduct);
          }
        });
      });
    }
  })
}

const returnAlertPayment = () => {
  document.querySelector("#return-alert-payment").addEventListener("click", () => {
    document.querySelector("#background-summary-alert").style.display = "none";
    document.querySelector("#summary-alert").style.display = "none";
    document.querySelector(".container-products-payment").textContent = '';
  })
}

const acceptAlertPayment = () => {
  document.querySelector("#accept-alert-payment").addEventListener("click", () => {
    const arrayCart = JSON.parse(localStorage.getItem("cart-products"));
    if (localStorage.getItem("purchases")) {
      const purchasesLS = JSON.parse(localStorage.getItem("purchases"));

      purchasesLS.push(...arrayCart);

      localStorage.setItem("purchases", JSON.stringify(purchasesLS))
    } else {
      localStorage.setItem("purchases", JSON.stringify(arrayCart));
    }
    window.location.href = "./compras.html";
  })
}

LOCATION_URL.includes("/resumen.html") &&
(
  cardPaymentMethod(),
  returnAlertPayment(),
  summaryPayment(),
  acceptAlertPayment()
);

// -----------
// indexed DB
// -----------


let db;
let request = indexedDB.open("Tienda-Ropa", 1);

request.onerror = function () {
  console.log("request error");
};

request.onsuccess = function () {
  db = request.result;
  countData();
  readData();
};

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore("Favoritos", { keyPath: "id" });
  objectStore.createIndex("Productos", "id", { unique: true });
};

const countData = () => {
  let transaction = db?.transaction(["Favoritos"], "readwrite");
  let objectStore = transaction?.objectStore("Favoritos");
  let request = objectStore?.count();

  request.onsuccess = function () {
    document.querySelector(".header-favoritos > p") &&
      (
      document.querySelector(".header-favoritos > p").innerText =
        request.result > 0
          ? `Tienes ${request.result} productos favoritos`
          : ``
      )
  };
};

const addData = (data) => {
  let transaction = db.transaction(["Favoritos"], "readwrite");
  let objectStore = transaction.objectStore("Favoritos");
  objectStore.add(data);
};

let arrayRequestIDB = [];

const readData = () => {
  return new Promise((resolve, reject) => {
    let transaction = db?.transaction(["Favoritos"], "readonly");
    let objectStore = transaction?.objectStore("Favoritos");
    let request = objectStore?.getAll();
    if (request) { 
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    }
  });
};

const removeData = (key) => {
  let transaction = db.transaction(["Favoritos"], "readwrite");
  let objectStore = transaction.objectStore("Favoritos");
  objectStore.delete(key);
};


window.addEventListener("offline", () => {
  document.querySelector(".offline-alert").style.display = "flex";
  document.querySelector(".online-alert").style.display = "none";
});

window.addEventListener("online", () => {
  document.querySelector(".online-alert").style.display = "flex";
  document.querySelector(".offline-alert").style.display = "none";
});

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    document.querySelector(".container-notifications-btn").remove();
  }
})

document.querySelector(".notifications-btn")?.addEventListener("click", (e) => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        e.target.parentNode.parentNode.remove();
        const notification = new Notification("Nuevo en Urban Hell", {
          body: "¡Entérate de todas las novedades!",
          icon: "./imgs/icons/urban-hell-logo.png",
        });

        notification.addEventListener("click", () => {
          window.location.href = "./catalogo.html"; 
        });
      }
    });
  }
})

document.querySelector(".close-notifications-btn")?.addEventListener("click", (e) => {
  e.target.parentNode.parentNode.remove();
})



// Service Worker

if ("serviceWorker" in navigator) {
  try {
    var swRegistration =
    navigator.serviceWorker.register("./serviceWorker.js")
    console.log("service worker registered");
  } catch (error) {
    console.log("service worker reg failed");
  }
} else {
  console.log("sw not supperted");
}