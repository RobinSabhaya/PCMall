const puppeteer = require("puppeteer");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const orderModel = require("../../db/models/orderSchema");
const ejs = require("ejs");
const invoiceController = () => {
  return {
    async getInvoice(req, res) {
      const { id } = req.params;
      const orderData = await orderModel
        .findOne({ _id: id })
        .populate({ path: "customerId" });
      const browser = await puppeteer.launch({
        executablePath: "../../node_modules/puppeteer/install.js",
        headless: "new",
      });
      const page = await browser.newPage();
      await page.emulateMediaType("screen");
      const ejsData = fs.readFileSync(
        path.resolve(__dirname, "../../views/customer/invoice.ejs"),
        "utf8"
      );
      const html = ejs.render(ejsData, {
        orderData: orderData,
        dayjs: dayjs,
      });
      await page.setContent(html, {
        waitUntil: "domcontentloaded",
      });
      await page.addStyleTag({
        path: path.resolve(__dirname, "../../public/css/app.css"),
      });
      await page.pdf({
        path: path.resolve(
          __dirname,
          `../../downloads/invoice_${orderData?._id}.pdf`
        ),
        margin: {
          top: "10px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
        printBackground: true,
        format: "A4",
      });
      await browser.close();
      return res
        .status(200)
        .sendFile(
          path.resolve(
            __dirname,
            `../../downloads/invoice_${orderData?._id}.pdf`
          )
        );
    },
  };
};

module.exports = invoiceController;
