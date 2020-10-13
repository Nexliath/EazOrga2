import parseTransaction from "splittypie/utils/parse-transaction";
import { module, test } from "qunit";
import moment from "moment";

module("Unit | Utility | parsing transaction for quick add", function() {
  const parseDate = date => moment(date).format("YYYY-MM-DD");

  test("returns null if empty string provided", function (assert) {
      const text = "    ";
      assert.equal(parseTransaction(text), null);
  });

  test("returns null if null provided", function (assert) {
      const text = null;
      assert.equal(parseTransaction(text), null);
  });

  test("'[amount] [name]' pattern set current date", function (assert) {
      const text = "40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment()));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("'[day] [amount] [name]' pattern set day of current month", function (assert) {
      const text = "2 40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2", "DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("'[month]/[day] [amount] [name]' pattern set day and month of current year", function (assert) {
      const text = "10/24 40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("10/24", "MM/DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("'[month]-[day] [amount] [name]' pattern set day and month of current year", function (assert) {
      const text = "10-24 40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("10-24", "MM-DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("'[year]/[month]/[day] [amount] [name]' pattern set full date", function (assert) {
      const text = "2014/10/24 40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014/10/24", "YYYY/MM/DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("'[year]-[month]-[day] [amount] [name]' pattern set full date", function (assert) {
      const text = "2014-10-24 40 shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014-10-24", "YYYY-MM-DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("returns amount null if not found", function (assert) {
      const text = "shopping mall";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, null);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment()));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("returns name null if not found", function (assert) {
      const text = "2";
      const transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 2);
      assert.equal(transactionProps.name, null);
      assert.equal(transactionProps.date, parseDate(moment()));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("amount could be a decimal", function (assert) {
      let text = "2014-10-24 40.45 shopping mall";
      let transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40.45);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014-10-24", "YYYY-MM-DD")));
      assert.equal(transactionProps.onlyMe, false);

      text = "2014-10-24 40,45 shopping mall";
      transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40.45);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014-10-24", "YYYY-MM-DD")));
      assert.equal(transactionProps.onlyMe, false);
  });

  test("returns onlyMe if text ends on '.me' or '. me'", function (assert) {
      let text = "2014-10-24 40.45 shopping mall.me";

      let transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40.45);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014-10-24", "YYYY-MM-DD")));
      assert.equal(transactionProps.onlyMe, true);

      text = "2014-10-24 40.45 shopping mall. me";
      transactionProps = parseTransaction(text);
      assert.equal(transactionProps.amount, 40.45);
      assert.equal(transactionProps.name, "shopping mall");
      assert.equal(transactionProps.date, parseDate(moment("2014-10-24", "YYYY-MM-DD")));
      assert.equal(transactionProps.onlyMe, true);
  });
});
