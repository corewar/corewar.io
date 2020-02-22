const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const sgMail = require('@sendgrid/mail')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(serve(__dirname))

router.post('/api/email', (ctx, next) => {

  console.log('/api/email')
  // ctx.router available
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const body = ctx.request.body

  const email = body.email
  const feedback = body.feedback

  const msg = {
    to: ['dougajmcdonald@gmail.com','gwilliams@bmtdsl.co.uk'],
    from: 'feedback@corewar.io',
    subject: 'Corewar.io - feedback',
    text: `You've recived feedback on corewar.io:
    from: ${email}
    feedback: ${feedback}`
  }

  return sgMail.send(msg).then(() => {
    //Celebrate
    ctx.status = 200
    ctx.body = JSON.stringify({ "message": "Your feedback was gratefully received, thanks for your time." })
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString())

    //Extract error msg
    const {message, code, response} = error

    //Extract response msg
    const {headers, body} = response
  })
})

app.use(router.routes())

const port = process.env.port || 1337

app.listen(port)

console.log("Server running at http://localhost:%d", port)