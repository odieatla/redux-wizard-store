import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {
	constructor(props) {
		super(props)

		this.handleInputChange =
			this.handleInputChange.bind(this);

		this.handleClickClearButton =
			this.handleClickClearButton.bind(this);

		this.state = {
			search: ''
		};
	}

	handleClickClearButton() {
		this.setState({
			search: ''
		});
	}

	handleInputChange(e) {
		this.setState({
			search: e.target.value
		});
	}

	render() {
		const { isMobile } = this.props;
		let formClass = 'comFormSearch';
		if (isMobile) {
			formClass = `${formClass} comFormSearch--mobile`;
		}

		return (
			<form name="search" action="/" method="get"
			 className={formClass}>
				<a className="comFormSearch__clearButton"
				 onClick={this.handleClickClearButton}>
					<span className="icon ubnt-icon--x"></span>
				</a>
				<input name="q" type="text"
				 value={this.state.search}
				 onChange={this.handleInputChange}
				 required className="comFormSearch__input" />

				{(() => {
					if (isMobile) {
						return (
							<button type="submit" className="comFormSearch__submitButton">
								<span className="icon ubnt-icon--search-2">
									<span className="offstage">Search</span>
								</span>
							</button>
						)
					} 
				})()}
			</form>
		)
	}
}

SearchForm.propTypes = {
	isMobile: PropTypes.bool
}

export default SearchForm;
