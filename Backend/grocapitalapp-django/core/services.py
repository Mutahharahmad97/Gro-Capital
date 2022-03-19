from django.core.mail import send_mail

# Email Sending Service
def email_sender_service(email, code):
    send_mail(
        'Gro Capital Password Reset',
        'Your password reset code is: ' + code,
        'grocapital@gmail.com',
        [email],
        fail_silently=False,
    )