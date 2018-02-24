import React from 'react';


export default class OperatorButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }


    render() {
        return (
            <div className="operator_button">
                <button type="button" className="list-group-item" onClick={() => this.props.addOperator(this.props.operatorName)}>


                    {this.props.operatorName}

                </button>
            </div>
        );
    }
}