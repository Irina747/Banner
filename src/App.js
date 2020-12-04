import React from "react";
import {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';
import Export from "./Components/Export";
import Loading from "./Components/Loading";
import Label from "./Components/Label";
import Header from "./Components/Header";
import Image from "./Components/Image";
import Input from "./Components/Input";
import {exportComponentAsPNG} from "react-component-export-image";

class App extends Component {
    state = {
        buttonColor: [
            {color: 'orange'},
            {color: 'blue'},
            {color: 'green'},
            {color: 'pink'},
            {color: 'brown'},
            {color: 'purple'}
        ],
        content: 'Продают собственники',
        link: 'https://www.avito.ru',
        backgroundClass: 'preview purple',
        file: '',
        imagePreviewUrl: ''

    }

    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleInput = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleLink = (event) => {
        this.setState({
            link: event.target.value
        })
    }

    newDoc = () => {
        window.location.assign(this.state.link)
    }

    onChangeOrange = () => {
        let newClass = 'preview orange'
        this.setState({
            backgroundClass: newClass
        })
    }
    onChangeBlue = () => {
        let newClass = 'preview blue'
        this.setState({
            backgroundClass: newClass
        })
    }
    onChangeGreen = () => {
        let newClass = 'preview green'
        this.setState({
            backgroundClass: newClass
        })
    }
    onChangePink = () => {
        let newClass = 'preview pink'
        this.setState({
            backgroundClass: newClass
        })
    }
    onChangeBrown = () => {
        let newClass = 'preview brown'
        this.setState({
            backgroundClass: newClass
        })
    }
    onChangePurple = () => {
        let newClass = 'preview purple'
        this.setState({
            backgroundClass: newClass
        })
    }

    handleJSON = () => {
        let previewItem = document.querySelector(".preview")
        let imageItem = document.querySelector(".image")
        let contextItem = document.querySelector(".context")
        let imgItem = document.querySelector("img")

        let jsonObject = {
            "preview": {
                "type": "div",
                "className": previewItem.className,
                "onClick": previewItem.onClick,
                "ref": previewItem.ref,
                "image": {
                    "type": "div",
                    "className": imageItem.className,
                    "img": {"type": "img", "src": imgItem.src, "alt": imgItem.alt}
                },
                "context": {
                    "type": "p",
                    "className": contextItem.className,
                    "content": this.state.content
                },
                "link": this.state.link
            }
        }

        let json = JSON.stringify(jsonObject);

        document.addEventListener('copy', (event) => {
            event.clipboardData.setData('text/plain', json);
            event.preventDefault();
        });

        alert("JSON скопирован в буфер обмена");
    }

    handleJSX = () => {

    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = <Image/>;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt={"banner"}/>);
        }

        return (
            <div className="App">

                <div className="column left">
                    <Header text={'Настройки баннера'}/>

                    <Label text={'Загрузите изображение'}/>
                    <Loading onChange={(e) => this._handleImageChange(e)}/>

                    <Label text={'Укажите текст баннера'}/>
                    <Input placeholder={this.state.content} onChange={this.handleInput}/>

                    <Label text={'Заливка градиентом'}/>

                    <button className='color orange' onClick={this.onChangeOrange}></button>
                    <button className='color blue' onClick={this.onChangeBlue}></button>
                    <button className='color green' onClick={this.onChangeGreen}></button>
                    <button className='color pink' onClick={this.onChangePink}></button>
                    <button className='color brown' onClick={this.onChangeBrown}></button>
                    <button className='color purple' onClick={this.onChangePurple}></button>

                    <Label text={'Ссылка'}/>
                    <Input placeholder={this.state.link} onChange={this.handleLink}/>
                </div>

                <div className="column">
                    <Header text={'Превью баннера'}/>

                    <div className={this.state.backgroundClass}
                         onClick={this.newDoc}
                         ref={this.componentRef}>
                        <div className="image">
                            {$imagePreview}
                        </div>
                        <p className="context">{this.state.content}</p>
                    </div>

                    <Export/>

                    <React.Fragment>
                        <button className="export"
                                onClick={() => exportComponentAsPNG(this.componentRef)}
                        >PNG</button>
                        <button className="export"
                                onClick={this.handleJSON}
                        >JSON</button>
                        <button className="export"
                                onClick={this.handleJSX}
                        >JSX</button>
                    </React.Fragment>

                </div>
            </div>
        );
    }
}


export default App;

ReactDOM.render(
    <App/>, document.getElementById('root')
);

