class Environment {
  get secret(): string {
    return process.env.secret || "secret";
  }
  get tokenExpiresIn(): number {
    if (!process.env.tokenExpiresIn) {
      return 86400;
    }
    return parseFloat(process.env.tokenExpiresIn);
  }
  get connectionString(): string {
    return (
      process.env.connectionString ||
      "Server=195.26.92.83;Database=test;UID=root;Password=password"
    );
  }
}
export const Environments = new Environment();
