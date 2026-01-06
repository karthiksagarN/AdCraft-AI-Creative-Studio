import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from config import Config

class EmailService:
    @staticmethod
    def send_contact_email(name: str, email: str, subject: str, message_body: str) -> dict:
        """
        Sends an email using SendGrid.
        """
        sender_email = Config.FROM_EMAIL
        receiver_email = Config.MAIL_USERNAME # Send to the admin
        
        # Fallback if config is missing (for safety, though we should enforce it)
        if not sender_email or not Config.SENDGRID_API_KEY:
            print("SendGrid credentials missing. Logging only.")
            print(f"--- CONTACT MSG ---")
            print(f"From: {name} <{email}>")
            print(f"Subject: {subject}")
            print(f"Body: {message_body}")
            return {"status": "success", "message": "Logged (credentials missing)"}
            
        if not receiver_email:
             # If no admin email set, send to self (sender) or just log warning?
             # Let's default receiver to sender if MAIL_USERNAME isn't set, or maybe just fail safely.
             # Better to use FROM_EMAIL as receiver if MAIL_USERNAME is not set.
             receiver_email = sender_email

        content = f"""
        You have received a new contact message:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message_body}
        """
        
        message = Mail(
            from_email=sender_email,
            to_emails=receiver_email,
            subject=f"New Contact: {subject}",
            html_content=content.replace("\n", "<br>")
        )
        
        # Set reply-to so the admin can reply to the user easily
        message.reply_to = email

        try:
            sg = SendGridAPIClient(Config.SENDGRID_API_KEY)
            response = sg.send(message)
            print(f"Email sent. Status Code: {response.status_code}")
            return {"status": "success", "message": "Email sent successfully"}
        except Exception as e:
            print(f"Error sending email: {e}")
            return {"status": "error", "message": str(e)}
