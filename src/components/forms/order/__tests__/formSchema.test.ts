import {ValidationError} from "yup";
import formSchema from "../formSchema";

describe("Order Schema", () => {
  it("customer should be required", async () => {
    const schema = formSchema();

    try {
      await schema.validateAt("customer", {});
      expect(true).toBeFalse();
    } catch (e) {
      const err = e as ValidationError;
      expect(err.type).toBe("optionality");
      expect(err.message).toBe("Укажите заказчика");
    }
  });

  it("set should be required", async () => {
    const schema = formSchema();

    try {
      await schema.validateAt("set", {});
      expect(true).toBeFalse();
    } catch (e) {
      const err = e as ValidationError;
      expect(err.type).toBe("optionality");
      expect(err.message).toBe("Укажите сет");
    }
  });

  it("deadline should be required", async () => {
    const schema = formSchema();

    try {
      await schema.validateAt("deadline", {});
      expect(true).toBeFalse();
    } catch (e) {
      const err = e as ValidationError;
      expect(err.type).toBe("optionality");
      expect(err.message).toBe("Укажите дедлайн");
    }
  });

  it("details should be required", async () => {
    const schema = formSchema();

    try {
      await schema.validateAt("details", []);
      expect(true).toBeFalse();
    } catch (e) {
      const err = e as ValidationError;
      expect(err.type).toBe("optionality");
      expect(err.message).toBe("Необходимо указать детали заказа");
    }
  });
});