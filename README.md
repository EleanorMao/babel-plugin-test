## 普通.babelrc配置
```json
{
	"plugins": [
		"./replace.js",
		"./unshift.js"
	]
}
```

## 魔改.babelrc配置
```json
{
	"passPerPreset": true,
	"presets": [
		{
			"plugins": [
				"./replace.js"
			]
		},
		{
			"plugins": [
				"./unshift.js"
			]
		}
	]
}
```
