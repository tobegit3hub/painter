
import React from 'react';
import ReactDOM from 'react-dom';

import OperatorButtonComponent from "./operator_button";

import OperatorComponent from "./operator";






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







class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            operators: [{
                name: "LSTM"
            }, {
                name: "Convolution"
            }]
        };

        /*
        setTimeout(()=>{

        }, 1000);
        */
    }

    addOperator(opName) {
        console.log("Call add operator function");
        console.log(opName);
        console.log(this.state.operators.length);
        console.log(this.state.operators);

        //this.setState({operators: []});

        const newOperator = {name: opName};
        this.state.operators.push(newOperator);

        this.setState({operators: this.state.operators});



         var sourceEndpointOptions = { isSource:true, isTarget:false };
         var targetEndpointOptions = { isSource:false, isTarget:true };

         /*
         jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Top" }, targetEndpointOptions );
         jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Bottom" }, sourceEndpointOptions );


        jsPlumb.draggable(jsPlumb.getSelector(".op"), { grid: [20, 20] });
        */


         // TODO: Remove this if it runs for all elements
         setTimeout(()=>{
             console.log("one second later");

             jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Top" }, targetEndpointOptions );
             jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Bottom" }, sourceEndpointOptions );


             jsPlumb.draggable(jsPlumb.getSelector(".op"), { grid: [20, 20] });
         }, 100);

    }


    render() {


        /*
        var operatorButtonsOld = [
            <OperatorButton key={1} operatorName="ReLU" />,
            <OperatorButton key={2} operatorName="Sigmoid" />,
            <OperatorButton key={3} operatorName="FullConnected" />,
            <OperatorButton key={4} operatorName="Convolution" />,
            <OperatorButton key={5} operatorName="Recurrent" />
        ];
        */

        var operatorButtons = [
            "ReLU",
            "Sigmoid",
            "FullConnected",
            "Convolution",
            "Recurrent",
            "LSTM"
        ].map((name, index) => <OperatorButtonComponent key={index} operatorName={name} addOperator={this.addOperator.bind(this)} />);


        var operatorsInDag = this.state.operators.map((operator, index) => <OperatorComponent operatorName={operator.name} /> );


        return(

            <div className="container">

                <div className="row">

                    <div className="col-md-3">
                        <h2>Operators</h2>

                        <div class="list-group">

                            {operatorButtons}

                        </div>
                    </div>

                    <div className="col-md-6" id="dag_container">

                        <h2>Dag</h2>

                        <div>
                            
                            {operatorsInDag}

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


    //jsPlumb.setContainer(document.getElementById("dag_container"));

    //var instance = jsPlumb.getInstance();
    /*
     var instance = jsPlumb.getInstance({
     Container: "root"
     });
     */

    //instance = jsPlumb.getInstance();
    var instance = window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                visible:true,
                id:"ARROW",
                events:{
                    click:function() { alert("you clicked on the arrow overlay")}
                }
            } ],
            [ "Label", {
                location: 0.1,
                id: "label",
                cssClass: "aLabel",
                events:{
                    tap:function() { alert("You 'tap'ed an a label"); }
                }
            }]
        ],
        Container: "canvas"
    });

    var basicType = {
        connector: "StateMachine",
        paintStyle: { strokeStyle: "red", lineWidth: 4 },
        hoverPaintStyle: { strokeStyle: "blue" },
        overlays: [
            "Arrow"
        ]
    };
    instance.registerConnectionType("basic", basicType);



    instance.importDefaults({
        Connector : [ "Bezier", { curviness: 150 } ],
        Anchors : [ "TopCenter", "BottomCenter" ]
    });

    /*
     // TODO: not work
     instance.draggable(jsPlumb.getSelector(".op"), { grid: [20, 20] });
     instance.draggable("op2");
     instance.draggable("op1");
     */

    /*
     instance.draggable("op1");
     instance.draggable("op2");
     var els = document.querySelectorAll(".op");
     jsPlumbInstance.draggable(els);
     instance.draggable(jsPlumb.getSelector(".op"), { grid: [20, 20] });
     */


    var sourceEndpointOptions = { isSource:true, isTarget:false };
    var targetEndpointOptions = { isSource:false, isTarget:true };

    jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Top" }, targetEndpointOptions );
    jsPlumb.addEndpoint(jsPlumb.getSelector(".op"), { anchor:"Bottom" }, sourceEndpointOptions );




});



