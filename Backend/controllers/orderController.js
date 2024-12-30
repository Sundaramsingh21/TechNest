import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';



//placing user order from frontend
const sendEmail = async (items, address, amount) => {
    try {
        
        const email = address.email;
        const Name = address.firstName;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, 
            },
        });

        
        const itemsHtml = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER, // Use your environment variable email
            to: email,
            subject: 'Order Placed Successfully',
            text: `Order Summery`,
            html: `
               <h2>Hello, ${Name}</h2>
                <p>Your order has been placed successfully. Below are the details:</p>
                <table border="1" style="border-collapse: collapse; width: 100%;">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price(1pic)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <p>Delivery charges :₹30 </p>
                <p><strong>Total Amount:</strong> ₹${amount}/-</p>
                <p>You can see your order status in Orders section.</p>
                <p>Thank you for shopping with us!</p><br/>
                <p>TechNest Electronic Pvt.Ltd</p>
            `
        };
        const send = await transporter.sendMail(mailOptions);
        if (send) {
            console.log('Email sent successfully');
        }
        

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }


}
const placeOrder = async (req, res) => {

    try {
       const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')
            }/${currentDate.getFullYear()}`;
        
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            status: "Order Placed",
            payment: true,
            address: req.body.address,
            current_date :formattedDate
        })
        await newOrder.save();
        let a = await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        await sendEmail(newOrder.items, req.body.address, newOrder.amount);

        // Send success response
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        // Send error response
        res.json({ success: false, message: "An error occurred while placing the order" });
    }
}

//user order for frontend
const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

// Listing orders for admin panel
const listorders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// api for updating order 
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });

    }

}
//delete order
const removecomponent = async (req, res) => {
    try {
        const component = await orderModel.findById(req.body.id);
        if (component) {
            await orderModel.findByIdAndDelete(req.body.id);
            res.json({ success: true })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
}

export { placeOrder, userOrder, listorders, updateStatus, removecomponent }
