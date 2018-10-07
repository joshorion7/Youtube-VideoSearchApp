import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from "./components/search_bar";
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = "AIzaSyCQ5lCX_E2zYehHnUGn_kW-phOkRS2gCBE";

// Create a new component. This component should produce some HTML
class App extends Component{
  constructor(props) {
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
      // Line 15 resolves as this.setState({ videos: videos });
      //Only works when key value pair are the same string values
    });
  }
  

  render() {

    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

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