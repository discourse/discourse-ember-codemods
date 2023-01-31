const recast = require('ember-template-recast');
const { builders: b } = recast;

function transform() {
  return {
    ElementNode(node) {
      if (node.tag === 'PluginOutlet') {
        const tagNameAttributeIndex = node.attributes.findIndex(
          (a) => a.name === '@tagName' && a.value.type === 'TextNode'
        );
        if (tagNameAttributeIndex === -1) {
          return;
        }
        const tagNameAttribute = node.attributes[tagNameAttributeIndex];
        node.attributes.splice(tagNameAttributeIndex, 1);

        if (tagNameAttribute.value.chars === '') {
          return node;
        }

        return b.element(tagNameAttribute.value.chars, {
          children: [b.text('\n'), node, b.text('\n')],
        });
      }
    },
  };
}

module.exports = function (fileInfo, config, invokableData = {}) {
  let { code } = recast.transform(fileInfo.source, () =>
    transform(fileInfo, config, invokableData)
  );

  return code;
};
