import { app } from './app'
import chalk from 'chalk';

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log(chalk.greenBright(`🆙 Server running!`));
})