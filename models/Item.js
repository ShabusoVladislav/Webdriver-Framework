class Item {
  url;
  size;
  name;
  price;

  constructor(url, size= null, name = null, price = null) {
    this.url = url;
    this.size = size;
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  getSize() {
    return this.size;
  }

  setSize(size) {
    this.size = size;
  }
}

module.exports = Item;