import React from 'react';
import ReactDOM from 'react-dom';

import MainSection from './components/MainSection.jsx';


class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<MainSection />
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))