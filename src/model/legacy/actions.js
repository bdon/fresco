import actions from '../actions'

import utilLocalStorage from '../../utility/utilLocalStorage'

const importStyles = async ()=>{
	const all = utilLocalStorage.getAll()

	let styles = [], removeKeys = []

	Object.keys(all).forEach((i)=>{
		if (all[i] && all[i].name && all[i].layers){
			styles.push(all[i])
			removeKeys.push(i)
		}
	})

	for (let i=0,len=styles.length;i<len;i++){
		await actions.act('style.addFromJson', {json:styles[i]})
	}
	removeKeys.forEach((key)=>{
		utilLocalStorage.remove(key)
	})

	// remove all found styles from localStorage

	return styles
}

actions.subscribe('legacy',{
})

export default {
	importStyles,
}