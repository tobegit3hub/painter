import React from 'react';


export default class OperatorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        return (
            <div className="op">
                {this.props.operatorName}
            </div>
        );
    }
}
