
import dotenv from 'dotenv';
import transporter from '../utils/emailService.js';
dotenv.config()

export const Form = async (req, res)=>{

    try {
        const { name, email, dateOfBirth, contactNumber } = req.body;

        if (!name || !email || !dateOfBirth || !contactNumber) {
            return res.status(400).json({ 
                message: "All fields are required",
                success: false,
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ 
            message: "Invalid email format",
            success: false, 
        });
        }
    
        const mobileRegex = /^\d{10}$/;     //* check number must be 10 and start with 0
        if (!mobileRegex.test(contactNumber)) {
          return res.status(400).json({ 
            message: "Mobile number must be 10 digits",
            success: false,
        });
        }

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: `Thank You, ${name}, for Your Submission`,
            text: `Hello ${name},\n\nThank you for submitting your information. Here are the details we received:\n\nName: ${name}\nEmail: ${email}\nDate of Birth: ${dateOfBirth}\nContact Number: ${contactNumber}\n\nBest regards,\nSaurabh Niwate`,
        }

        const userResponse = {
            name : name,
            email : email,
            dob : dateOfBirth,
            contactNumber: contactNumber
          }

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ 
                message: 'Your submission was successful.',
                success: true, 
                user: userResponse
            });
        } catch (emailError) {
           // console.error('Error sending email:', emailError);
            res.status(500).json({ 
                message: 'An error occurred while sending the confirmation email.',
                success: false, 
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Internal Server Error',
            success: false,
        });
    }
}