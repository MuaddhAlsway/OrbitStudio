import { config, describeEmailConfig } from './config.js'
import { getDriver } from './db.js'
import { app, initApp } from './app.js'

/* Local / self-hosted entry point. On Vercel the same `app` is served
   through api/[...path].js instead of this listener. */

try {
  await initApp()
} catch (error) {
  console.error('[server] failed to initialise store', error)
}

app.listen(config.port, () => {
  console.log('\nManara inquiries API')
  console.log(`  http://localhost:${config.port}`)
  console.log(`  env:    ${config.env}`)
  console.log(`  store:  ${getDriver()} (${config.dataDir})`)
  console.log(`  email:  ${describeEmailConfig().enabled ? 'configured' : 'not configured'}`)
})
