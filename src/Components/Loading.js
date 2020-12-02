import React from "react";

const Loading = props => <input type="file"
                                className="upload"
                                accept=".jpg, .jpeg, .png, .svg"
                                onChange={props.onChange} />

export default Loading;
