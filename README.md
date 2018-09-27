babel-plugin-test
===
检验插件执行顺序_(:з」∠)_

> ## Plugin Ordering
> Ordering matters for each visitor in the plugin.
> This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.
> 1. Plugins run before Presets.
> 2. Plugin ordering is first to last.
> 3. Preset ordering is reversed (last to first).

插件其实是并行运行的，当2个插件访问同一个节点的时候遵循由插件从前到后，preset用后到前的顺序执行。


## 目录结构
- plugins/ 插件们
- src/ 源码
- .babelrc babel配置

## 编译命令
```bash
npm run build
```

## 测试环境
- node: 10.0.0
- babel: 6.x

## 普通.babelrc配置
同时执行两个插件，在访问同一节点时先执行`replace`插件，再执行`unshift`插件。
同时可以看到在`unshift`组件中往`body` unshift了一些节点之后，这些节点重新被之前的插件编译了。
```json
{
	"plugins": [
		"./plugins/replace.js",
		"./plugins/unshift.js"
	]
}
```

## 魔改.babelrc配置
> `passPerPreset`: true will modify how babel traverses through plugins. Instead of a single traversal in which all plugins/presets are merged together, each preset will get their own traversal.
> This allows users to have a specific order to how presets/plugins are applied and can help avoid potential collisions between plugins (and probably some known issues).

`passPerPreset`设为`true`会线性执行插件，所以可以看到先执行了`replace`插件，再执行了`unshift`插件。
同时可以看到在`unshift`组件中往`body` unshift了一些节点之后，这些节点不会被之前的插件编译。
```json
{
	"passPerPreset": true,
	"presets": [
		{
			"plugins": [
				"./plugins/replace.js"
			]
		},
		{
			"plugins": [
				"./plugins/unshift.js"
			]
		}
	]
}
```
