const chalk = require('chalk')

module.exports = function ({ types: t }) {
	return {
		name: 'maomao-test2',
		visitor: {
			Program: {
				exit: function exit1() {
					console.log(chalk.yellow('替换插件.Program'), chalk.bgBlue('退出'))
					console.log(' ')
				}
			},
			MemberExpression: {
				enter: function enter(path, state) {
					console.log(chalk.yellow('替换插件.MemberExpression'), chalk.bgRed('进入'))
					console.log(' ')
					const node = path.node
					const obj = node.object
					const prop = node.property
					path.replaceWith(state.addImport(
						`maomao-test2/${obj.name}`,
						"default",
						`${obj.name}$${prop.name}`
					));
					console.log(chalk.yellow('替换插件.MemberExpression'), chalk.bgGreen('success'))
					console.log(' ')
				},
				exit: function exit() {
					console.log(chalk.yellow('替换插件.MemberExpression'), chalk.bgBlue('退出'))
					console.log(' ')
				}
			}
		}
	};
}
