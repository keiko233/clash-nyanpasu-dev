interface Config {
  mode: string;
  "mixed-port": number;
  "allow-lan": boolean;
  "log-level": string;
  ipv6: boolean;
  secret: string;
  "external-controller": string;
  proxies: [];
}

declare function main(params: Partial<Config>): Partial<Config>;
