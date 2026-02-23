
export let products = [];
class Product {
  constructor({ id, image, name, ratings, priceCents }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.ratings = ratings;
    this.priceCents = priceCents;
  }
}

export  function loadProducts() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productData) => {
      products = productData.map((productData) => {
        return new Product(productData);
      });

      console.log("load products");
    }).catch((error)=>{
        console.log("Unexpected error please try to resolve")
        throw error;
    })
  return promise;
}
