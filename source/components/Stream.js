import React, { Component } from 'react';
import SnapkiteStreamClient from 'snapkite-stream-client';
import StreamTweet from './StreamTweet';
import Header from './Header';

/**
 * Stream 컴포넌트가 그 자체에서 렌더링하는 것이 아니라 실제 렌더링하는 두 개의 컴포넌트 중 하나를 반환한다.
 * Stream 컴포넌트의 목적은 애플리케이션의 로직을 캡슐화하고 렌더링을 다른 React 컴포넌트로 전달해 주는 것이다.
 * React에서는 애플리케이션의 상태를 저장하고 관리하는 애플리케이션 로직을 캡슐화한 컴포넌트가 최소한 하나 이상은 있어야 한다.
 * 이런 컴포넌트가 루트 컴포넌트가 되거나 상위 컴포넌트가 된다. ControllView || Container
 */
class Stream extends Component {
  state = {
    tweet: null
  };

  // React API
  // React의 최초 렌더링이 끝난 동시에 한 번만 호출된다. 이 시점에서 React는 컴포넌트 토대로 DOM tree를 만들고 다른 js로직이 이 DOM에 접근가능
  // React가 다른 js 라이브러리를 통합하는 최적의 위치
  componentDidMount() {
    // 트윗 스트림을 초기화하기 위한 API를 포함하고 있는 외부 라이브러리
    SnapkiteStreamClient.initializeStream(this.handleNewTweet);
  }

  componentWillUnmount() {
    // componentDidMount 메소드에서 생성된 내용 파기는 언마운트되기 전에 하면 된다.
    SnapkiteStreamClient.destroyStream();
  }

  handleNewTweet = (tweet) => {
    this.setState({
      tweet: tweet
    });
  };

  render() {
    const { tweet } = this.state;
    const { onAddTweetToCollection } = this.props;
    const headerText = 'Waiting for public photos from Twitter...';

    if (tweet) {
      return (
        <StreamTweet
          tweet={tweet}
          onAddTweetToCollection={onAddTweetToCollection}
        />
      );
    }

    return (
      <Header text={headerText}/>
    );
  }
}

export default Stream;
