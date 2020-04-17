module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://ian@localhost/bash_generator",
  TEST_DATABASE_URL: "postgresql://ian@localhost/bash_generator",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
};
