import React from "react";


export default class ExportButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model_json: "The model to export."
        };
    }

    exportModelJson() {
        var data = "Try to export the model json!";
        console.log(data);

        var exported_operator_list = [];

        //var last_

        $.each(jsPlumb.getAllConnections(), function (i, e) {

            var allConnection = jsPlumb.getAllConnections();

            console.log(e.endpoints[0].anchor.elementId);
            console.log(e.endpoints[1].anchor.elementId);

            var startElementId = e.endpoints[0].anchor.elementId;
            var endElementId = e.endpoints[1].anchor.elementId;

            var startOperatorName = startElementId.split(":")[0];
            var endOperatorName = endElementId.split(":")[0];
            //console.log(operatorName);

            if (exported_operator_list.length == 0) {
                exported_operator_list.push(startOperatorName);
            }

            exported_operator_list.push(endOperatorName);

        })

        console.log(exported_operator_list);

        //var exported_model_json = {"class_name": "Sequential", "keras_version": "2.1.2", "config": [{"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_1", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "dtype": "float32", "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 128, "batch_input_shape": [null, 784], "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_1"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_2", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 64, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_2"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_3", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 32, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "relu", "trainable": true, "name": "activation_3"}}, {"class_name": "Dense", "config": {"kernel_initializer": {"class_name": "VarianceScaling", "config": {"distribution": "uniform", "scale": 1.0, "seed": null, "mode": "fan_avg"}}, "name": "dense_4", "kernel_constraint": null, "bias_regularizer": null, "bias_constraint": null, "activation": "linear", "trainable": true, "kernel_regularizer": null, "bias_initializer": {"class_name": "Zeros", "config": {}}, "units": 10, "use_bias": true, "activity_regularizer": null}}, {"class_name": "Activation", "config": {"activation": "softmax", "trainable": true, "name": "activation_4"}}], "backend": "tensorflow"};
        //console.log(exported_model_json);

        var exportedModelJson = {
            "class_name": "Sequential",
            "keras_version": "2.1.2",
            "config": [],
            "backend": "tensorflow"
        };

        for (var i = 0; i < exported_operator_list.length; i++) {
            console.log(exported_operator_list);

            var operatorName = exported_operator_list[i];
            console.log(operatorName);

            var layerJson = null;

            if (operatorName === "Dense") {
                layerJson = {
                    "class_name": "Dense",
                    "config": {
                        "kernel_initializer": {
                            "class_name": "VarianceScaling",
                            "config": {
                                "distribution": "uniform",
                                "scale": 1.0,
                                "seed": null,
                                "mode": "fan_avg"
                            }
                        },
                        "name": "dense_2",
                        "kernel_constraint": null,
                        "bias_regularizer": null,
                        "bias_constraint": null,
                        "activation": "linear",
                        "trainable": true,
                        "kernel_regularizer": null,
                        "bias_initializer": {
                            "class_name": "Zeros",
                            "config": {}
                        },
                        "units": 64,
                        "use_bias": true,
                        "activity_regularizer": null
                    }
                };

                // For the first layer, keras asks to add this
                if (i === 0) {
                    layerJson["config"]["batch_input_shape"] = [null, 784];
                    layerJson["config"]["name"] = "dense_1";
                }

                // TODO: Update the name and unit size
                if (i != 0) {
                    layerJson["config"]["units"] = 10;
                }

            } else if (operatorName === "Softmax") {
                layerJson = {
                    "class_name": "Activation",
                    "config": {
                        "activation": "softmax",
                        "trainable": true,
                        "name": "activation_4"
                    }
                };
            } else if (operatorName === "Relu") {
                layerJson = {
                    "class_name": "Activation",
                    "config": {
                        "activation": "relu",
                        "trainable": true,
                        "name": "activation_3"
                    }
                };
            } else if (operatorName === "foo") {
                layerJson = {
                    "class_name": "Activation",
                    "config": {
                        "activation": "softmax",
                        "trainable": true,
                        "name": "activation_4"
                    }
                };
            } else if (operatorName === "bar") {
                layerJson = {
                    "class_name": "Activation",
                    "config": {
                        "activation": "softmax",
                        "trainable": true,
                        "name": "activation_4"
                    }
                };
            } else {
                console.log("Error, unknown operator name");
            }

            exportedModelJson["config"].push(layerJson);

        }

        //this.setState({operators: this.state.operators});
        this.setState({model_json: JSON.stringify(exportedModelJson)});

        console.log(this.state.model_json);

    }

    saveText(text, filename){
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click()
    }

    downloadJsonFile() {
        var filename = "model.json";
        this.saveText( this.state.model_json, filename);
    }


    render() {
        return (

            <div>

                <button type="button" className="btn btn-primary"
                        onClick={this.exportModelJson.bind(this)}>
                    Export Model Json
                </button>

                <button type="button" className="btn btn-info"
                        onClick={this.downloadJsonFile.bind(this)}>
                    Download
                </button>

                <textarea rows="10" cols="35" value={this.state.model_json}>



            </textarea>

            </div>
        );
    }
}