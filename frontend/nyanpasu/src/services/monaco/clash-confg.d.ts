declare type ClashConfig = {
  proxies: any[];
};

/**
 * @deprecated since Clash Nyanpasu 1.6.0
 */
declare function main(params: ClashConfig): ClashConfig;

declare function config(params: ClashConfig): ClashConfig;
