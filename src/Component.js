import { func, elementType } from 'prop-types';

import { Elements } from 'prismic-richtext-jsx';
import { renderRichText, asText } from './richtext';

const createHtmlSerializer = (bucket = {}, serializers = []) => {
  const processors = serializers.reduce((acc, { type, fn }) => {
    return Object.assign({}, acc, { [type]: fn });
  }, {});
  return (type, ...args) => (processors[type] ? processors[type](type, ...args) : null);
};

const RichText = ({
  Component,
  htmlSerializer,
  linkResolver,
  render,
  renderAsText,
  serializeHyperlink,
  ...componentProps
}) => {
  const maybeSerializer =
    htmlSerializer ||
    (serializeHyperlink &&
      createHtmlSerializer({}, [
        {
          type: Elements.hyperlink,
          fn: serializeHyperlink,
        },
      ]));

  return render ? renderRichText(render, linkResolver, maybeSerializer, Component, componentProps) : null;
};

RichText.propTypes = {
  Component: elementType,
  linkResolver: func,
  htmlSerializer: func,
  serializeHyperlink: (props, _, componentName) => {
    if (props.serializeHyperlink && props.htmlSerializer) {
      return new Error(
        `You cannot specify both 'htmlSerializer' and 'serializeHyperlink'. The latter will be ignored by '${componentName}'.`
      );
    }
  },
  render: (props, _, componentName) => {
    if (!props.render) {
      return new Error(`Prop 'render' was not specified in '${componentName}'.`);
    }
  },
};

RichText.asText = asText;
RichText.render = renderRichText;
RichText.displayName = 'RichText';

export default RichText;
