import { Product, ProductsStore } from "../../models/product";

const store = new ProductsStore();
const productTesting: Product = { name: "MacBook", price: 50000 };
let product: Product;

describe("Product Model", () => {
  describe("Main Operations Methods", () => {
    it("should have a create method", () => {
      expect(store.create).toBeDefined();
    });

    it("should have an index method", () => {
      expect(store.index).toBeDefined();
    });
    it("should have a show method", () => {
      expect(store.show).toBeDefined();
    });

    it("should have an update method", () => {
      expect(store.update).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(store.deleting).toBeDefined();
    });
  });

  describe("Functionality of the Operations Methods", () => {
    it("create method should add a product", async () => {
      product = await store.create(productTesting);
      expect({ name: product.name, price: product.price }).toEqual({
        name: productTesting.name,
        price: productTesting.price,
      });
    });

    it("index method should include the product", async () => {
      const products = await store.index();
      expect(products).toContain(product);
    });

    it("show method should return the user", async () => {
      const search = await store.show(Number(product.id));
      expect(search).toEqual(product);
    });

    it("update method should update the product data", async () => {
      const updated = await store.update({ ...product, price: 60000 });
      expect({ id: product.id, name: product.name, price: 60000 }).toEqual({
        id: updated.id,
        name: updated.name,
        price: updated.price,
      });
    });
  });
});
