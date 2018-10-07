import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
    <VideoListItem 
    onVideoSelect={props.onVideoSelect}
    key={video.etag} 
    video={video} />
    //To get a unique key, go to console, click on the network tab, select all, and look for the search request in the list. It will show you the the items fetched. Inside each is a unique key. In this case it is "etag".
    );
  });

  return (
    <ul className="col-md-4 list-group">
      { videoItems }
    </ul>
  );
};

export default VideoList;