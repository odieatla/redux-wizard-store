import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

class DropZone extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		console.error('componentWillMount')
	}

	componentDidMount() {
		window.lastTarget = null;
		window.dropZoneIsActive = this.props.isActive;

		// window.ondragenter will be fired twice,
		// when fired first time, the target is set to root element, <html>,
		// then unhide the drop zone (visibility, opacity) and bring it to the top layer,
		// window.ondragenter will fire again, and cache the target, which will match
		// the last window.ondragleave event that fires when you drag out of the window.
		window.addEventListener('dragenter', (e) => {
			if (!window.dropZoneIsActive) {
				e.preventDefault()
				return
			};

			const dropZone = findDOMNode(this.refs.dropZone);

			if (dropZone.style.visibility) {
				// triggered first time, set DropZone to visible
				dropZone.style.visibility = '';
				dropZone.style.opacity = 1;
			} else {
				// triggered second time, set target to DropZone and
				// dispatch actions
				window.lastTarget = e.target;
				if (this.props.handleDragEnter) {
					this.props.handleDragEnter();
				}
			}
		});

		window.addEventListener('dragleave', (e) => {
			if (!window.dropZoneIsActive) {
				e.preventDefault()
				return
			};

			if (e.target === lastTarget) {
				const dropZone = findDOMNode(this.refs.dropZone);
				dropZone.style.visibility = 'hidden';
				dropZone.style.opacity = 0;

				if (this.props.handleDragLeave) {
					this.props.handleDragLeave();
				}
			}
		});

		window.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		window.addEventListener('drop', (e) => {
			e.preventDefault();
			if (!window.dropZoneIsActive) { return }

			const dropZone = findDOMNode(this.refs.dropZone);
			dropZone.style.visibility = 'hidden';
			dropZone.style.opacity = 0;

			if (e.dataTransfer.files.length == 1) {
				if (this.props.handleFileDrop) {
					this.props.handleFileDrop(e.dataTransfer.files[0]);
				}
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		window.dropZoneIsActive = nextProps.isActive;
	}

	render() {
		const defStyle = {
			position:'fixed',
			left:0,
			top:0,
			zIndex: 9999999999,
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			transition: 'visibility 175ms, opacity 175ms',
			width: '100%',
			height: '100%',
			color: '#fff',
			background: 'rgba(0, 0, 0, 0.45)',
			visibility: 'hidden'
		}

		const customStyle = this.props.style || {};


		return (
			<div ref="dropZone" style={{...customStyle, ...defStyle}}>drop zone</div>
		)
	}
}

DropZone.propTypes = {
	isActive: PropTypes.bool.isRequired,
	handleDragEnter: PropTypes.func,
	handleDragLeave: PropTypes.func,
	handleFileDrop: PropTypes.func
}

export default DropZone
