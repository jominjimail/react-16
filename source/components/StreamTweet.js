import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Tweet from './Tweet';

class StreamTweet extends Component {
  state = {
    numberOfCharactersIsIncreasing: null,
    headerText: null
  };

  // React가 DOM에 삽입되기 직전에 실행된다.
  componentWillMount() {
    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  }

  // React가 컴포넌트를 DOM에 삽입한 직후에 실행된다. DOM에 접근이 가능하므로, DOM에 접근하는 다른 js 라이브러리를 초기화하는데 최적의 위치이다.
  componentDidMount() {
    const componentDOMRepresentation = ReactDOM.findDOMNode(this);
    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  }

  // 컴포넌트 생명주기의 업데이트 단계에서 가장 먼저 실행되며, 부모 컴포넌트로부터 새로운 프로퍼티를 받을 때 수행된다.
  componentWillReceiveProps(nextProps) {
    const { tweet: currentTweet } = this.props;
    const { tweet: nextTweet } = nextProps;

    const currentTweetLength = currentTweet.text.length;
    const nextTweetLength = nextTweet.text.length;
    const isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
    let headerText;

    // setState()가 2번 호출되어도 내부 최적화를 통해 상태 업데이트를 한꺼번에 수행한다.
    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
    });

    if (isNumberOfCharactersIncreasing) {
      headerText = 'Number of characters is increasing';
    } else {
      headerText = 'Latest public photo from Twitter';
    }

    this.setState({
      headerText
    });

    window.snapterest.numberOfReceivedTweets++;
  }

  // 컴포넌트의 다음 상태로 컴포넌트의 재렌더링 여부를 결정할 수 있다.
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.tweet.text.length > 1);
  }

  // React가 DOM을 업데이트하기 바로 직전에 호출된다.
  // DOM 업데이트를 수행하기 위해 render() 메소드를 실행한다.
  componentWillUpdate(nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()');
  }

  // React가 DOM
  // React가 DOM을 업데이트하자마자 호출된다.
  componentDidUpdate(prevProps, prevState) {
    window.snapterest.numberOfDisplayedTweets++;
  }

  // React가 DOM에서 컴포넌트를 제거하고 소멸시키기 직전에 실행된다.
  componentWillUnmount() {
    delete window.snapterest;
  }

  render() {
    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={this.props.tweet}
          onImageClick={this.props.onAddTweetToCollection}
        />
      </section>
    );
  }
}

export default StreamTweet;
