class Item {
  name;
  price;
  url;
  size;

  constructor(url, size) {
    this.url = url;
    this.size = size;
  }

  getName () {
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