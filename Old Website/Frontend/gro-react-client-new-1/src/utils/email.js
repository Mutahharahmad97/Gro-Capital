const emailjs = window.emailjs;

export const sendEmail = (templateName, params) => new Promise((resolve, reject) => {
  emailjs.send('niko_gmail', templateName, params).then(function(response) {
    console.log('EmailJS sendEmail SUCCESS. status=%d, text=%s', response.status, response.text);
    resolve(true);
  }, function(err) {
    console.log('EmailJS sendEmail FAILED. error=', err);
    reject(err);
  });
});
