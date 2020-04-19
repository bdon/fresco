import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {withRouter} from 'react-router-dom'

import utilMapboxSpec from '../../utility/mapboxSpec'

import modelApp from '../../model/app'
import modelStyle from '../../model/style'

import Property from '../Property'
import Alert from '../Alert'

class StyleAddUpload extends React.Component {

	constructor(props) {
		super(props)
		const {handle} = props

		this.state = {
			file: '',
		}
	}

	handleSubmit = async (e)=>{
		e.preventDefault()
		const {history, match} = this.props,
			{file} = this.state
		try{
			await modelApp.actions.setLoading(true) 
			const style = await modelStyle.actions.addUpload({
				file,
			})
			await modelApp.actions.setLoading(false)

			const redirect = `/style/${style.getIn(['id'])}`
			history.push(redirect)
		} catch(e){
			await modelApp.actions.setLoading(false)
			await modelApp.actions.setError(e)
		}
	}

	handleChange = ({name, value})=>{
		const {type, url} = this.state

		let state = {}
		state[name] = value

		this.setState(state)
	}

	render (){
		const {error, style} = this.props,
			{file} = this.state

		const handle = {
			change: this.handleChange
		}

		const isReady = file? true: false
		const options = utilMapboxSpec.getSourceTypeOptions()

		return <form className="content-body" onSubmit={this.handleSubmit}>
			<h4 className="content-body-title">
				<span>From Upload</span>
			</h4>
			<div className="property-content">
				<Property 
					handle={handle}
					info={'upload a Mapbox json style file'}
					key={'file'}
					label={'file'}
					name={'file'}
					path={null}
					required={true}
					type={'file'}
					value={file}
				/>

				<div className="form-group mt-3 text-right">
					<button type="submit" className={`btn btn-primary ${isReady? '': 'disabled'}`}>Add</button>
				</div>
			</div>
		</form>
	}
}

StyleAddUpload.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
}

export default withRouter(StyleAddUpload)