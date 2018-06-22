const app = require('express')();
const { Nuxt, Builder } = require('nuxt')
const session = require('express-session')
const bodyParser = require('body-parser')
const nuxtOptions = require('./nuxt.config')
const axiosServer = require('axios')
const api = require('./config/api')
var querystring = require('querystring');

app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: 'erbaobuer@qq.com',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 }
}))

/*
**转发请求
*/
app.post('/api/login', (req, res) => {
    axiosServer.post(api.LOGIN , querystring.stringify(req.body), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      let data = response.data;
      // console.log(data);
      req.session.authInfo = {admin_id: data.data.admin_id, token: data.data.token, role: data.data.admin_name};
      // console.log(req.session);
      return res.json(data)
    }).catch(e => {
      console.log(e)
    })
})

app.post('/api/logout', (req, res) => {
  delete req.cookie;
  delete req.session;
  return res.json({userName: 'demo'})
})

const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt(Object.assign({}, { dev: !isProd }, nuxtOptions));
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build('')
}
app.use(nuxt.render)
app.listen(6001)
console.log('Server is listening on http://localhost:6001')
