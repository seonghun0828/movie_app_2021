import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// useEffect #5 네트워크 상태에 따라 바뀜
const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    onChange(navigator.onLine);
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);
    return () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
  }, []);
  return status;
};
const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online ? 'we just went online' : 'we are offline');
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div>
      <h1>{onLine ? 'OnLine' : 'OffLine'}</h1>
    </div>
  );
};

// useEffect #5 시간에 따라 fade in and delay 가 실행
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};
const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  return (
    <div>
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lorem dfai dsfadlkch</p>
    </div>
  );
};

// useEffect #4 마우스가 화면에서 벗어나면 실행
const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      // y축이 윗방향으로 screen을 벗어날 때만
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
  }, []);
};
const App = () => {
  const begForLife = () => console.log('please don`t leave');
  useBeforeLeave(begForLife);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

// useEffct #3 hook 사용 안하고 아래 자체 함수 만듦
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };
  const enablePrevent = () => window.addEventListener('beforeunload', listener);
  const disablePrevent = () =>
    window.removeEventListener('beforeunload', listener);
  return { enablePrevent, disablePrevent };
};
const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div>
      <button onClick={enablePrevent}>protect</button>
      <button onClick={disablePrevent}>unprotect</button>
    </div>
  );
};

// useEffct #3 hook 사용 안하고 아래 자체 함수 만듦
const useConfirm = (message = '', callback, rejection) => {
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    } else rejection();
  };
  return confirmAction;
};
const App = () => {
  const deleteWorld = () => console.log('Deleting the world');
  const abort = () => console.log('aborted');
  const confirmDelete = useConfirm('are you sure?', deleteWorld, abort);
  return (
    <div>
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

// useEffect #2 useClick, useRef, dependency 설명
const useClick = (onClick) => {
  const element = useRef();
  // useRef 는 내장 hook, getElementId 처럼 focus 해줌
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('click', onClick);
    }
    return () => {
      // useEffect의 return 함수는 unmount 될 때 실행
      if (element.current) {
        element.current.removeEventListener('click', onClick);
      }
    };
  }, []);
  // dependency 가 공백으로 있으면 mount 때 한번만 실행
  // []이 없으면 업데이트 될때에도 실행. 그러나 위 함수는 EventListener를 추가하는 것이므로 한번만 해야함
  return element;
};
const App = () => {
  const sayHello = () => console.log('say hello');
  const title = useClick(sayHello);
  return (
    <div>
      <h1 ref={title}>Hi</h1>
      {/* ref 속성은 focus 하게 해줌 */}
    </div>
  );
};

// useEffect #1 useTitle
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
const App = () => {
  const titleUpdater = useTitle('Loading...');
  setTimeout(() => titleUpdater('Home'), 3000);
  return (
    <div>
      <div>Hi</div>
    </div>
  );
};

// useEffect # 0
const App = () => {
  const sayHello = () => console.log('Hello');
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello, [number]);
  return (
    <div>
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

// useState #3 useTabs
const content = [
  {
    tab: 'Section 1',
    content: 'I`m the content of the Section 1',
  },
  {
    tab: 'Section 2',
    content: 'I`m the content of the Section 2',
  },
];
const useTab = (initialTab, allTabs) => {
  const [currentIndex, setIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setIndex,
  };
};
const App = () => {
  const { currentItem, changeItem } = useTab(0, content);
  return (
    <div className="App">
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

// useState #1 class to hook
class App extends React.Component {
  state = {
    item: 1,
  };
  incrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item + 1,
      };
    });
  };
  decrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item - 1,
      };
    });
  };
  render() {
    const { item } = this.state;
    return (
      <div className="App">
        <h1>Hello Code {item} </h1>
        <h2>Start editing</h2>
        <button onClick={this.incrementItem}>Increment</button>
        <button onClick={this.decrementItem}>Decrement</button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
