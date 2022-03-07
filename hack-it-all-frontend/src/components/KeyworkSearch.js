import React, { Component} from "react"
import './styles.css';
import searchIcon from '../images/search-icon.png';


const language = {'Romania':'ro', 'Italy':'it', 'France':'fr', 'Spain':'es'}

export default class KeyworkSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            news: '',
            loading: false,
            value:''
        }
    }

    handleChange = (e) => {
        console.log(e.target.value)
        let val = e.target.value
        this.setState({value:val})
        // if(val!=='')
        // this.handleSearch(val)
    }

    handleSearch = () =>{
        let val = this.state.value
        this.setState({loading:true})
    //    'http://127.0.0.1:5000/get_predictions?keyword=sports in romania&lang=ro&country=Romania'
    let keyword = val
    let country = this.props.country
    let lang = language[country]
    let api = `http://127.0.0.1:5000/get_predictions?keyword=${keyword}&lang=${lang}&country=${country}`
    fetch(api)
      .then((response) => 
        {if(response.ok) return response.json()
            else return "searching..."
      }
      )
      .then((data) => {
          console.log(data)
            this.setState({news: data[country], loading:false})
      })
      .catch((err)=>console.log(err));
    }

    getCategoryNews = () => {

        return this.state.news.map(x=>{
            return <div key={x} class='hovvv-news row' style={{height:70, width:"92%",fontSize:'80%', textAlign:'center', justifyContent:'center', alignContent:'center', marginLeft:45}}>
                <div class="row" style={{textAlign:'center', padding:20}}>{x.native_lang_title}</div>
            </div>
        })
    }


    render(){
        return(
            <div style={{width:1450, textAlign:'center', justifyContent:'center', paddingLeft:25}}>
            {/* <label style = {{textAlign:'center'}} class="custom-file-label" for="inputGroupFile01">Choose file</label> */}

            <div class="input-group mb-3" style={{ borderRadius:20, padding:40, marginLeft:5}}>
                    <input
                    onChange={(e)=>this.handleChange(e)}
                    placeholder="type your keyword to browse for more news"
                    type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
                    <button
                            className="btn"
                            onClick={this.handleSearch}
                        ><img
                        style={{height:30, width:30}}
                        src={searchIcon}
                        alt="search"
                        /></button>
            </div>

            {this.state.loading? <div style={{textAlign:'center'}}> <div class="spinner-border" role="status"></div>

  <span class="sr-only" style={{paddingLeft:30}}>translating and extracting your news</span></div>
:null}
            {this.state.news ? this.getCategoryNews()
            :null}
            </div>
        )
    }
}