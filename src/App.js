import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RepoList from './RepoList';
import Request from 'react-http-request';


class App extends Component {

     static get defaultProps() {
        return ({repoList : []});
    }

  constructor(props){
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
    this.getApiResponse = this.getApiResponse.bind(this);
    this.parseResponse = this.parseResponse.bind(this);
    this.renderReportList = this.renderReportList.bind(this);
  }

  search(text = " "){
    var url = `http:http://www.omdbapi.com/s=${query}&y=&r=json&plot=short`;
    Request.get(url).then(response) => {
      this.setState({
        movies: response.body.Search
      });
    }
  }

  componentWillMount(){
    this.search();
  }
  parseResponse(items){
        var parsedRepoList =  [];
        items.map(function (item){
            let eachItem = {};
            eachItem.name = item.name;
            eachItem.description = item.description;
            parsedRepoList.push(eachItem);
        });
        setTimeout(() => {
            this.setState({repoList: parsedRepoList});
        }, 0);
       
    }
    getApiResponse(){
        return(
        <Request
            url='https://api.github.com/search/repositories?q=tetris'
            method='get'
            accept='application/json'
            verbose={true}
          >
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                    
                   {this.parseResponse(result.body.items)}
                  return (<div>
                      <div id="result.item1">{ JSON.stringify(result.body.items[0]) }</div>
                      <div id="result.item2">{ JSON.stringify(result.text) }</div>
                      </div>);
                }
              }
            }
          </Request>


    );
}
  
  renderReportList() {
  console.log("hello");
  }
 


  render() {
    return (
      <div className="App">
      <div>
      <h1>Search Git Repo</h1>
        <input type="text" className="search-box" ref="text"/>
        <p>
        <button onClick={this.search} >Search</button>
        </p>
        </div>
        {this.getApiResponse()}
        <div>
         {/* this.renderReportList() */}
        </div>
      </div>
    );
  }
}



export default App;
