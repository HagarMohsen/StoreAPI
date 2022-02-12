import { Order, OrdersStore } from "../../models/order";
import { User, UsersStore } from "../../models/user";

const orderStore = new OrdersStore();
const userStore = new UsersStore();
const orderTesting: Order = { status: "open", user_id: "" };

let order: Order;

describe("Order Model", () => {
  describe("Main Operations Methods", () => {
    it("should have an index method", () => {
      expect(orderStore.index).toBeDefined();
    });
    it("should have a show method", () => {
      expect(orderStore.show).toBeDefined();
    });

    it("should have an update method", () => {
      expect(orderStore.update).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(orderStore.deleting).toBeDefined();
    });
  });

  describe("Functionality of the Operations Methods", () => {
    beforeAll(async () => {
      const userTesting: User = {
        firstname: "Sara",
        lastname: "Shahine",
        password: "Password2468",
      };
      const user = await userStore.create(userTesting);
      orderTesting.user_id = String(user.id);
    });

    it("create method should add an order", async () => {
      order = await orderStore.create(orderTesting);
      expect({ status: order.status, user_id: order.user_id }).toEqual({
        status: orderTesting.status,
        user_id: orderTesting.user_id,
      });
    });

    it("update method should update the order status", async () => {
      const updated = await orderStore.update({ ...order, status: "closed" });
      expect(updated.status).toEqual("closed");
    });
  });
});
