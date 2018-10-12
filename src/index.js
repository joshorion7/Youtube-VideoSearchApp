import _ from 'lodash'; //Lodash import
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from "./components/search_bar";
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = "AIzaSyCQ5lCX_E2zYehHnUGn_kW-phOkRS2gCBE";


class App extends Component{
  constructor() {
    super();
    this.state = { 
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("paintball");
  }
  
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos, 
      selectedVideo: videos[0]
      });
      // Line 21 resolves as this.setState({ videos: videos });
      //Only works when key value pair are the same string values
    });
  }
  

  render() {

    // Lodash function to control the time on running the videoSearch to the specified amount of time in milliseconds as the last parameter
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));