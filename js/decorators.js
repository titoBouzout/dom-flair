const observable = mobx.observable
const computed = mobx.computed
const action = mobx.action

const intercept = mobx.intercept
const observe = mobx.observe

const observer = mobxReact.observer

mobx.configure({
	enforceActions: 'always',
	computedRequiresReaction: true,
	reactionScheduler: requestAnimationFrame,
})
