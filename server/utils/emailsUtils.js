const { sendEmail } = require('../services/emailService');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const welcomeTemplatePath = path.join(__dirname, 'templates', '../../templates/welcome-email.ejs');
const actionTemplatePath = path.join(__dirname, 'templates', '../../templates/admin-action-email.ejs');
const loanTemplatePath = path.join(__dirname, 'templates', '../../templates/loan-template-email.ejs');

const sendWelcomeEmail = async (email) => {

    fs.readFile(welcomeTemplatePath, 'utf8', async (err, template) => {
        if (err) {
            console.error('Error in template:', err);
            return;
        }
    
        const subject = 'Bienvenido al Club CaraSur'
        const text = 'Bienvenido a Club CaraSur'
        const html = ejs.render(template)

        try {
            await sendEmail({ to: email, subject, text, html })
        } catch (error) {
            console.error(error)
        }
    })
}

const adminActionEmail = async (email, message, url) => {

    fs.readFile(actionTemplatePath, 'utf8', async (err, template) => {
        if (err) {
            console.error('Error in template:', err)
            return
        }

        const data = {
            subject: 'Acción requerida',
            message: message,
            url: url
        }
    
        const subject = 'Accion de Administrado Requerida'
        const text = 'Accion de Administrado Requerida'
        const html = ejs.render(template, data)

        try {
            await sendEmail({ to: email, subject, text, html })
        } catch (error) {
            console.error(error)
        }
    })
}

const loanEmail = async (email, product) => {

    fs.readFile(loanTemplatePath, 'utf8', async (err, template) => {
        if (err) {
            console.error('Error in template:', err)
            return
        }

        const data = {
            product : product
        }
    
        const subject = 'Solicitud de préstamo'
        const text = 'Solicitud de préstamo'
        const html = ejs.render(template, data)

        try {
            await sendEmail({ to: email, subject, text, html })
        } catch (error) {
            console.error(error)
        }
    })
}

module.exports = { 
    sendWelcomeEmail,
    adminActionEmail,
    loanEmail

 }