const dev = {
  base_url: "http://localhost:3000/", // LOCAL
};

const staging = {
  base_url: "http://localhost:3000/", // LOCAL
};

const uat = {
  base_url: "http://localhost:3000/", // LOCAL
};

const production = {
  base_url: "http://localhost:3000/", // LOCAL
};

let configVariables = {
  ...dev,
};

//Change the config for production and development
switch (process.env.REACT_APP_BUILD_ENV) {
  case "staging":
    configVariables = {
      ...staging,
    };
    break;
  case "uat":
    configVariables = {
      ...uat,
    };
    break;
  case "production":
    configVariables = {
      ...production,
    };
    break;
  default:
    configVariables = {
      ...dev,
    };
    break;
}

// ecporting the defaults
export default {
  ...configVariables,
};
