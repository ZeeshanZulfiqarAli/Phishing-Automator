# Phishing Automator

This program streamline phishing attacks by automating finding and sending (malicious) emails to victim.


## Disclaimer
This program is made for educational purpose only. Authors are not liable for any misuse or harm arising from the use of this program.

## Usage
1. Clone the repo
2. Run `npm i`
3. Run `npm run start <...options>`

A sample command could be:
`npm run start -k re_AAAAAA_BBBBBBBBBBBB -f ./demo/emails.txt -sb "Can we do a meeting?" -s test@test.com -h ./demo/template.html`

## Options
```
  -v, --version                     output the version number
  -k, --resend_api_key <API_KEY>    [Required] Resent API Key.
  -s, --from <sender_email>         [Required] Sender email address.
  -sb, --subject <subject>          [Required] Subject to be used in the email.
  -h, --html <html_template_file>   [Required] HTML template file in .html format.
  -f, --filepath <emails_filepath>  Path to a TXT file containing emails. Should be a single email in a line.
  -d, --domain <domain>             Find emails for a domain automatically.
  --help                            display help for command
```

## Requirements
- Node v20.9.0
- (Resend)[https://resend.com/] Account
