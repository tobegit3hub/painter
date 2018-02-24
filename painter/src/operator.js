import React from 'react';


export default class OperatorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        // Generate unique id
        var unique_id = Math.random().toString(36).substr(2, 9);
        unique_id = this.props.operatorName + ":" + unique_id;
        console.log(unique_id);

        return (
            <div className="op" id={unique_id}>
                {this.props.operatorName}
            </div>
        );
    }
}
