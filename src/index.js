const PrismicHelpers = require('prismic-helpers');
const PrismicRichText = require('prismic-richtext-jsx');
const Component = require('./Component');

module.exports = {
  Date: PrismicHelpers.Date,
  Elements: PrismicRichText.Elements,
  Link: PrismicHelpers.Link,
  RichText: Component.default,
};
