## React-Fragments

`When to Use?`

`render()` 메소드 활용시 하나의 부모 DOM Node를 필요로하게 되는데 컴포넌트 분리시 원하는 HTML DOM이 작성되기 어려울때
부모 노드를 대체하는 수단.

### Code Example

```javascript

class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

```

```javascript

class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}

```

`<Columns />` 컴포넌트를 위와 같이 구성하면 원하는 테이블 DOM이 작성되지 않는다. 이 경우 `<React.Fragment />`를 이용한다.

```javascript

class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}

```

#### 참고문헌

