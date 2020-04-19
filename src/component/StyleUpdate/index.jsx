import PropTypes from 'prop-types'
import React from 'react'
import {Map} from 'immutable'
import {NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom'

import utilUrl from '../../utility/url'
import utilMapboxSpec from '../../utility/mapboxSpec'

import modelApp from '../../model/app'
import modelLayer from '../../model/layer'
import modelSource from '../../model/source'

import Field from '../Field'
import Icon from '../Icon'
import Property from '../Property'
import Alert from '../Alert'
import StyleUpdateJson from './StyleUpdateJson'
import StyleUpdateUpload from './StyleUpdateUpload'
import Tooltip from '../Tooltip'

class StyleUpdate extends React.Component {

	constructor(props) {
		super(props)
		const {handle} = props

		this.state = {
			headers: Map({}),
			id: '',
			makeLayers: false,
			type: '',
			url: '',
		}
	}

	render (){
		const {error, match, style} = this.props,
			{headers, makeLayers, id, type, url} = this.state

		return <div>
			<h2 className="content-title content-title-sub content-title-light">
				<span className="content-title-label">Update Style</span>

				<div className="content-title-options">
					<NavLink to={`${match.url}/upload`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'upload'}/>
						<Tooltip message={'from upload'}/>
					</NavLink>
					<NavLink to={`${match.url}/json`} className={'content-title-option interactive tooltip-trigger'}>
						<Icon icon={'code'}/>
						<Tooltip message={'from json'}/>
					</NavLink>
				</div>
			</h2>

			{this.renderBody()}
		</div>
	}

	renderBody(){
		const {error, match, style} = this.props

		const redirect = `${match.url}/upload`

		return (
			<Switch>
				<Route path={`${match.url}/upload`} 
					render={(props) => (
						<StyleUpdateUpload 
							{...props}
							style={style}
						/>
					)}/>
				<Route path={`${match.url}/json`} 
					render={(props) => (
						<StyleUpdateJson 
							{...props}
							style={style}
						/>
					)}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}
}

StyleUpdate.propTypes = {
	handle: PropTypes.object,
	history: PropTypes.object,
	match: PropTypes.object,
	path: PropTypes.array,
	style: PropTypes.object,
}

export default withRouter(StyleUpdate)