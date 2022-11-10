require("dotenv").config();
const env = process.env;

module.exports =
{
  type: "service_account",
  project_id: env.PROJECT_ID,
  private_key_id: env.PRIVATE_KEY_ID,
  private_key: env.PRIVATE_KEY,
  client_email: env.CLIENT_EMAIL,
  client_id: env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: env.AUTH_PROVIDER_URL,
  client_x509_cert_url: env.CLIENT_CERT_URL
}
