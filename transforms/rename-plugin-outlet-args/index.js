const recast = require('ember-template-recast');
const { builders: b } = recast;

function transform() {
  return {
    ElementNode(node) {
      if (node.tag === 'PluginOutlet') {
        const argsAttribute = node.attributes.find((a) => a.name === '@args');
        if (argsAttribute) {
          argsAttribute.name = '@outletArgs';
          return node;
        }
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
