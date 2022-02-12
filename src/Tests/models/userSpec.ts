import { User, UsersStore } from "../../models/user";

const store = new UsersStore();
const userTesting: User = {
  firstname: "Hagar",
  lastname: "Shahine",
  password: "Password1234",
};
let user: User;

describe("User Model", () => {
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
    it("create method should add a user", async () => {
      user = await store.create(userTesting);
      expect({ firstname: user.firstname, lastname: user.lastname }).toEqual({
        firstname: userTesting.firstname,
        lastname: userTesting.lastname,
      });
    });

    it("index method should include the user", async () => {
      const users = await store.index();
      expect(users).toContain(user);
    });

    it("show method should return the user", async () => {
      const search = await store.show(Number(user.id));
      expect(search).toEqual(user);
    });

    it("delete method should delete the user", async () => {
      const deleted = await store.deleting(Number(user.id));
      expect(deleted.id).toEqual(user.id);
    });
  });
});
