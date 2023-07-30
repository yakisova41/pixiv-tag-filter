declare module "*.css" {
  const classes: { [className: string]: string };
  export = classes;
}

declare module "*.scss" {
  const classes: { [className: string]: string };
  export = classes;
}
