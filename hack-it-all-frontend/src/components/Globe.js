import React, { Component } from "react"
import { render } from "react-dom"
import Map from "./Map"
// import '../bootstrap.min.css';

import "./styles.css"
import CategoriesStars from "./CategoriesStars";
import categoriesCountries from '../data/CountryCategoriesStars.json'
import NewsComponent from "./NewsComponent";
import KeyworkSearch from "./KeyworkSearch";

export default class Globe extends Component {
    constructor() {
        super()
        this.state = {
            center: [0, 0],
            country: '',
            categoriesCountries: '',
            category:''
        }
    }
    changeCenter = (center) => {
        // this.setState({ center: '' })

        console.log(center)
        this.setState({ center: center })
    }

    changeContent = (country) => {
        this.setState({ country: '', categoriesCountries: '' })
        console.log(country)
        this.setState({ country: country, categoriesCountries: categoriesCountries[country] })

    }
    handleCategoryClick=(e)=>{
        console.log(e)
        this.setState({category: e})
    }

    render() {
        return (
            <div class="container">
                <div class="row" style={{ textAlign: "center" }}>
                    {/* butoane */}
                    <div class="col-lg">
                    <div style={{ padding: "1rem 0" }}>
                        <button
                            className="btn"
                            onClick={() => { this.changeCenter([25.0094303, 45.9442858]);; this.changeContent("Romania") }}
                        >
                            {"Romania"}
                        </button>
                        <button
                            className="btn"
                            onClick={() => { this.changeCenter([12.5736108, 41.29246]); this.changeContent("Italy") }}
                        >
                            {"Italy"}
                        </button>
                        <button
                            className="btn"
                            onClick={() => { this.changeCenter([1.7191036, 46.7110]); this.changeContent("France") }}
                        >
                            {"France"}
                        </button>
                        <button
                            className="btn"
                            onClick={() => { this.changeCenter([-3.713, 40.2085]); this.changeContent("Spain") }}
                        >
                            {"Spain"}
                        </button>
                    </div>

                    <Map center={this.state.center} content={this.state.country} changeContent={this.changeContent} />
                    {/* <ReactTooltip>{this.state.country}</ReactTooltip> */}
                    </div>
                                        {/* stelute */}
                        {this.state.country ?<div class="col-sm"
                        style={{justifyContent:'center'}}
                        > <CategoriesStars handleCategoryClick={this.handleCategoryClick} country={this.state.country} data={this.state.categoriesCountries}></CategoriesStars>     </div> : null}    
               
                </div>
               {this.state.country ? (this.state.category?
               <div class="row"><NewsComponent category={this.state.category} country={this.state.country}></NewsComponent>
               </div>:<div class="row"><NewsComponent country={this.state.country}></NewsComponent></div>):null}
               {this.state.country ? <div class="row"><KeyworkSearch country={this.state.country}></KeyworkSearch></div>:null}

            </div>

        )
    }
}

// render(<App />, document.getElementById("root"))
