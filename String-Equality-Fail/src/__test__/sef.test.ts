import { formatCurrency } from "../sef";

it("Makes sensible life choices and passes basic string equality checks", () => {
  var price: String = formatCurrency(300);
  expect(price).toEqual("R 300.00");
});