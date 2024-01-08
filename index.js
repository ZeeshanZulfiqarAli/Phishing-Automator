const { Resend } = require('resend');
const fs = require('fs');
const { Command, Option } = require('commander');
const program = new Command();

program
  .name('Phishing Automator')
  .version('1.0.0', '-v, --version')
  .description('Automate phishing emails')
  .usage('[OPTIONS]...')
  .requiredOption(
    '-k, --resend_api_key <API_KEY>',
    '[Required] Resent API Key.'
  )
  .requiredOption(
    '-s, --from <sender_email>',
    '[Required] Sender email address.'
  )
  .requiredOption(
    '-sb, --subject <subject>',
    '[Required] Subject to be used in the email.'
  )
  .requiredOption(
    '-h, --html <html_template_file>',
    '[Required] HTML template file in .html format.'
  )
  .addOption(
    new Option(
      '-f, --filepath <emails_filepath>',
      'Path to a TXT file containing emails. Should be a single email in a line.'
    )
  )
  .addOption(
    new Option(
      '-d, --domain <domain>',
      'Find emails for a domain automatically.'
    ).conflicts('filepath')
  )
  .parse();

const options = program.opts();

if (!options['filepath'] && !options['domain']) {
  console.error('error: please provide email txt filepath or domain');
  return;
}
if (options['filepath']) {
  if (!options['filepath'].endsWith('.txt')) {
    console.error('error: the file should be a .txt');
    return;
  }
  if (!fs.existsSync(options['filepath'])) {
    console.error('error: unable to locate file in path ', options['filepath']);
    return;
  }

  const data = fs.readFileSync(options['filepath'], 'utf8');
  const arr = data.split(/(\r\n|\r|\n)/).map((line) => line.trim());
  console.log('Sending email to', arr.length, 'email address(es)');
  Promise
    .all(arr.map((email) => sendEmail(email)))
    .then((result) => console.log('Emails sent.'))
    .catch((err) => console.error('Error encountered while sending email:', err));
}

async function sendEmail(to) {
  const resend = new Resend(options['resend_api_key']);
  const email_content = fs.readFileSync(options['html'], 'utf8');

  const { data, error } = await resend.emails.send({
    from: options['from'],
    to: [to],
    subject: options['subject'],
    html: email_content
  });

  if (error) {
    return console.error({ error });
  }
}
