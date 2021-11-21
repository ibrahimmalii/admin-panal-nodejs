const sgMail = require('@sendgrid/mail')

const sendGridApiKey ='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'

sgMail.setApiKey(sendGridApiKey)

try{
    sgMail.send({
        to: 'hemamessi47@gmail.com',
        from: 'eng.ibrahimmalii@gmail.com',
        subject: 'this is first email from nodejs',
        text: 'I hope this one actually to you'
    }).then(console.log).catch(console.error)
} catch (e){
    cosnsole.log(e.message)
} 