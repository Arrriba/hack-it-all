import React, { Component } from "react"
import Stars from 'react-stars-display';
import "./styles.css"
import categoriesCountries from '../data/CountryCategoriesStars.json'
import searchIcon from '../images/search-icon.png'

import france from '../images/france.png'
import spain from '../images/spain.png'
import romania from '../images/romania.png'
import italy from '../images/italy.png'

import franceP from '../images/franceP.png'
import spainP from '../images/spainP.png'
import romaniaP from '../images/romaniaP.png'
import italyP from '../images/italyP.png'

const countryImg={"Romania":romania, "France":france,"Spain":spain,"Italy":italy}
const politicsImg={"Romania":romaniaP, "France":franceP,"Spain":spainP,"Italy":italyP}


export default class CategoriesStars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: this.props.data,
            categoriesExpasion: {
                "COVID": {
                    clicked: false
                },
                "POLITICS": {
                    clicked: false
                },
                "AIR QUALITY": {
                    clicked: false
                },
                "TRAVEL": {
                    clicked: false
                },
            },
            covidSearch:'',
            covidResponse:'',
            loading:false,
            clickedCat:''
        }
    }
    componentDidMount() {
    }
    handleClick = (category) => {
        // console.log(category)
        this.props.handleCategoryClick(category)
        this.setState({clickedCat:category})
        let cat = this.state.categoriesExpasion
        console.log(cat)
        cat[category].clicked = !cat[category].clicked
        this.setState({ categoriesExpasion: cat })
    }

    handleChange=(e)=>{
        if(e!=='')
        this.setState({covidSearch: e.target.value})
        else this.setState({covidSearch: e.target.value, covidResponse:''})
    }

    handleSearch = () =>{
        let val = this.state.covidSearch
        this.setState({loading:true})
    //    'http://127.0.0.1:5000/get_predictions?keyword=sports in romania&lang=ro&country=Romania'
    let question = val
    let country = this.props.country
    // let lang = language[country]
    let api = `http://127.0.0.1:5000/get_answear?question=${question}&country=${country}`
    fetch(api)
      .then((response) => 
        {if(response.ok) return response.text()
            else return "searching..."
      }
      )
      .then((data) => {
          console.log(data)
            this.setState({covidResponse:data, loading:false})
      })
      .catch((err)=>console.log(err));
    }

    isOneCategoryClicked(){
        let cat = this.state.categoriesExpasion
        let clicked = Object.keys(cat).filter(x=>cat[x].clicked===true)
        return clicked.length===1
    }

    // getCategories(){
    //     let cat = this.state.categoriesExpasion
    //     let clicked = Object.keys(cat).filter(x=>cat[x].clicked===true)
    //     return clicked.length===1
    // }
    getContentByCategory(category){
        if(category==='COVID')
        return <div >
        <div class="input-group" style={{ borderRadius: 20, padding: 20 , width:'90%', paddingLeft:100}}>
            <input
                onChange={(e) => this.handleChange(e)}
                placeholder="ask me anything"
                type="text" class="form-control" aria-label="small" aria-describedby="inputGroup-sizing-sm" />
            <button
                className="btn"
                onClick={this.handleSearch}
            ><img
                    style={{ height: 30, width: 30, }}
                    src={searchIcon}
                    alt="search"
                /></button>
        {this.state.loading? <div class="row" style={{textAlign:'center'}}> <div class="spinner-border" role="status"></div></div>:null}
        </div>
        {(this.state.covidResponse && this.state.covidSearch) && <div class='row' style={{textAlign:'center', marginLeft:240}}>{this.state.covidResponse}</div>

    }
        <div class="row"><img
        style={{ height: 400, width:"80%", background:'white' , 
        // borderBottom:30, 
        paddingTop:50,
        marginLeft:40
    }}
        src={countryImg[this.props.country]}
        alt="search"
    /></div>
    </div> 

if(category==='POLITICS')
        return <div >
        <div class="row"><img
        style={{ height: 250, width:350, background:'white' , 
        // borderBottom:30, 
        paddingTop:60,
        marginLeft:140,

    }}
        src={politicsImg[this.props.country]}
        alt="search"
    /></div>
    </div> 

    return null
    }

    render() {
        return (
            <div style={!this.isOneCategoryClicked()?{textAlign: "center", paddingLeft: "30px", paddingTop: '200px' }:(
                this.state.clickedCat==='POLITICS'?{textAlign: "center", paddingLeft: "30px", paddingTop: '200px' }:{textAlign: "center", paddingLeft: "30px", paddingTop: '100px' })}>
                {this.isOneCategoryClicked() ? categoriesCountries[this.props.country] && categoriesCountries[this.props.country].filter(x=>x.category===this.state.clickedCat).map(x =>
                    <div class={this.state.categoriesExpasion[x.category].clicked === true?'row hovvv-clicked':'row hovvv'} style={this.state.categoriesExpasion[x.category].clicked === true?{height:230}:null}>

                        <div class="col"  style={{cursor:'pointer'}} onClick={() => this.handleClick(x.category)}>{x.category}</div>
                        <div class="col">
                            <Stars
                                stars={x.score}
                                size={25} //optional
                                spacing={1} //optional
                                // fill='#FFE800' //optional
                                fill='#000000'
                                // fill='#FFCD01'
                            />
                        </div>
                        {this.state.categoriesExpasion[x.category].clicked === true  ?
                            this.getContentByCategory(x.category)
                            : null
                            }

                    </div>
                )
            :
            categoriesCountries[this.props.country] && categoriesCountries[this.props.country].map(x =>
                <div class='row hovvv' style={this.state.categoriesExpasion[x.category].clicked === true?{height:300}:null}>

                    <div class="col" onClick={() => this.handleClick(x.category)}>{x.category}</div>
                    <div class="col">
                        <Stars
                            stars={x.score}
                            size={25} //optional
                            spacing={1} //optional
                            // fill='#FFE800' //optional
                            fill='#000000'
                            // fill='#FFCD01'
                        />
                    </div>
                    {this.state.categoriesExpasion[x.category].clicked === true  ?
                        <div>
                            <div class="input-group mb-3" style={{ borderRadius: 20, padding: 40 }}>
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="ask me anything"
                                    type="text" class="form-control" aria-label="small" aria-describedby="inputGroup-sizing-sm" />
                                <button
                                    className="btn"
                                    onClick={this.handleSearch}
                                ><img
                                        style={{ height: 30, width: 30 }}
                                        src={searchIcon}
                                        alt="search"
                                    /></button>
                            {this.state.loading? <div class="row" style={{textAlign:'center'}}> <div class="spinner-border" role="status"></div></div>:null}
                            </div>
                            {this.state.covidResponse && <div class='row' style={{textAlign:'center'}}>{this.state.covidResponse}</div>}

                        </div> 
                        : null
                        }

                </div>
            )
            }
            </div>
        )
    }
}

// render(<App />, document.getElementById("root"))
