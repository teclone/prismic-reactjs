import PrismicHelpers from 'prismic-helpers';
import PrismicRichText from '@teclone/prismic-richtext';
import Component from './Component';

export default {
  Date: PrismicHelpers.Date,
  Elements: PrismicRichText.Elements,
  Link: PrismicHelpers.Link,
  RichText: Component.default,
};
