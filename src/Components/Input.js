import React from "react";

const Input = props => <input className="text"
                              type="text"
                              placeholder={props.placeholder}
                              onChange={props.onChange} />

export default Input;
                                 