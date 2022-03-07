import React, { Component, Image } from "react"
import "./styles.css"
import countriesNews from '../data/countriesNews.json'

const categories = ["COVID", "AIR QUALITY", "POLITICS" , "TRAVEL"]
export default class NewsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: this.props.country,
            currentIndex:0
            // currentCategory:"COVID"
        }
    }
    componentDidMount() {
        console.log(this.props.category)
        this.props.category && this.setState({currentIndex: categories.indexOf(this.props.category)})
    }

    handleClickPrev=()=>{
        var idx = this.state.currentIndex
        if (idx===0){
            idx=3
        }
        else idx --;
        this.setState({currentIndex: idx})
        this.getCategoryNews(categories[idx], this.props.country)

    }
    handleClickNext=()=>{
        var idx = this.state.currentIndex
        idx = (idx+1)%4
        this.setState({currentIndex: idx})
        this.getCategoryNews(categories[idx], this.props.country)
    }

    getCategoryNews = (category, country) => {
        var countryData = countriesNews[country]
        console.log(countryData)
        let categoryMap = countryData.filter(x=>x.topic===category)
        console.log(categoryMap)
        return categoryMap.map(x=>{
            return <div class='hovvv-news row' style={{height:70, width:"100%",fontSize:'80%', textAlign:'center', justifyContent:'center', alignContent:'center'}} 
            // className="hovvv"
            // onMouseEnter={(e) => {
            //     e.target.
            //     console.log(e)
            //     // content=`${NAME}`;
            //   }}
            //   onMouseLeave={(e) => {
            //     // content=''
            //   }}
            // style={{ 
            //     // background:'#cfd8dc', 
            // textAlign:"center", borderRadius:25, marginTop:10, maxWidth:"600px", padding:15},":hover"{background:"grey"}}
            >
                
                                {/* <div class="col" style={{maxWidth:300,}}> */}
                {/* <img 
                // src={URL.createObjectURL(x.img)}
                // src={{uri:x.img}}
                src={`data:image/png;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`}
                 style={{height:100, width:100, flex:1}} alt="news"/> */}
                {/* <Image source={{uri: "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}} /> */}
                {/* </div> */}
                <div onClick={()=> window.open(x.link, "_blank")} class="row" style={{textAlign:'center', padding:20}}>{x.title}</div>

            </div>
        })
    }

    render() {
        return (

            <div class="row" style={{paddingTop:70,paddingBottom:40, width:1900,alignContent:"center",justifyContent:'center', textAlign:'center'}}
            >
                    <span style={{
                        textAlign:'center',
                    }} 
                    >
                    <div className="btn" onClick={()=>this.handleClickPrev()}>{'<'}</div>
                   {categories[this.state.currentIndex]}
                    <div className="btn" onClick={()=>this.handleClickNext()}>{'>'}</div>
                    </span>
                {this.props.country?
                <div style={{
                    // position:"absolute", 
                // overflow:"hidden"
                }}>
                <div class="example" style={{height:250,              
                  padding:10,
                paddingLeft:30,
                marginLeft:40, overflowY:"scroll", alignContent:"center", textAlign:'center', 
                // '--bs-gutter-x':0
            }}>
                    {this.getCategoryNews(categories[this.state.currentIndex], this.props.country)}
                </div>
                </div>
                :null
                }
               
            </div>
        )
    }
}

// render(<App />, document.getElementById("root"))
