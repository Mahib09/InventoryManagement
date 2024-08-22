module.exports = {
  apps: {
    name: "InventoryManagement",
    script: "npm",
    arg: "run dev",
    env: {
      NODE_ENV: "development",
      ENV_VAR1: "encironment-variable",
    },
  },
};
