module.exports = {
    '{packages,tools}/**/*.{ts,js,json,md,html,css,scss}': [
      'nx format:write --uncommitted',
      'nx affected --target lint --uncommitted',
    ],
  };