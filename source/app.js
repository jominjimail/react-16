import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/Application';

ReactDOM.render(
<Application/>,
  document.getElementById('react-application')
);

// DOM 에 <Application/> 컴포넌트를 렌더링 한다.
// 웹 어플리케이션의 전체 사용자 인터페이스(React)는 하나의 React 컴포넌트인 Application으로 캡슐화된다.
