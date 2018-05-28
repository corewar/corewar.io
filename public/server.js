const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const serve = require('koa-static')
const sgMail = require('@sendgrid/mail')

const app = new Koa()
const router = new Router()

app.use(KoaBody({ jsonLimit: '10Kb' }))
app.use(serve(__dirname + '/build/'))

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

  sgMail.send(msg)

})

app.use(router.routes())

const port = process.env.PORT || 5000;

app.listen(port)

console.log("Server running at http://localhost:%d", port);