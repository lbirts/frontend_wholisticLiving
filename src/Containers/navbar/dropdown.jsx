import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './navbar.css'

import { NavLink } from 'react-router-dom'
import {Menu, MenuItem, Button} from '@material-ui/core'

import Caret from '../../assets/caretIcon'
// import { sendEvt } from 'services/event.service'
// import { ButtonPlainText } from 'components/ui/buttons'
// import Icon from 'components/icons/Icon'

// import styles from './MenuDropdown.module.scss'

export default class MenuDropdown extends Component {
	state = {
		anchorEl: null
	}

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchorEl: null })
	}

	// Material UI sucks. Or i suck for not being able to get it to work from an ADA perspective. Either way, hitting return on a menu item should trigger the menu item's action.
	selectItem = (event, name) => {
		if (event.keyCode && event.keyCode === 13) {
			event.target.lastElementChild.click()
		}

		if (name) {
			const nameDashed = name.split(' ').join('_')

			// sendEvt({
			// 	event_name: `web_nav_${nameDashed}_click`
			// })
		}

		this.handleClose()
	}

	// https://github.com/mui-org/material-ui/issues/16644 - this is a hack till this issue is resolved.
	focusFirstChild = elm => {
		elm.children[0].getElementsByTagName('li')[0].focus()
	}

	render() {
		const { anchorEl } = this.state
		const {
			ariaLabel,
			children,
			topCta,
			topCtaEventTitle,
			bottomCta,
			bottomCtaEventTitle,
			items,
			open,
			title,
			className
		} = this.props

		const isOpen = open || Boolean(anchorEl)

		const listItems = items.map(item => {
			const classes = item.class ? `menu-item ${item.class}` : 'menu-item'
			return (
				<MenuItem
					className={classes}
					key={item.name}
					onClick={e => this.selectItem(e, item.name)}
					focusVisibleClassName="focus-visible"
				>
                    <NavLink to={item.url} activeClassName="active" className={item.class || null}>
                        {item.name}
                        <Caret/>
                    </NavLink>
				</MenuItem>
			)
		})

		return (
			<div className="menu">
				<Button
                    disableElevation={true}
                    disableRipple={true}
                    disableFocusRipple={true}
					aria-expanded={isOpen}
					aria-label={ariaLabel}
					className={isOpen ? 'expanded' : null}
					aria-owns={anchorEl ? className : undefined}
					aria-haspopup="true"
					onClick={this.handleClick}
					tabIndex="0"
					focusVisibleClassName="focus-visible"
				>
					{children}
				</Button>

				<Menu
					// PopoverClasses={{ paper: `${styles.menuDropdown}` }}
					anchorEl={anchorEl}
					getContentAnchorEl={null}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					transformOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={isOpen}
					onClose={this.handleClose}
					onEntered={this.focusFirstChild}
					disableAutoFocusItem
					marginThreshold={0}
					tabIndex="0"
				>
					<div className={className}>
						<h3 className="serif">{title}</h3>
						<MenuItem onClick={e => this.selectItem(e, topCtaEventTitle)} className="top-cta">
							{topCta}
						</MenuItem>
						{listItems}
						<MenuItem onClick={e => this.selectItem(e, bottomCtaEventTitle)} className="menu-item">
							{bottomCta}
						</MenuItem>
					</div>
				</Menu>
			</div>
		)
	}
}

MenuDropdown.defaultProps = {
	bottomCta: undefined,
	className: 'menu-dropdown',
	topCta: undefined,
	topCtaEventTitle: undefined,
	open: false,
	title: '',
	bottomCtaEventTitle: null,
}

MenuDropdown.propTypes = {
	bottomCta: PropTypes.element,
	bottomCtaEventTitle: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
	className: PropTypes.string,
	topCta: PropTypes.element,
	topCtaEventTitle: PropTypes.string,
	items: PropTypes.arrayOf(String).isRequired,
	open: PropTypes.bool,
	ariaLabel: PropTypes.string.isRequired,
	title: PropTypes.string
}
