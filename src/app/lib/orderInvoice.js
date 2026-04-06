export const orderInvoiceTemplate = ({ orderId, items, totalPrice }) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #f0f0f0; border-radius: 15px; overflow: hidden; background-color: #ffffff;">
      
      <div style="background-color: #FF7043; padding: 30px; text-align: center;">
        <img src="https://i.ibb.co.com/JP7wW6K/logo.png" alt="Hero Kids Logo" style="width: 120px; margin-bottom: 10px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Order Confirmed!</h1>
      </div>

      <div style="padding: 30px;">
        <div style="margin-bottom: 25px; border-bottom: 2px dashed #eeeeee; padding-bottom: 15px;">
          <p style="margin: 0; color: #777; font-size: 14px;">Order ID:</p>
          <h2 style="margin: 5px 0; color: #333; font-size: 18px; font-family: monospace;">#${orderId}</h2>
        </div>

        <h3 style="color: #FF7043; font-size: 16px; margin-bottom: 15px;">Items Summary</h3>
        
        <table width="100%" cellspacing="0" cellpadding="10" style="border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f9f9f9; border-bottom: 1px solid #eeeeee;">
              <th align="left" style="color: #555; font-size: 14px;">Product</th>
              <th align="center" style="color: #555; font-size: 14px;">Qty</th>
              <th align="right" style="color: #555; font-size: 14px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr style="border-bottom: 1px solid #fcfcfc;">
                <td style="padding: 12px 10px; font-size: 14px; color: #333;">
                    <strong>${item.title}</strong>
                </td>
                <td align="center" style="color: #666; font-size: 14px;">${item.quantity}</td>
                <td align="right" style="color: #333; font-weight: bold; font-size: 14px;">৳${item.price}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div style="background-color: #fff9f7; padding: 20px; border-radius: 10px; text-align: right;">
          <p style="margin: 0; font-size: 14px; color: #777;">Grand Total</p>
          <h2 style="margin: 5px 0; color: #FF7043; font-size: 28px;">৳${totalPrice}</h2>
        </div>

        <div style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
          <p>If you have any questions, please contact us at support@herokids.com</p>
          <p style="margin-top: 10px;">&copy; 2026 Hero Kids. All rights reserved.</p>
          <div style="margin-top: 15px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #FF7043; border-radius: 50%;"></span>
            <span style="display: inline-block; width: 8px; height: 8px; background: #FFC107; border-radius: 50%; margin: 0 5px;"></span>
            <span style="display: inline-block; width: 8px; height: 8px; background: #4CAF50; border-radius: 50%;"></span>
          </div>
        </div>
      </div>
    </div>
  `;
};