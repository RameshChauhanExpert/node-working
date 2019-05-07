import React from "react";
import { TextField } from "../../utilities"


export default class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: "" }
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event) {
        var error = false
        var errorMessage = "";


        if (this.props.required && error == false) {
            if (this.props.required[0] == true && error == false) {
                if (this.required(event) == true) {
                    error = true
                    errorMessage = this.props.required[1]
                } else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }



        if (this.props.is_float && error == false) {

            if (this.props.is_float[0] == true) {

                if (this.is_float(event) == true) {
                    error = true;
                    errorMessage = this.props.is_float[1]
                } else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.only_number && error == false) {

            if (this.props.only_number[0] == true) {

                if (this.only_number(event) == true) {
                    error = true;
                    errorMessage = this.props.only_number[1]
                } else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.password && error == false) {
            if (this.props.password[0] == true) {
                if (this.password(event) == true) {
                    error = true;

                    errorMessage = this.props.password[1]
                } else {
                    error = false;
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.email && error == false) {

            if (this.props.email[0] == true) {

                if (this.ValidateEmail(event) == true) {

                    error = true;
                    errorMessage = this.props.email[1]
                }
                else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.max && error == false) {

            if (this.props.max[0] == true) {

                if (this.max(event) == true) {
                    error = true;

                    errorMessage = this.props.max[2]
                } else {

                    error = false
                    this.setState({ error: "" })
                }
            }
        }




        if (this.props.min && error == false) {

            if (this.props.min[0] == true) {

                if (this.min(event) == true) {
                    error = true;

                    errorMessage = this.props.min[2]
                } else {

                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.min_value && error == false) {

            if (this.props.min_value[0] == true) {

                if (this.min_value(event) == true) {
                    error = true;

                    errorMessage = this.props.min_value[2]
                } else {

                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.is_int && error == false) {

            if (this.props.is_int[0] == true) {
                if (this.isInt(event) == true) {
                    error = true;
                    errorMessage = this.props.is_int[1]
                }
                else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }

        if (error == false && this.props.password_macth && this.props.password_macth && document.getElementsByName("new_password")[0].value != undefined && document.getElementsByName("new_password")[0].value.trim() != "") {

            if (this.password_match(event) == true) {

                error = true;
                errorMessage = this.props.password_macth[1]

            }
            else {
                error = false
                this.setState({ error: "" })
            }
        }


        if (error == true) {

            this.props.state.isValidate(false, false)
            return this.setState({ error: errorMessage })
        }
        else {
            this.props.state.isValidate((this.props.state.finalCheckAll == "false" || this.props.state.finalCheckAll == undefined) ? false : true, false)
            return this.setState({ error: errorMessage })
        }
    }


    onChange(event) {
        var error = false;
        var errorMessage = "";

        if (this.props.max && error == false) {
            if (this.props.max[0] == true) {
                if (this.max(event) == true) {
                    error = true;
                    errorMessage = this.props.max[2]
                } else {
                    error = false;
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.only_number && error == false) {
            if (this.props.only_number[0] == true) {
                if (this.only_number_event(event) == true) {

                    error = true
                    errorMessage = this.props.is_int[1]
                }
                else {

                    error = false
                    errorMessage = ""
                }

            }
        }

        if (this.props.is_int && error == false) {

            if (this.props.is_int[0] == true) {
                if (this.isInt(event) == true) {
                    error = true;

                    errorMessage = this.props.is_int[1]
                } else {
                    error = false;

                }
            }
        }

                if (this.props.is_float && error == false) {

            if (this.props.is_float[0] == true) {

                if (this.is_float(event) == true) {
                    error = true;
                    errorMessage = this.props.is_float[1]
                } else {
                    error = false
                    this.setState({ error: "" })
                }
            }
        }



        if (error == true) {
            this.setState({ error: errorMessage })
        }
        else {
            this.props.change(event)
            this.setState({ error: "" })
        }

    }

    only_number_event(event) {
        var patt = new RegExp(/^[0-9\s]*$/);
        var res = patt.test(event.target.value)
        if (res == true) {
            return false
        }
        else {
            return true
        }

    }

    handleChange(event) {

        var error = false
        var errorMessage = "";

        if (this.props.only_number && error == false) {
            var patt = new RegExp(/^[0-9\s]*$/);
            var res = patt.test(document.getElementsByName(this.props.name)[0].value);
            if (res == true) {
                error = false
                //  this.props.change(event)
            }
            else {
                error = true
                errorMessage = this.props.only_number[1]
            }
        }




        if (this.props.is_float && error == false) {
            var patt = new RegExp(/^\d+(\.\d{0,2})?$/);
            var res = patt.test(document.getElementsByName(this.props.name)[0].value);

            if (res == true || document.getElementsByName(this.props.name)[0].value == "") {
                error = false
                //this.props.change(event)
            }
            else {
                error = true
                errorMessage = this.props.is_float[1]
            }
        }

        if (this.props.max && error == false) {


            if (this.props.max[0] == true) {
                if (this.max(event) == true) {

                    error = true;

                    errorMessage = this.props.max[2]
                } else {

                    error = false;
                    this.setState({ error: "" })
                }
            }
        }

        if (error == false) {
            this.props.change(event)
        }

        if (this.props.required && error == false) {
            if (this.props.required[0] == true && error == false) {
                if (this.required(event) == true) {
                    error = true;

                    errorMessage = this.props.required[1]
                } else {
                    error = false;
                }
            }
        }



        if (this.props.is_float && error == false) {
            if (this.props.is_float[0] == true) {
                if (this.is_float(event) == true) {
                    error = true;
                    errorMessage = this.props.is_float[1]
                } else {
                    error = false;
                }
            }
        }
        if (this.props.min && error == false) {
            if (this.props.min[0] == true) {
                if (this.min(event) == true) {
                    error = true;

                    errorMessage = this.props.min[2]
                } else {
                    error = false;

                }
            }
        }

        if (this.props.is_int && error == false) {

            if (this.props.is_int[0] == true) {
                if (this.isInt(event) == true) {
                    error = true;

                    errorMessage = this.props.is_int[1]
                } else {
                    error = false;

                }
            }
        }




        if (this.props.min_value && error == false) {

            if (this.props.min_value[0] == true) {
                if (this.min_value(event) == true) {
                    error = true;

                    errorMessage = this.props.min_value[2]
                } else {
                    error = false;

                }
            }
        }


        if (this.props.max && error == false) {


            if (this.props.max[0] == true) {
                if (this.max(event) == true) {

                    error = true;

                    errorMessage = this.props.max[2]
                } else {

                    error = false;
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.email && error == false) {
            if (this.props.email[0] == true) {
                if (this.ValidateEmail(event) == true) {
                    error = true;

                    errorMessage = this.props.email[1]
                } else {
                    error = false;
                    this.setState({ error: "" })
                }
            }
        }

        if (this.props.password && error == false) {
            if (this.props.password[0] == true) {
                if (this.password(event) == true) {
                    error = true;

                    errorMessage = this.props.password[1]
                } else {
                    error = false;
                    this.setState({ error: "" })
                }
            }
        }




        if (error == true) {

            this.setState({ error: errorMessage })
        }
        else {
            this.setState({ error: "" })
        }
    }


    password_match() {
        if (document.getElementsByName("new_password")[0].value != document.getElementsByName("conifrm_new_password")[0].value) {
            return true
        } else {
            return false
        }
    }
    password() {

        var patt = new RegExp(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/);
        var res = patt.test(document.getElementsByName(this.props.name)[0].value);
        if (res == true) {

            return false
        }
        else {

            return true
        }
    }

    only_number() {
        var patt = new RegExp(/^[0-9\s]*$/);
        var res = patt.test(document.getElementsByName(this.props.name)[0].value);
        if (res == true) {
            return false
        }
        else {

            return true
        }

    }
    min_value() {
        if (document.getElementsByName(this.props.name)[0].value.trim() == "")
            return false

        if (document.getElementsByName(this.props.name)[0].value <= this.props.min_value[1]) {

            return true;
        }
        else {

            return false;
        }
    }
    required(event) {
        if (document.getElementsByName(this.props.name)[0].value == "" || document.getElementsByName(this.props.name)[0].value.trim() == "") {
            return true;
        } else {
            return false;
        }
    }

    min(event) {

        if (document.getElementsByName(this.props.name)[0].value.trim().length < this.props.min[1]) {

            return true;
        }
        else {

            return false;
        }
    }

    max(event) {

        if (document.getElementsByName(this.props.name)[0].value.trim().length > this.props.max[1]) {

            return true;
        }
        else {

            return false;
        }
    }

    ValidateEmail(mail) {

        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementsByName(this.props.name)[0].value)) {
            return (false)
        }

        return (true)
    }

    is_float() {

        if (document.getElementsByName(this.props.name)[0].value.trim() == "")
            return false

        if (/^\d+(\.\d{1,2})?$/.test(document.getElementsByName(this.props.name)[0].value)) {
            return (false)
        } else {
            return (true)
        }


    }

    isInt() {

        var result = Number.isInteger(Number(document.getElementsByName(this.props.name)[0].value))

        if (result == false) {
            return true
        }
        else {

            return false
        }
    }
    render() {

        return (<div className="inline-element">

            {(this.props.onBlur) ? <TextField
                autoComplete="false"
                value={(this.props.state[this.props.name] == undefined) ? "" : this.props.state[this.props.name]}
                type={this.props.type} name={this.props.name}
                onChange={this.onChange}
                onBlur={this.onSubmit}
                className={this.props.className}
                label={this.props.label + " *"}
                inputProps={{ min: "0", max: "2" }}
                disabled={(this.props.disabled) ? true : false}
            /> : <TextField
                    autoComplete="false"
                    value={(this.props.state[this.props.name] == undefined) ? "" : this.props.state[this.props.name]}
                    type={this.props.type} name={this.props.name}
                    onChange={this.handleChange}
                    margin={(!this.props.margin) ? "" : this.props.margin}
                    className={this.props.className}
                    label={this.props.label + " *"}
                    disabled={(this.props.disabled) ? true : false}
                    inputProps={{ min: "0", max: "2" }}
                />}
            <span className="error-msg">
                {this.state.error}
            </span>
            {(this.props.validate == true) ? this.onSubmit() : ""}
        </div>

        )
    }
}
