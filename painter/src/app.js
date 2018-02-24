
import React from 'react';
import ReactDOM from 'react-dom';

import OperatorButtonComponent from "./operator_button";

import OperatorComponent from "./operator";



class ExportButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model_json: "The model to export."
        };
    }

    exportModelJson() {

        var data = "Try to export the model json!";
        //alert(data);
        console.log(data);


        //var allConnection = jsPlumb.getAllConnections();
        //console.log(allConnection);

        var exported_operator_list = [];

        //var last_

        $.each(jsPlumb.getAllConnections(),function(i, e){

            var allConnection = jsPlumb.getAllConnections();

            console.log(e.endpoints[0].anchor.elementId);
            console.log(e.endpoints[1].anchor.elementId);

            var start_element_id = e.endpoints[0].anchor.elementId;
            var end_element_id = e.endpoints[0].anchor.elementId;

            var operatorName = start_element_id.split(":")[0];
            //console.log(operatorName);


            exported_operator_list.push(operatorName);


        })

        console.log(exported_operator_list);



        var exported_model_json = {"class_name": "Sequential", "keras_version": "2.1.2", "config": [{"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_1", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "dtype": "float32", "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 128, "batch_input_shape": [null, 784], "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_1"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_2", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 64, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_2"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_3", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 32, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_3"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_4", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 10, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "softmax", "trainable": true, "name": "activation_4"}}], "backend": "tensorflow"};
        console.log(exported_model_json);


        //alert(model_json);
        //alert(JSON.stringify(model_json));


        //this.setState({operators: this.state.operators});
        this.setState({model_json: JSON.stringify(exported_model_json)});

        console.log(this.state.model_json);


    }



    render() {
        return (

            <div>

            <button type="button" className="btn btn-primary" onClick={this.exportModelJson.bind(this)}>
                Export Model Json
            </button>

            <textarea rows="10" cols="35" value={this.state.model_json}>



            </textarea>

            </div>
        );
    }
}


class App extends React.Component {

    constructor(props) {
        super(props);

        /*
        this.state = {
            operators: [{
                name: "LSTM"
            }, {
                name: "Convolution"
            }]
        };
        */

        this.state = {
            operators: []
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


                        <ExportButton />
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
                        <input type="email" className="form-control" id="inputEmail1" placeholder="10"></input>

                        <p>Hidden</p>
                        <input type="email" className="form-control" id="inputEmail2" placeholder="8"></input>

                            <p>Activation</p>
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



