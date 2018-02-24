
import React from 'react';
import ReactDOM from 'react-dom';

console.log("gogogo");

jsPlumb.ready(function() {
    /*
    var common = {
        connector: ["Straight"],
        anchor: ["Left", "Right"],
        endpoint:"Dot"
    };

    jsPlumb.connect({
        source:"item1",
        target:"item2",
        paintStyle:{ stroke:"lightgray", strokeWidth:3 },
        endpointStyle:{ fillStyle:"lightgray", outlineStroke:"gray" },
        overlays:[
            ["Arrow" , { width:12, length:12, location:0.67 }]
        ]
    }, common);
    */


    var instance = jsPlumb.getInstance();


    instance.importDefaults({
        Connector : [ "Bezier", { curviness: 150 } ],
        Anchors : [ "TopCenter", "BottomCenter" ]
    });

    // TODO: not work
    instance.draggable(jsPlumb.getSelector(".op"), { grid: [20, 20] });
    instance.draggable("op2");
    instance.draggable("op1");


    var sourceEndpointOptions = { isSource:true, isTarget:false };
    var targetEndpointOptions = { isSource:false, isTarget:true };

    jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Top" }, targetEndpointOptions );
    jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Bottom" }, sourceEndpointOptions );


});




var data = {
    "nodes": [
        {"id": "window1", "label": "1", "type": "error"},
        {"id": "window2", "label": "2"},
        {"id": "window3", "label": "3"},
        {"id": "window4", "label": "4"},
        {"id": "window5", "label": "5"},
        {"id": "window6", "label": "6"},
        {"id": "window7", "label": "7"}
    ],
    "edges": [
        {"source": "window1", "target": "window3"},
        {"source": "window1", "target": "window4"},
        {"source": "window3", "target": "window5"},
        {"source": "window5", "target": "window2"},
        {"source": "window4", "target": "window6"},
        {"source": "window6", "target": "window2"}
    ]
};




class OldOperators extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>ReLU</li>
                    <li>Sigmoid</li>
                </ul>
            </div>
        )
    }
}

class OldDag extends React.Component {
    render() {
        return (
            <div>
                <h3>The dag</h3>
            </div>
        )
    }
}

class OldAttributes extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>Parameter1</li>
                    <li>Parameter2</li>
                </ul>
            </div>
        )
    }
}



class OldApp extends React.Component {

    render() {
        return (
            <div>
                <OldOperators />
                <OldDag />
                <OldAttributes />
            </div>

        );
    }
}

/*
const element = <OldApp />;
ReactDOM.render(element, document.getElementById('root2'));
*/



class OperatorButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className="operator_button">
                <button type="button" className="list-group-item">
                    {this.props.operatorName}
                </button>
            </div>
        );
    }
}


class Operator extends React.Component {
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

class Dag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operators: []
        };

        this.addOperator = this.addOperator.bind(this);
    }

    render() {
        return (
            <div>
                <Operator operatorName="Sigmoid"/>
                <Operator operatorName="ReLU"/>
            </div>
        );
    }
}


/*
const element2 = <Dag />;
ReactDOM.render(element2, document.getElementById('dag_container'));
*/


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

        //this.addOperator = this.addOperator.bind(this);
    }

    addOperator(opName) {
        console.log(opName);
        console.log(this.state.operators.length);

        this.setState({operators: []});


    }


    render() {
        return(

            <div className="container">

                <div className="row">

                    <div className="col-md-3">
                        <h2>Operators</h2>
                        <div class="list-group">

                            <OperatorButton operatorName="ReLU" />
                            <OperatorButton operatorName="Sigmoid" />
                            <OperatorButton operatorName="FullConnected" />
                            <OperatorButton operatorName="Convolution" />
                            <OperatorButton operatorName="Recurrent" />
                        </div>
                    </div>

                    <div className="col-md-6">

                        <h2>Dag</h2>

                        <div>
                            <Operator operatorName="Sigmoid"/>
                            <Operator operatorName="ReLU"/>
                            <Operator operatorName="Convolution"/>
                        </div>


                    </div>

                    <div className="col-md-3">

                        <h2>Attributes</h2>

                        <p>Layers</p>
                        <input type="email" className="form-control" id="inputEmail3" placeholder="10"></input>

                        <p>Hidden</p>
                        <input type="email" className="form-control" id="inputEmail3" placeholder="8"></input>

                            <p>Activation22</p>
                        <input type="email" className="form-control" id="inputEmail3" placeholder="Sigmoid"></input>

                    </div>

                </div>
            </div>

        );
    }
}




const element11 = <App />;

ReactDOM.render(element11, document.getElementById('root'));



