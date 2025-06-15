import PDFDocument from "pdfkit";
import { generateID } from "../utils/generateID.js";
import { generateBarcode } from "../utils/generateBarcode.js";

export const confirmOrderControllerasync = async (req, res) => {
  const { senderName, senderAddress, receiverName, receiverAddress } =
    req.body.formData;

  if (!senderName || !senderAddress || !receiverName || !receiverAddress) {
    return res
      .status(401)
      .json({ success: "false", message: "All fields are required." });
  }

  try {
    //generate unique id
    const deliveryId = generateID();

    //create barcode
    const barcodePng = await generateBarcode(deliveryId);

    //create pdf
    const doc = new PDFDocument();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${deliveryId}.pdf"`,
    });

    res.status(200);

    doc.text("Sender");
    doc.text(`Name: ${senderName}`);
    doc.text(`Address: ${senderAddress}`);
    doc.moveDown();
    doc.text("Receiver");
    doc.text(`Name: ${receiverName}`);
    doc.text(`Address: ${receiverAddress}`);
    doc.moveDown();
    doc.text("Delivery Id");
    doc.text(deliveryId);
    doc.image(barcodePng, 200, 300, {
      width: 200,
      height: 50,
    });

    doc.end();
    doc.pipe(res);
  } catch (error) {
    console.log("Error in confirmOrderController ", error);
    res
      .status(401)
      .json({ success: "false", message: "Error while creating pdf." });
  }
};
