// Generates a bcrypt hash for ADMIN_PASSWORD_HASH.
// Usage: node scripts/hash-password.js "your-new-password"
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.js "your-new-password"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log(hash);
});
