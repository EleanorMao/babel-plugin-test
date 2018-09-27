const chalk = require('chalk')

module.exports = function ({ types: t }) {
	return {
		name: 'maomao-test',
		visitor: {
			Program: {
				enter: function () {
					console.log(chalk.cyan('插入插件.Program'), chalk.bgRed('进入'))
					console.log(' ')
				},
				exit: function program(path) {
					console.log(chalk.cyan('插入插件.Program'), chalk.bgBlue('退出'))
					console.log(' ')

					topNodes = []
					topNodes.push(t.callExpression(
						t.memberExpression(
							t.identifier('Array'),
							t.identifier('from')
						), []))
					path.unshiftContainer("body", topNodes)
					console.log(chalk.cyan('插入插件.Program'), chalk.bgGreen('success'))
					console.log(' ')
				}
			},
			MemberExpression: {
				enter: function enter1() {
					console.log(chalk.cyan('插入插件.MemberExpression'), chalk.bgRed('进入'))
					console.log(' ')
				}
			}
		}
	};
}
