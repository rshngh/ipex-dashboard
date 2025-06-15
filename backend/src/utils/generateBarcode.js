import bwipjs from "bwip-js";

export const generateBarcode = async (deliveryId) => {
  let barcode;

  barcode = await bwipjs.toBuffer({
    bcid: "code128",
    text: deliveryId,
    scale: 3,
    height: 10,
    includetext: true,
    textxalign: "center",
  });
  return barcode;
};
